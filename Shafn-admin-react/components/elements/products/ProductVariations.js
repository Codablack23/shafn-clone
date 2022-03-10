import React, { useState, useEffect } from "react";
import Variation from "./modules/Variation";
import ProductRepository from "~/repositories/ProductRepository";

const ProductVariations = ({
  productID,
  productAttributes,
  variations,
  setVariations,
}) => {
  const [action, setAction] = useState("addVariation");

  const combineAttributes = () => {
    let variationAttributes = productAttributes
      .filter(
        (attribute) =>
          attribute.name && attribute.variation && attribute.options.length > 0
      )
      .map((attribute) =>
        attribute.options.map((option, index) => ({
          name: attribute.name,
          option,
        }))
      );

    let output = [];

    if (variationAttributes.length > 1) {
      output = variationAttributes[0].map((el) => [el]);

      let result = [];

      for (let i = 1; i < variationAttributes.length; i++) {
        variationAttributes[i].forEach((element, j) => {
          output.forEach((variationAttribute) => {
            result.push([...variationAttribute, variationAttributes[i][j]]);
          });
        });

        output = result;
        result = [];
      }
    }
    if (variationAttributes.length === 1) {
      output = variationAttributes[0].map((attribute) => [attribute]);
    }

    return output;
  };

  const createProductVariations = async () => {
    if (action === "createVariations") {
      let attributes = combineAttributes();
      let variations = await ProductRepository.createVariations(
        productID,
        attributes
      );
    }
  };

  const saveVariations = async () => {
    ProductRepository.saveVariations(productID, variations);
  };

  let currentData = [{ name: 1, option: 1 }];
  let newData = [
    { name: 1, option: 5 },
    { name: 2, option: 2 },
  ];

  currentData = newData
    .map((data) => ({ name: data.name, option: "" }))
    .map((data) => {
      let prevData = currentData.find((curData) => curData.name === data.name);
      return {
        ...data,
        option: prevData !== undefined ? prevData.option : "",
      };
    });

  // console.log(currentData);

  const renderVariations = () =>
    Array.from(variations).map((variation) => (
      <Variation
        key={variation.id}
        id={variation.id}
        attributes={variation.attributes}
        image={variation.image}
        enabled={variation.visible}
        downloadable={variation.downloadable}
        virtual={variation.virtual}
        manage_stock={variation.manage_stock}
        sku={variation.sku}
        in_stock={variation.in_stock}
        regular_price={variation.regular_price}
        price={variation.price}
        stock_quantity={variation.stock_quantity}
        backorders={variation.backorders}
        weight={variation.weight}
        dimensions={variation.dimensions}
        shipping_class={variation.shipping_class}
        description={variation.description}
        setVariations={setVariations}
      />
    ));

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
        onClick={createProductVariations}
      >
        Go
      </button>

      {renderVariations()}

      {variations.length !== 0 ? (
        <button type="button" className="ps-btn" onClick={saveVariations}>
          Save variations
        </button>
      ) : null}
    </div>
  );
};

export default ProductVariations;
