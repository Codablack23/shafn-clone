import React, { useEffect, useState } from "react";
import ProductRepository from "~/repositories/ProductRepository";
import { v4 as uuid } from "uuid";
import { notification } from "antd";
import Attribute from "./modules/Attribute";

const ProductAttributes = ({
  productID,
  attributes,
  setAttributes,
  setVariations,
  setProduct,
}) => {
  const [userAttributes, setUserAttributes] = useState([]);
  const [name, setName] = useState("");

  const modifyAttribute = (newAttributes) => {
    setAttributes(newAttributes);
  };

  const addAttribute = () => {
    if (name) {
      let isSelected = attributes
        .map((attribute) => attribute.name)
        .includes(name);

      if (!isSelected) {
        let newAttribute = {
          id: uuid(),
          name,
          options: [],
          visible: true,
          variation: false,
          type: "select",
        };

        modifyAttribute([newAttribute, ...attributes]);
      }
    } else {
      let newAttribute = {
        id: uuid(),
        name,
        options: [],
        visible: true,
        variation: false,
        type: "custom",
      };

      modifyAttribute([newAttribute, ...attributes]);
    }
  };

  const saveAttributes = async () => {
    let errors = attributes.filter((attribute) => attribute.error);
    if (errors.length === 0) {
      let response = await ProductRepository.saveAttributes(
        productID,
        attributes,
        setAttributes
      );

      if (response) {
        console.log(response.attributes);
        notification["success"]({
          message: "Attributes Saved Successfully",
        });

        setProduct((product) => ({
          ...product,
          attributes: response.attributes,
        }));

        setVariations((variations) =>
          variations.map((variation) => {
            let newVariationData = response.newVariations.find(
              (newVariation) => newVariation.id === variation.id
            );

            return {
              ...variation,
              attributes: newVariationData.attributes,
            };
          })
        );
      }
    }
  };

  const removeAttribute = (id) => {
    const filter = (attribute) => attribute.id !== id;
    modifyAttribute(attributes.filter(filter));
  };

  const changeName = (id, name) => {
    const modify = (attribute) =>
      attribute.id === id
        ? {
            ...attribute,
            name,
          }
        : attribute;

    modifyAttribute(attributes.map(modify));
  };

  const toggleProp = (id, name) => {
    const toggle = (attribute) =>
      attribute.id === id
        ? {
            ...attribute,
            [name]: !attribute[name],
          }
        : attribute;

    modifyAttribute(attributes.map(toggle));
  };

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

    modifyAttribute(attributes.map(modify));
  };

  const removeOption = (id, _option) => {
    const modify = (attribute) =>
      attribute.id === id
        ? {
            ...attribute,
            options: attribute.options.filter((option) => option !== _option),
          }
        : attribute;

    modifyAttribute(attributes.map(modify));
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

      modifyAttribute(attributes.map(modify));
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

    modifyAttribute(attributes.map(modify));
  };

  const checkForDuplicatedAttributeName = (name) => {
    let duplicates = attributes.filter(
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

    modifyAttribute(attributes.map(modify));
  };

  const renderAttributeNames = () => {
    let selectedNames = attributes.map((attribute) =>
      attribute.name.toLowerCase()
    );

    return userAttributes.map((attribute, i) => {
      let isNameSelected = selectedNames.includes(attribute.name.toLowerCase());
      return (
        <option key={i} value={attribute.name} disabled={isNameSelected}>
          {attribute.name}
        </option>
      );
    });
  };

  const renderAttributes = () => {
    return attributes.map((attribute, i) => {
      let userAttribute;
      let attributeID = null;
      let defaultOptions = [];
      if (attribute.type === "select" && userAttributes.length > 0) {
        userAttribute = userAttributes.find(
          (attr) => attr.name.toLowerCase() === attribute.name.toLowerCase()
        );

        attributeID = userAttribute.id;
      }
      if (userAttribute !== undefined) {
        defaultOptions = userAttribute.values;
      }

      return (
        <Attribute
          key={i}
          id={attribute.id}
          attributeID={attributeID}
          type={attribute.type}
          name={attribute.name}
          options={attribute.options}
          defaultOptions={defaultOptions}
          visible={attribute.visible}
          variation={attribute.variation}
          error={attribute.error}
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
      );
    });
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
        Add attribute
      </button>

      <button type="button" className="ps-btn" onClick={saveAttributes}>
        Save attributes
      </button>
    </div>
  );
};

export default ProductAttributes;
