import React, { useState } from "react";

const Attribute = ({
  id,
  attributeID,
  type,
  name,
  options,
  defaultOptions,
  visible,
  variation,
  error,
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
    changeName(id, e.target.value);
  };

  const handleOptionChange = (e) => {
    let value = e.target.value;
    let lastCharacter = value[value.length - 1];

    if (lastCharacter === "|" && option) {
      addOption(id, option.trim());
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

    handleError(id, error);
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
            value={name}
            onChange={handleNameChange}
            onBlur={validateName}
            required
          />

          <p style={{ color: "red" }} hidden={error ? false : true}>
            {error}
          </p>

          <div className="form-group">
            <div className="ps-checkbox">
              <input
                checked={visible}
                className="form-control"
                type="checkbox"
                id={`visible-${id}`}
                name="visible"
                onChange={(e) => toggleProp(id, e.target.name)}
              />
              <label htmlFor={`visible-${id}`} style={{ color: "black" }}>
                Visible on the product page
              </label>
            </div>
          </div>
          <div className="form-group">
            <div className="ps-checkbox">
              <input
                checked={variation}
                className="form-control"
                type="checkbox"
                id={`variation-${id}`}
                name="variation"
                onChange={(e) => toggleProp(id, e.target.name)}
              />
              <label htmlFor={`variation-${id}`} style={{ color: "black" }}>
                Used for variations
              </label>
            </div>
          </div>
        </div>

        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
          <h5>Option(s)</h5>

          <div>
            {options.map((option, i) => (
              <span
                key={i}
                onClick={() => removeOption(id, option)}
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
          <h5>{name}</h5>

          <div className="form-group">
            <div className="ps-checkbox">
              <input
                checked={visible}
                className="form-control"
                type="checkbox"
                id={`visible-${id}`}
                name="visible"
                onChange={(e) => toggleProp(id, e.target.name)}
              />
              <label htmlFor={`visible-${id}`} style={{ color: "black" }}>
                Visible on the product page
              </label>
            </div>
          </div>
          <div className="form-group">
            <div className="ps-checkbox">
              <input
                checked={variation}
                className="form-control"
                type="checkbox"
                id={`variation-${id}`}
                name="variation"
                onChange={(e) => toggleProp(id, e.target.name)}
              />
              <label htmlFor={`variation-${id}`} style={{ color: "black" }}>
                Used for variations
              </label>
            </div>
          </div>
        </div>

        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
          <h5>Option(s)</h5>

          <div>
            {options.map((option, i) => (
              <span
                key={i}
                onClick={() => removeOption(id, option)}
                style={{ marginRight: 10 }}
              >
                x{option}
              </span>
            ))}

            <input
              name="options"
              className="form-control"
              type="text"
              list={`options-${id}`}
              placeholder='Enter some text, or some attributes by "|" seperated values'
              value={option}
              onChange={handleOptionChange}
            />

            <datalist id={`options-${id}`}>
              {defaultOptions.map((option, i) => (
                <option key={i} value={option.name} />
              ))}
            </datalist>
          </div>

          <button
            type="button"
            className="ps-btn ps-btn--gray"
            onClick={() => selectAllOptions(id, name)}
          >
            Select all
          </button>

          <button
            type="button"
            className="ps-btn ps-btn--gray"
            onClick={() => clearOptions(id)}
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
          href={`#collapse-${id}`}
          style={{ width: "100%" }}
        >
          {name}
        </div>
        <div className="d-flex justify-content-end">
          <span
            className="btn"
            data-bs-toggle="collapse"
            href={`#collapse-${id}`}
          >
            <span style={{ fontSize: 15 }}>
              <i className="fa fa-caret-down" aria-hidden="true"></i>
            </span>
          </span>
          <span
            style={{ cursor: "pointer" }}
            className="text-danger small mt-2 ml-2"
            onClick={() => removeAttribute(id)}
          >
            Remove
          </span>
        </div>
      </header>

      <div className="collapse" id={`collapse-${id}`}>
        {type === "custom" ? renderCustomAttribute() : renderSelectAttribute()}
      </div>
    </div>
  );
};

export default Attribute;
