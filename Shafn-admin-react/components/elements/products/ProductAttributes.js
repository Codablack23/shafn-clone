import React, { useEffect, useState } from "react";
import ProductRepository from "~/repositories/ProductRepository";
import { v4 as uuid } from "uuid";
import Attribute from "./modules/Attribute";

const ProductAttributes = ({ productAttributes, setProduct }) => {
  const [userAttributes, setUserAttributes] = useState([]);
  const [name, setName] = useState("");

  const modifyAttribute = (newAttribute) => {
    setProduct((product) => ({ ...product, attributes: newAttribute }));
  };

  const addAttribute = () => {
    if (name) {
      let isSelected = productAttributes
        .map((attribute) => attribute.name)
        .includes(name);

      if (!isSelected) {
        let newAttribute = {
          id: uuid(),
          name,
          options: [],
          visible: false,
          variation: false,
          type: "select",
        };

        modifyAttribute([newAttribute, ...productAttributes]);
      }
    } else {
      let newAttribute = {
        id: uuid(),
        name,
        options: [],
        visible: false,
        variation: false,
        type: "custom",
      };

      modifyAttribute([newAttribute, ...productAttributes]);
    }

    let isSelected = productAttributes
      .map((attribute) => attribute.name)
      .includes(name);

    if (!isSelected) {
      let newAttribute = {
        id: uuid(),
        name,
        options: [],
        visible: false,
        variation: false,
      };

      if (name) {
        newAttribute.type = "select";
      } else {
        newAttribute.type = "custom";
      }

      modifyAttribute([newAttribute, ...productAttributes]);
    }
  };

  const removeAttribute = (id) => {
    const filter = (attribute) => attribute.id !== id;
    modifyAttribute(productAttributes.filter(filter));
  };

  const changeName = (id, name) => {
    const modify = (attribute) =>
      attribute.id === id
        ? {
            ...attribute,
            name,
          }
        : attribute;

    modifyAttribute(productAttributes.map(modify));
  };

  const toggleProp = (id, name) => {
    const toggle = (attribute) =>
      attribute.id === id
        ? {
            ...attribute,
            [name]: !attribute[name],
          }
        : attribute;

    modifyAttribute(productAttributes.map(toggle));
  };

  // const toggleVisibility = (id) => {
  //   const toggle = (attribute) =>
  //     attribute.id === id
  //       ? {
  //           ...attribute,
  //           visible: !attribute.visible,
  //         }
  //       : attribute;

  //   modifyAttribute(productAttributes.map(toggle));
  // };

  // const toggleVariation = (id) => {
  //   const toggle = (attribute) =>
  //     attribute.id === id
  //       ? {
  //           ...attribute,
  //           variation: !attribute.variation,
  //         }
  //       : attribute;

  //   modifyAttribute(productAttributes.map(toggle));
  // };

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
        : attribute;

    modifyAttribute(productAttributes.map(modify));
  };

  const removeOption = (id, _option) => {
    const modify = (attribute) =>
      attribute.id === id
        ? {
            ...attribute,
            options: attribute.options.filter((option) => option !== _option),
          }
        : attribute;

    modifyAttribute(productAttributes.map(modify));
  };

  const selectAllOptions = (id, name) => {
    let currentAttribute = userAttributes.find(
      (attribute) => attribute.name === name
    );

    if (currentAttribute) {
      const modify = (attribute) =>
        attribute.id === id
          ? {
              ...attribute,
              options: currentAttribute.values.map((value) => value.name),
            }
          : attribute;

      modifyAttribute(productAttributes.map(modify));
    }
  };

  const clearOptions = (id) => {
    const modify = (attribute) =>
      attribute.id === id
        ? {
            ...attribute,
            options: [],
          }
        : attribute;

    modifyAttribute(productAttributes.map(modify));
  };

  const checkForDuplicatedAttributeName = (name) => {
    let duplicates = productAttributes.filter(
      (attribute) =>
        attribute.name.toLowerCase().trim() === name.toLowerCase().trim()
    );

    if (duplicates.length > 1) return true;
    return false;
  };

  const handleError = (id, error) => {
    const modify = (attribute) =>
      attribute.id === id
        ? {
            ...attribute,
            error,
          }
        : attribute;

    modifyAttribute(productAttributes.map(modify));
  };

  const renderAttributeNames = () =>
    userAttributes.map((attribute, i) => (
      <option key={i} value={attribute.name}>
        {attribute.name}
      </option>
    ));

  const renderAttributes = () => {
    return productAttributes.map((attribute) => {
      let defaultOptions = [];
      if (attribute.type === "select" && userAttributes.length > 0) {
        defaultOptions = userAttributes.find(
          (attr) => attr.name.toLowerCase() === attribute.name.toLowerCase()
        ).values;
      }

      return (
        <Attribute
          key={attribute.id}
          id={attribute.id}
          type={attribute.type}
          name={attribute.name}
          options={attribute.options}
          defaultOptions={defaultOptions}
          visible={attribute.visible}
          variation={attribute.variation}
          error={attribute.error}
          changeName={changeName}
          addOption={addOption}
          // toggleVisibility={toggleVisibility}
          // toggleVariation={toggleVariation}
          toggleProp={toggleProp}
          removeOption={removeOption}
          selectAllOptions={selectAllOptions}
          clearOptions={clearOptions}
          removeAttribute={removeAttribute}
          checkForDuplicatedAttributeName={checkForDuplicatedAttributeName}
          handleError={handleError}
        />
      );
    });
  };

  const saveAttributes = () => {
    // let errors = productAttributes.filter((attribute) => attribute.error);
    // if (errors.length === 0) {
    //   ProductRepository.saveAttributes(productAttributes);
    // }
    alert("Attributes will be saved!");
  };

  const getUserAttributes = async () => {
    try {
      const response = await ProductRepository.getUserAttributes();

      setUserAttributes(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserAttributes();
  }, []);

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

      <button
        type="button"
        className="ps-btn ps-btn--gray"
        onClick={addAttribute}
      >
        Add
      </button>

      <button type="button" className="ps-btn" onClick={saveAttributes}>
        Save
      </button>
    </div>
  );
};

export default ProductAttributes;
