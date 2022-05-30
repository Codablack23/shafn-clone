import React, { useState } from "react";

const Attribute = ({
  attribute,
  defaultOptions,
  changeName,
  addOption,
  toggleProp,
  removeOption,
  selectAllOptions,
  clearOptions,
  removeAttribute,
  checkForDuplicatedAttributeName,
  handleError,
}) => {
  const [attributeName, setAttributeName] = useState("");
  const [option, setOption] = useState("");

  const handleNameChange = (e) => {
    setAttributeName(e.target.value);
    changeName(attribute.id, e.target.value);
  };

  const handleOptionChange = (e) => {
    let value = e.target.value;
    let lastCharacter = value[value.length - 1];

    if (lastCharacter === "|" && option) {
      addOption(attribute.id, option.trim());
      setOption("");
    } else {
      setOption(value);
    }
  };

  const validateName = () => {
    let error;
    let isDuplicated = checkForDuplicatedAttributeName(attributeName);
    if (!attributeName) {
      error = "Name cannot be empty!";
    } else if (isDuplicated) {
      error = "Name already exists. Try something else.";
    } else {
      error = "";
    }

    handleError(attribute.id, error);
  };

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
    );
  };

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
          </div>

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
      </div>
    );
  };

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
  );
};

export default Attribute;
