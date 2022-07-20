import React, { useState, useEffect } from "react"
import { notification,Spin} from "antd"

import Variation from "./modules/Variation"
import ProductRepository from "~/repositories/ProductRepository"
import FileRepository from "~/repositories/FileRepository"
import { arraysEqual } from "~/utilities/helperFunctions"
import { CustomModal } from "~/components/elements/custom"

const ProductVariations = ({
  productId,
  productAttributes,
  variations,
  onVariationChange,
  onProductChange,
}) => {
  const [action, setAction] = useState("addVariation")
  const [isLoading, setIsLoading] = useState(false)

  const updateDuplicatedAttributes = (prevAttributePair, newAttributePair) => {
    const variationWithDuplicate = variations.find((variation) =>
      arraysEqual(variation.attributes, newAttributePair)
    )

    if (variationWithDuplicate !== undefined) {
      onVariationChange((variations) =>
        variations.map((variation) =>
          variation.id === variationWithDuplicate.id
            ? { ...variation, attributes: prevAttributePair }
            : variation
        )
      )
    }
  }

  const createAttributePairs = async () => {
    try {
      const product = await ProductRepository.getProductByID(productId)

      const variationAttributes = product.attributes
        .filter((attribute) => attribute.variation)
        .map((attribute) =>
          attribute.options.map((option, _) => ({
            name: attribute.name,
            option,
          }))
        )

      let attributePairs = []

      if (variationAttributes.length === 1) {
        attributePairs = variationAttributes[0].map((attribute) => [attribute])
      }

      if (variationAttributes.length > 1) {
        attributePairs = variationAttributes[0].map((el) => [el])

        let newAttributePairs = []

        for (let i = 1; i < variationAttributes.length; i++) {
          variationAttributes[i].forEach((element, j) => {
            attributePairs.forEach((attributePair) => {
              newAttributePairs.push([
                ...attributePair,
                variationAttributes[i][j],
              ])
            })
          })

          attributePairs = newAttributePairs
          newAttributePairs = []
        }
      }

      return attributePairs
    } catch (error) {
      console.log(
        "SOMETHING WENT WRONG WHEN TRYING TO CREATE PAIR ATTRIBUTES!!!"
      )
      console.log(error)
    }
  }

  const removeExistingAttributePairs = async () => {
    setIsLoading(true)
    try {
      const attributePairs = await createAttributePairs()

      const existingAttributePairs = variations.map((variation) =>
        variation.attributes.map((attribute) => attribute.option)
      )

      const newAttributePairs = []

      for (const attributePair of Array.from(attributePairs)) {
        let exists = false

        // Check if attribute pair exists in a variation
        for (const existingPair of Array.from(existingAttributePairs)) {
          if (attributePair.length !== existingPair.length) continue

          let optionsMatch = true

          // Check if attribute pair options matches the pair options of existing attributes
          for (const attribute of Array.from(attributePair)) {
            if (!existingPair.includes(attribute.option)) {
              optionsMatch = false
              break
            }
          }

          if (optionsMatch) {
            exists = true
            break
          }
        }

        if (!exists) newAttributePairs.push(attributePair)
      }

      return newAttributePairs
    } catch (error) {
      console.log(
        "!!! SOMETHING WENT WRONG WHEN TRYING TO REMOVE EXISTING ATTRIBUTE PAIRS !!!"
      )
      console.log(error)
    }
    setIsLoading(false)
  }

  const createVariations = async () => {
    setIsLoading(true)
    
    if (action === "createVariations") {
      try {
        let attributePairs = await removeExistingAttributePairs() // So we only upload the new attributes
        console.log(attributePairs)
        if (attributePairs.length > 0) {
          let newVariations = await ProductRepository.createVariations(
            productId,
            attributePairs
          )

          onVariationChange((variations) => [...newVariations, ...variations])
        } else {
          notification["info"]({
            message: "All Attributes Pair already exists",
          })
        }
      } catch (error) {
        console.log("SOMETHING WENT WRONG WHEN TRYING TO CREATE VARIATIONS!!!")
        console.log(error)
      }
    }

    if (action === "addVariation") {
      const product = await ProductRepository.getProductByID(productId)

      /* Use each product attribute name with a blank option */
      const attributePair = Array.from(product.attributes)
        .filter((attribute) => attribute.variation)
        .map((attribute) => ({
          name: attribute.name,
          option: `Any ${attribute.name}`,
        }))

      const newVariation = await ProductRepository.createVariation(productId, {
        attributes: attributePair,
      })

      onVariationChange((variations) => [newVariation, ...variations])
    }

   setIsLoading(false)
  }

  const saveVariations = async () => {
    setIsLoading(true)

    let productVariations = []
    let numOfFailedImageUploads = 0
    let numOfFailedVariationUpdates = 0

    const updateVariation = async (variation, image) => {
      /* Format variation properties */
      const in_stock =
        variation.in_stock === true || variation.in_stock === "true"

      // Manage_stock data type is boolean but defau;t value is string "parant"
      const manage_stock =
        typeof variation.manage_stock === "string"
          ? false
          : variation.manage_stock

      const stock_quantity = !in_stock ? 0 : Number(variation.stock_quantity)

      const variationData = {
        ...variation,
        in_stock,
        manage_stock,
        stock_quantity,
        image: image,
      }

      const productVariation = await ProductRepository.updateVariation(
        productId,
        variation.id,
        variationData
      )

      productVariations.push(productVariation)
    }

    for (const variation of Array.from(variations)) {
      try {
        if (typeof variation.image.src === "string") {
          /* Image was not changed. Update variation with image data */
          await updateVariation(variation, variation.image)
        } else {
          /* Image is new. Upload image before updating variation with image data  */
          let image
          try {
            image = await FileRepository.uploadImage(variation.image.src)
          } catch (error) {
            numOfFailedImageUploads++
            continue
          }

          await updateVariation(variation, image)
        }
      } catch (error) {
        numOfFailedVariationUpdates++
        productVariations.push(variation)
        continue
      }
    }

    const variationsIdList = productVariations.map((variation) => variation.id)

    /* Update product with variation ids */
    setIsLoading(false)
    try {
      await ProductRepository.updateProduct(productId, {
        variations: variationsIdList,
      })
    } catch (error) {
      notification["error"]({
        description:
          "Failed to update product with variations. Your changes may not be reflected to viewers. Please check your network connection and try again.",
      })
    }

    /* Notifications */
    if (productVariations.length > 0) {
      notification["success"]({
        description: `${productVariations.length} variations saved successfully`,
      })
    }

    if (numOfFailedVariationUpdates > 0) {
      notification["warning"]({
        description: `${numOfFailedVariationUpdates} variations failed to update. Please check your network connection and try again.`,
      })
    }

    if (numOfFailedImageUploads > 0) {
      notification["warning"]({
        description: `${numOfFailedImageUploads} images failed to upload. Please check your network connection and try again.`,
      })
    }

    /* Update UI */
    onProductChange((product) => ({
      ...product,
      variations: productVariations,
    }))

    console.log("DONE!")
  }

  const renderVariations = () =>
    Array.from(variations).map((variation) => (
      <Variation
        key={variation.id}
        variation={variation}
        productId={productId}
        productAttributes={productAttributes}
        onVariationChange={onVariationChange}
        onAttributeChange={updateDuplicatedAttributes}
      />
    ))

  const getVariations = async () => {
    try {
      const variations = await ProductRepository.getVariations(productId)

      onVariationChange(variations)
    } catch (error) {
      notification["error"]({
        message: "Unable to get product variations",
      })
    }
  }

  useEffect(() => {
    getVariations()
  }, [])

  return (
    <div style={{ marginTop: 50 }}>
       <CustomModal isOpen={isLoading}>
        <div className="custom__spinner">
        <Spin tip={<p className="text-white">Loading...</p>} size="large"/>
        </div>
      </CustomModal>
      <div className="form-group form-group--select">
        <div className="form-group__content">
          <select
            className="ps-select"
            title="Variations"
            defaultValue="addVariation"
            onChange={(e) => setAction(e.target.value)}
          >
            <option value="addVariation">Add variation</option>
            <option value="createVariations">
              Create variations from attributes
            </option>
          </select>
        </div>
      </div>

      <button
        type="button"
        className="ps-btn ps-btn--gray"
        onClick={createVariations}
      >
        Go
      </button>

      {renderVariations()}

      {variations.length > 0 ? (
        <button type="button" className="ps-btn mt-3" onClick={saveVariations}>
          Save variations
        </button>
      ) : null}
    </div>
  )
}

export default ProductVariations
