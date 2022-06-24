import React, { useState } from "react"
import { notification } from "antd"
import Variation from "./modules/Variation"
import ProductRepository from "~/repositories/ProductRepository"

const ProductVariations = ({
  productId,
  productAttributes,
  variations,
  setVariations,
  setProduct,
}) => {
  const [action, setAction] = useState("addVariation")

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
  }

  const createVariations = async () => {
    if (action === "createVariations") {
      try {
        let attributePairs = await removeExistingAttributePairs() // So we only upload the new attributes

        if (attributePairs.length > 0) {
          let newVariations = await ProductRepository.createVariations(
            productId,
            attributePairs
          )

          setVariations((variations) => [...newVariations, ...variations])
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

      setVariations((variations) => [newVariation, ...variations])
    }
  }

  const saveVariations = async () => {
    let productVariations = await ProductRepository.saveVariations(
      productId,
      variations
    )

    if (productVariations) {
      notification["success"]({
        message: `Variations Saved Successfully`,
      })
    }

    setProduct((product) => ({
      ...product,
      variations: productVariations,
    }))
  }

  const renderVariations = () =>
    Array.from(variations).map((variation) => (
      <Variation
        key={variation.id}
        variation={variation}
        productId={productId}
        productAttributes={productAttributes}
        setVariations={setVariations}
      />
    ))

  return (
    <div style={{ marginTop: 50 }}>
      <div className="form-group form-group--select">
        <div className="form-group__content">
          <select
            className="ps-select"
            title="Variations"
            defaultValue="addVariation"
            onChange={(e) => setAction(e.target.value)}
          >
            <option value="addVariation">Add Variation</option>
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
        <button type="button" className="ps-btn" onClick={saveVariations}>
          Save variations
        </button>
      ) : null}
    </div>
  )
}

export default ProductVariations
