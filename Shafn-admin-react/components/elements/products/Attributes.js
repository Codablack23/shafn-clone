import React, { useEffect, useState } from "react";
import ProductRepository from "~/repositories/ProductRepository";
import { v4 as uuid } from "uuid";

const Attributes = ({ productAttributes, setProduct }) => {
  const [attributes, setAttributes] = useState([]);
  const [name, setName] = useState("");

  const render = () => (name ? 1 : 2);

  const modifyAttribute = (newAttribute) => {
    setProduct((product) => ({ ...product, attributes: newAttribute }));
  };

  const addAttribute = () => {
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

      modifyAttribute([newAttribute, ...productAttributes]);
    }
  };

  const removeAttribute = (id) => {
    const filter = (attribute) => attribute.id === id;
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

  const toggleVisibility = (id) => {
    const toggle = (attribute) =>
      attribute.id === id
        ? {
            ...attribute,
            visible: !attribute.visible,
          }
        : attribute;

    modifyAttribute(productAttributes.map(toggle));
  };

  const toggleVariation = (id) => {
    const toggle = (attribute) =>
      attribute.id === id
        ? {
            ...attribute,
            variation: !attribute.variation,
          }
        : attribute;

    modifyAttribute(productAttributes.map(toggle));
  };

  const addOption = (id, option) => {
    const modify = (attribute) =>
      attribute.id === id
        ? {
            ...attribute,
            options: [...attribute.options, option],
          }
        : attribute;

    modifyAttribute(productAttributes.map(modify));
  };

  const removeOption = (id, _option) => {
    const modify = (attribute) =>
      attribute.id === id
        ? {
            ...attribute,
            options: attribute.options.filter((option) => option === _option),
          }
        : attribute;

    modifyAttribute(productAttributes.map(modify));
  };

  const selectAllOptions = (id, name) => {
    let options = attributes.find(
      (attribute) => attribute.name === name
    ).options;

    const modify = (attribute) =>
      attribute.id === id
        ? {
            ...attribute,
            options,
          }
        : attribute;

    modifyAttribute(productAttributes.map(modify));
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

  useEffect(() => {
    const getAttributes = async () => {
      try {
        const response = await ProductRepository.getAttributes();

        setAttributes(response);
      } catch (err) {
        console.log(err);
      }
    };

    // getAttributes()
  }, []);

  return (
    <div>
      <div className="form-group form-group--select">
        <div className="form-group__content">
          <select
            className="ps-select"
            title="Attributes"
            onChange={(e) => setName(e.target.value)}
          >
            <option value="">Custom Attribute</option>

            {attributes.map((attribute) => {
              <option value={attribute.name}>{attribute.name}</option>;
            })}
          </select>
        </div>
      </div>

      {render()}

      <button
        type="button"
        className="ps-btn ps-btn--gray"
        onClick={addAttribute}
      >
        Add
      </button>

      <button type="button" className="ps-btn">
        Save
      </button>
    </div>
  );
};

export default Attributes;
