import React, { useEffect, useState } from "react"
import ProductRepository from "~/repositories/ProductRepository"
import { v4 as uuid } from "uuid"
import { notification } from "antd"
import Attribute from "./modules/Attribute"

const ProductAttributes = ({
  productID,
  attributes,
  setAttributes,
  setVariations,
  setProduct,
}) => {
  const [userAttributes, setUserAttributes] = useState([])
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  const modifyAttribute = (newAttributes) => {
    setAttributes(newAttributes)
  }

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
    modifyAttribute([newAttribute, ...attributes])
  }

  const saveAttributes = async () => {
    let errors = attributes.filter((attribute) => attribute.error)
    if (errors.length === 0) {
      const productAttributes = attributes.map((attribute, index) => ({
        name: attribute.name,
        options: attribute.options,
        visible: attribute.visible,
        variation: attribute.variation,
      }))

      console.log("<<< Product Attributes Before Update >>>")
      console.log(productAttributes)

      /* Update product with selected attributes */
      const updatedProduct = await ProductRepository.updateProduct(productID, {
        type: "variable",
        attributes: productAttributes,
      })

      let variations = await ProductRepository.getVariations(productID)

      const attributesForVariations = productAttributes.filter(
        (attribute) => attribute.variation
      )

      /* Update variation with new attributes */
      const updateVariation = (variation) => {
        /* Remove deleted attributes from variation attributes */
        let variationAttributes = variation.attributes.filter((attribute) =>
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
              option: "",
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
            `FAILED TO UPDATE VARIATION ATTRIBUTES OF VARIATION ID >>> ${variation.id}`
          )
          return variation
        }
      }

      /* Update each variation with new attributes */
      variations = variations.map((variation) => updateVariation(variation))

      console.log("<<< Edited Variations >>>")
      console.log(variations)

      let newVariations = []

      /* Update each variation  */
      for (const variation of Array.from(variations)) {
        try {
          const newVariation = await ProductRepository._updateVariation(
            productID,
            variation.id,
            variation
          )
          newVariations.push(newVariation)
        } catch (error) {
          console.log("!!! FAILED TO UPDATE VARIATION !!!")
          console.log(error)
        }
      }

      console.log("<<< Updated Variations >>>")
      console.log(newVariations)

      console.log("<<< Updated Product Attributes >>> ")
      console.log(updatedProduct.attributes)

      notification["success"]({
        message: "Attributes Saved Successfully",
      })

      const updateProductAttributes = (product) => ({
        ...product,
        attributes: updatedProduct.attributes,
      })

      const updateVariationAttributes = (variation) => {
        const newVariation = newVariations.find((_newVariation) => {
          console.log(`>>> Variation Id => ${variation.id}`)
          console.log(`>>> New Variation Id => ${_newVariation.id}`)
          return _newVariation.id === variation.id
        })

        console.log("<<< New Variation >>>")
        console.log(newVariation)

        // if (newVariation !== undefined) {
        //   return {
        //     ...variation,
        //     attributes: newVariation.attributes,
        //   }
        // } else {
        //   console.log("!!! FAILED TO UPDATE VARIATION ATTRIBUTES IN UI !!!")
        return variation
        // }
      }

      setProduct((product) => updateProductAttributes(product))

      setVariations((variations) =>
        variations.map((variation) => updateVariationAttributes(variation))
      )
    } else {
      notification["error"]({
        message: "Unresolved attribute errors!",
      })
    }
  }

  const removeAttribute = (id) => {
    const filter = (attribute) => attribute.id !== id
    modifyAttribute(attributes.filter(filter))
  }

  const changeName = (id, name) => {
    const modify = (attribute) =>
      attribute.id === id
        ? {
            ...attribute,
            name,
          }
        : attribute

    modifyAttribute(attributes.map(modify))
  }

  const toggleProp = (id, name) => {
    const toggle = (attribute) =>
      attribute.id === id
        ? {
            ...attribute,
            [name]: !attribute[name],
          }
        : attribute

    modifyAttribute(attributes.map(toggle))
  }

  const addOption = (id, option) => {
    const modify = (attribute) =>
      attribute.id === id
        ? {
            ...attribute,
            options:
              !option || attribute.options.includes(option)
                ? attribute.options
                : [...attribute.options, option],
          }
        : attribute

    modifyAttribute(attributes.map(modify))
  }

  const removeOption = (id, _option) => {
    const modify = (attribute) =>
      attribute.id === id
        ? {
            ...attribute,
            options: attribute.options.filter((option) => option !== _option),
          }
        : attribute

    modifyAttribute(attributes.map(modify))
  }

  const selectAllOptions = (id, name) => {
    let currentAttribute = userAttributes.find(
      (attribute) => attribute.name === name
    )

    if (currentAttribute) {
      const modify = (attribute) =>
        attribute.id === id
          ? {
              ...attribute,
              options: currentAttribute.values.map((value) => value.name),
            }
          : attribute

      modifyAttribute(attributes.map(modify))
    }
  }

  const clearOptions = (id) => {
    const modify = (attribute) =>
      attribute.id === id
        ? {
            ...attribute,
            options: [],
          }
        : attribute

    modifyAttribute(attributes.map(modify))
  }

  const checkForDuplicatedAttributeName = (name) => {
    let duplicates = attributes.filter(
      (attribute) =>
        attribute.name.toLowerCase().trim() === name.toLowerCase().trim()
    )

    if (duplicates.length > 1) return true
    return false
  }

  const handleError = (id, error) => {
    const modify = (attribute) =>
      attribute.id === id
        ? {
            ...attribute,
            error,
          }
        : attribute

    modifyAttribute(attributes.map(modify))
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
    return attributes.map((attribute, i) => {
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
          key={i}
          attribute={attribute}
          defaultOptions={defaultOptions}
          changeName={changeName}
          addOption={addOption}
          toggleProp={toggleProp}
          removeOption={removeOption}
          selectAllOptions={selectAllOptions}
          clearOptions={clearOptions}
          removeAttribute={removeAttribute}
          checkForDuplicatedAttributeName={checkForDuplicatedAttributeName}
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
        className="ps-btn ps-btn--gray"
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
