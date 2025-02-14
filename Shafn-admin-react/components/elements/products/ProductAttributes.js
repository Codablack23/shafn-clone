import React, { useEffect, useState } from "react"
import ProductRepository from "@/repositories/ProductRepository"
import { v4 as uuid } from "uuid"
import { notification, Spin } from "antd"
import Attribute from "./modules/Attribute"
import { CustomModal } from "@/components/elements/custom"

const ProductAttributes = ({
  productId,
  attributes,
  onAttributeChange,
  onVariationChange,
  onProductChange,
}) => {
  const [userAttributes, setUserAttributes] = useState([])
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const addAttribute = () => {
    let newAttribute = {
      id: uuid(),
      name,
      options: [],
      visible: true,
      variation: false,
    }
    if (name) {
      // Check if attribute has been previously selected

      const isSelected = attributes.find((attribute) => attribute.name === name)

      if (isSelected === undefined) {
        // Add new attribute with name
        newAttribute.type = "select"
      }
    } else {
      // Add new attribute without name. Name can be added after creating attribute
      newAttribute.type = "custom"
    }
    onAttributeChange([newAttribute, ...attributes])
  }

  const createAttributePairs = async () => {
    try {
      const product = await ProductRepository.getProductByID(productId)

      let variationAttributes = product.attributes
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

  const saveAttributes = async () => {
    let errors = attributes.filter((attribute) => attribute.error)

    if (errors.length === 0) {
      try {
        const productAttributes = attributes.map((attribute, index) => ({
          name: attribute.name,
          options: attribute.options,
          visible: attribute.visible,
          variation: attribute.variation,
        }))

        setIsLoading(true)
        /* Update product with selected attributes */
        const updatedProduct = await ProductRepository.updateProduct(
          productId,
          {
            type: "variable",
            attributes: productAttributes,
          }
        )

        /* Update UI with new attributes */
        onProductChange((product) => ({
          ...product,
          attributes: updatedProduct.attributes,
        }))

        notification["success"]({
          description: "Attributes Saved Successfully",
        })

        const variations = await ProductRepository.getVariations(productId)

        if (variations.length > 0) {
          const attributesForVariations = productAttributes.filter(
            (attribute) => attribute.variation
          )

          const attributePairs = await createAttributePairs()

          let newVariations = []

          /* Update variation with new attributes */
          const updateVariation = (variation) => {
            /* Remove deleted attributes from variation attributes */
            const variationAttributes = variation.attributes.filter(
              (attribute) =>
                attributesForVariations
                  .map((_attribute) => _attribute.name)
                  .includes(attribute.name)
            )

            /* Add new attributes to variation attributes */
            attributesForVariations.forEach((attribute) => {
              const isAttributeInVariationAttributes = variationAttributes
                .map((variationAttribute) => variationAttribute.name)
                .includes(attribute.name)

              if (!isAttributeInVariationAttributes) {
                const newAttribute = {
                  name: attribute.name,
                  option: `Any ${attribute.name}`,
                }

                variationAttributes.push(newAttribute)
              }
            })

            /* Variation attributes must be equal to product attributes for variations */
            if (variationAttributes.length === attributesForVariations.length) {
              const newVariation = {
                ...variation,
                attributes: variationAttributes,
              }
              return newVariation
            } else {
              console.log(
                `Failed to update variation attributes of variation id ${variation.id}`
              )
              return variation
            }
          }

          /* Update each variation with new attributes */
          newVariations = variations.map((variation) =>
            updateVariation(variation)
          )

          if (attributePairs.length < newVariations.length) {
            /* Delete redundant variations */
            const variationsToDelete = newVariations.splice(
              attributePairs.length
            )

            await ProductRepository.deleteVariations(
              productId,
              variationsToDelete
            )
          }

          /* Update variations with new attribute pairs */
          const updatedVariations = await ProductRepository.updateVariations(
            productId,
            newVariations
          )

          onVariationChange((variations) => {
            const _variations = []
            variations.forEach((variation) => {
              /* Update variation attributes */
              const newVariation = updatedVariations.find(
                (_variation) => _variation.id === variation.id
              )

              if (newVariation !== undefined) {
                _variations.push({
                  ...variation,
                  attributes: newVariation.attributes,
                })
              }
            })

            return _variations
          })

          setIsLoading(false)
          console.log("DONE!")
        }
      } catch (error) {
        console.log("Something went wrong when trying to save attributes")
        console.error(error)
      }
    } else {
      notification["error"]({
        description: "Unresolved attribute error!",
      })
    }
  }

  const handleError = (id, error) => {
    const modify = (attribute) =>
      attribute.id === id
        ? {
            ...attribute,
            error,
          }
        : attribute

    onAttributeChange(attributes.map(modify))
  }

  const renderAttributeNames = () => {
    let selectedNames = attributes.map((attribute) =>
      attribute.name.toLowerCase()
    )

    return userAttributes.map((attribute, i) => {
      let isNameSelected = selectedNames.includes(attribute.name.toLowerCase())
      return (
        <option key={i} value={attribute.name} disabled={isNameSelected}>
          {attribute.name}
        </option>
      )
    })
  }

  const renderAttributes = () => {
    return attributes.map((attribute, _) => {
      let userAttribute
      // let attributeID = null
      let defaultOptions = []
      if (attribute.type === "select" && userAttributes.length > 0) {
        userAttribute = userAttributes.find(
          (attr) => attr.name.toLowerCase() === attribute.name.toLowerCase()
        )
        // attributeID = userAttribute.id
      }
      if (userAttribute !== undefined) {
        defaultOptions = userAttribute.values
      }

      return (
        <Attribute
          key={attribute.id}
          attribute={attribute}
          productAttributes={attributes}
          userAttributes={userAttributes}
          defaultOptions={defaultOptions}
          onAttributeChange={onAttributeChange}
          handleError={handleError}
        />
      )
    })
  }

  const getUserAttributes = async () => {
    try {
      const response = await ProductRepository.getUserAttributes()

      setUserAttributes(response)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUserAttributes()
  }, [])

  return (
    <div>
      <CustomModal isOpen={isLoading}>
        <div className="custom__spinner">
          <Spin tip={<p className="text-white">Loading...</p>} size="large" />
        </div>
      </CustomModal>
      {renderAttributes()}

      <hr />
      <div className="form-group form-group--select">
        <div className="form-group__content">
          <select
            className="ps-select"
            title="Attributes"
            onChange={(e) => setName(e.target.value)}
          >
            <option value="">Custom Attribute</option>
            {renderAttributeNames()}
          </select>
        </div>
      </div>

      <p style={{ color: "red" }}>{error}</p>

      <button
        type="button"
        className="ps-btn ps-btn--gray mr-4 mb-3"
        onClick={addAttribute}
      >
        Add attribute
      </button>

      <button type="button" className="ps-btn" onClick={saveAttributes}>
        Save attributes
      </button>
    </div>
  )
}

export default ProductAttributes
