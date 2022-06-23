import React, { useEffect, useState } from "react"
import ProductRepository from "~/repositories/ProductRepository"
import { v4 as uuid } from "uuid"
import { notification } from "antd"
import Attribute from "./modules/Attribute"
import { arraysEqual } from "~/utilities/helperFunctions"

const ProductAttributes = ({
  productId,
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

  const pairAttributes = async () => {
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

        /* Update product with selected attributes */
        const updatedProduct = await ProductRepository.updateProduct(
          productId,
          {
            type: "variable",
            attributes: productAttributes,
          }
        )

        let variations = await ProductRepository.getVariations(productId)

        // const attributesForVariations = productAttributes.filter(
        //   (attribute) => attribute.variation
        // )

        // /* Update variation with new attributes */
        // const updateVariation = (variation) => {
        //   /* Remove deleted attributes from variation attributes */
        //   let variationAttributes = variation.attributes.filter((attribute) =>
        //     attributesForVariations
        //       .map((_attribute) => _attribute.name)
        //       .includes(attribute.name)
        //   )

        //   /* Add new attributes to variation attributes */
        //   attributesForVariations.forEach((attribute) => {
        //     const isAttributeInVariationAttributes = variationAttributes
        //       .map((variationAttribute) => variationAttribute.name)
        //       .includes(attribute.name)

        //     if (!isAttributeInVariationAttributes) {
        //       const newAttribute = {
        //         name: attribute.name,
        //         option: "",
        //       }

        //       variationAttributes.push(newAttribute)
        //     }
        //   })

        //   /* Variation attributes must be equal to product attributes for variations */
        //   if (variationAttributes.length === attributesForVariations.length) {
        //     const newVariation = {
        //       ...variation,
        //       attributes: variationAttributes,
        //     }
        //     return newVariation
        //   } else {
        //     console.log(
        //       `FAILED TO UPDATE VARIATION ATTRIBUTES OF VARIATION ID >>> ${variation.id}`
        //     )
        //     return variation
        //   }
        // }

        // /* Update each variation with new attributes */
        // variations = variations.map((variation) => updateVariation(variation))

        // console.log("<<< Edited Variations >>>")
        // console.log(variations)

        const attributePairs = await pairAttributes()

        console.log("<<< Attribute Pairs >>>")
        console.log(attributePairs)

        /* Update exisitng variations with new attribute pairs */
        if (
          attributePairs.length > variations.length &&
          variations.length > 0
        ) {
          variations = variations.map((variation, index) => {
            return {
              ...variation,
              attributes: attributePairs[index],
            }
          })

          /* Use pairs not used in existing variations */
          attributePairs.splice(0, variations.length)
        } else if (
          attributePairs.length < variations.length &&
          variations.length > 0
        ) {
          // Do something
        } else {
          // Do something
        }
        console.log("<<< New Variations >>>")
        console.log(variations)

        console.log("<<< New Attribute Pairs >>>")
        console.log(attributePairs)

        let newVariations = []

        /* Update exisiting variations  */
        console.log("Updating Existing Variations...")
        for (const variation of Array.from(variations)) {
          try {
            // const newVariation = await ProductRepository._updateVariation(
            //   productId,
            //   variation.id,
            //   variation
            // )
            newVariations.push(variation)
          } catch (error) {
            console.log("!!! FAILED TO UPDATE VARIATION !!!")
            console.log(error)
          }
        }

        console.log("<<< Updated Variations >>>")
        console.log(newVariations)

        notification["success"]({
          message: "Attributes Saved Successfully",
        })

        const updateProductAttributes = (product) => ({
          ...product,
          attributes: updatedProduct.attributes,
        })

        const updateVariationAttributes = (variation) => {
          const newVariation = newVariations.find(
            (_newVariation) => _newVariation.id === variation.id
          )

          return {
            ...variation,
            attributes: newVariation.attributes,
          }
        }

        setProduct((product) => updateProductAttributes(product))

        setVariations((variations) =>
          variations.map((variation) => updateVariationAttributes(variation))
        )
      } catch (error) {
        console.log(
          "!!! SOMETHING WENT WRONG WHEN TRYING TO SAVE ATTRIBUTES !!!"
        )
        console.log(error)
      }
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
