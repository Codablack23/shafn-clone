import React, { useState } from "react"
import { HexColorPicker } from "react-colorful"

const Attribute = ({
  attribute,
  productAttributes,
  userAttributes,
  defaultOptions,
  onAttributeChange,
  handleError,
}) => {
  const [attributeName, setAttributeName] = useState("")
  const [option, setOption] = useState("")
  const [color, setColor] = useState("#aabbcc")

  const removeAttribute = (id) => {
    const filter = (attribute) => attribute.id !== id
    onAttributeChange(productAttributes.filter(filter))
  }

  const changeName = (id, name) => {
    const modify = (attribute) =>
      attribute.id === id
        ? {
            ...attribute,
            name,
          }
        : attribute

    onAttributeChange(productAttributes.map(modify))
  }

  const toggleProp = (id, name) => {
    const toggle = (attribute) =>
      attribute.id === id
        ? {
            ...attribute,
            [name]: !attribute[name],
          }
        : attribute

    onAttributeChange(productAttributes.map(toggle))
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

    onAttributeChange(productAttributes.map(modify))
  }

  const removeOption = (id, _option) => {
    const modify = (attribute) =>
      attribute.id === id
        ? {
            ...attribute,
            options: attribute.options.filter((option) => option !== _option),
          }
        : attribute

    onAttributeChange(productAttributes.map(modify))
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

      onAttributeChange(productAttributes.map(modify))
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

    onAttributeChange(productAttributes.map(modify))
  }

  const handleNameChange = (e) => {
    setAttributeName(e.target.value)
    changeName(attribute.id, e.target.value)
  }

  const handleOptionChange = (e) => {
    let value = e.target.value
    let lastCharacter = value[value.length - 1]

    if (lastCharacter === "|" && option) {
      addOption(attribute.id, option.trim())
      setOption("")
    } else {
      setOption(value)
    }
  }

  const validateName = () => {
    const checkForDuplicatedAttributeName = () => {
      let duplicates = productAttributes.filter(
        (attribute) =>
          attribute.name.toLowerCase().trim() ===
          attributeName.toLowerCase().trim()
      )

      if (duplicates.length > 1) return true
      return false
    }

    let error
    let isDuplicated = checkForDuplicatedAttributeName()
    if (!attributeName) {
      error = "Name cannot be empty!"
    } else if (isDuplicated) {
      error = "Name already exists. Try something else."
    } else {
      error = ""
    }

    handleError(attribute.id, error)
  }

  const renderCustomAttribute = () => {
    return (
      <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
          <h5>Name</h5>

          <input
            name="name"
            className="form-control"
            type="text"
            placeholder="Enter attribute name"
            value={attribute.name}
            onChange={handleNameChange}
            onBlur={validateName}
            required
          />

          <p style={{ color: "red" }} hidden={attribute.error ? false : true}>
            {attribute.error}
          </p>

          <div className="form-group">
            <div className="ps-checkbox">
              <input
                checked={attribute.visible}
                className="form-control"
                type="checkbox"
                id={`visible-${attribute.id}`}
                name="visible"
                onChange={(e) => toggleProp(attribute.id, e.target.name)}
              />
              <label
                htmlFor={`visible-${attribute.id}`}
                style={{ color: "black" }}
              >
                Visible on the product page
              </label>
            </div>
          </div>
          <div className="form-group">
            <div className="ps-checkbox">
              <input
                checked={attribute.variation}
                className="form-control"
                type="checkbox"
                id={`variation-${attribute.id}`}
                name="variation"
                onChange={(e) => toggleProp(attribute.id, e.target.name)}
              />
              <label
                htmlFor={`variation-${attribute.id}`}
                style={{ color: "black" }}
              >
                Used for variations
              </label>
            </div>
          </div>
        </div>

        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
          <h5>Option(s)</h5>

          <div>
            {attribute.options.map((option, i) => (
              <span
                key={i}
                onClick={() => removeOption(attribute.id, option)}
                style={{ marginRight: 10 }}
              >
                x{option}
              </span>
            ))}

            <input
              name="options"
              className="form-control"
              type="text"
              placeholder='Enter some text, or some attributes by "|" seperated values'
              value={option}
              onChange={handleOptionChange}
            />
          </div>
        </div>
      </div>
    )
  }

  const renderSelectAttribute = () => {
    return (
      <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
          <h5>Name</h5>
          <h5>{attribute.name}</h5>

          <div className="form-group">
            <div className="ps-checkbox">
              <input
                checked={attribute.visible}
                className="form-control"
                type="checkbox"
                id={`visible-${attribute.id}`}
                name="visible"
                onChange={(e) => toggleProp(attribute.id, e.target.name)}
              />
              <label
                htmlFor={`visible-${attribute.id}`}
                style={{ color: "black" }}
              >
                Visible on the product page
              </label>
            </div>
          </div>
          <div className="form-group">
            <div className="ps-checkbox">
              <input
                checked={attribute.variation}
                className="form-control"
                type="checkbox"
                id={`variation-${attribute.id}`}
                name="variation"
                onChange={(e) => toggleProp(attribute.id, e.target.name)}
              />
              <label
                htmlFor={`variation-${attribute.id}`}
                style={{ color: "black" }}
              >
                Used for variations
              </label>
            </div>
          </div>
        </div>

        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
          <h5>Option(s)</h5>

          {attribute.name.toLowerCase() === "color" ? (
            <>
              {attribute.options.map((option) => (
                <div
                  key={option}
                  onClick={() => removeOption(attribute.id, option)}
                  style={{
                    display: "inline-block",
                    backgroundColor: option,
                    width: 25,
                    height: 25,
                  }}
                />
              ))}
              <HexColorPicker
                color={color}
                onChange={setColor}
                style={{ width: "100%", height: 100 }}
              />
              <button
                type="button"
                className="ps-btn ps-btn--gray"
                onClick={() => addOption(attribute.id, color)}
              >
                Add
              </button>
            </>
          ) : (
            <div>
              {attribute.options.map((option, i) => (
                <span
                  key={i}
                  onClick={() => removeOption(attribute.id, option)}
                  style={{ marginRight: 10 }}
                >
                  x{option}
                </span>
              ))}
              <input
                name="options"
                className="form-control"
                type="text"
                list={`options-${attribute.id}`}
                placeholder='Enter some text, or some attributes by "|" seperated values'
                value={option}
                onChange={handleOptionChange}
              />

              <datalist id={`options-${attribute.id}`}>
                {defaultOptions.map((option, i) => (
                  <option key={i} value={option.name} />
                ))}
              </datalist>

              <button
                type="button"
                className="ps-btn ps-btn--gray"
                onClick={() => selectAllOptions(attribute.id, attribute.name)}
              >
                Select all
              </button>

              <button
                type="button"
                className="ps-btn ps-btn--gray"
                onClick={() => clearOptions(attribute.id)}
              >
                Select none
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="variations-List mt-5 rounded">
      <header className="d-flex justify-content-between bg-light p-3">
        <div
          data-bs-toggle="collapse"
          href={`#collapse-${attribute.id}`}
          style={{ width: "100%" }}
        >
          {attribute.name}
        </div>
        <div className="d-flex justify-content-end">
          <span
            className="btn"
            data-bs-toggle="collapse"
            href={`#collapse-${attribute.id}`}
          >
            <span style={{ fontSize: 15 }}>
              <i className="fa fa-caret-down" aria-hidden="true"></i>
            </span>
          </span>
          <span
            style={{ cursor: "pointer" }}
            className="text-danger small mt-2 ml-2"
            onClick={() => removeAttribute(attribute.id)}
          >
            Remove
          </span>
        </div>
      </header>

      <div className="collapse" id={`collapse-${attribute.id}`}>
        {attribute.type === "custom"
          ? renderCustomAttribute()
          : renderSelectAttribute()}
      </div>
    </div>
  )
}

export default Attribute
