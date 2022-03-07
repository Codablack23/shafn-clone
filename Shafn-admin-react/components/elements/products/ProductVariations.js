import React, { useState, useEffect } from "react";
import Variation from "./modules/Variation";
import ProductRepository from "~/repositories/ProductRepository";

const ProductVariations = ({ productID, productAttributes, setProduct }) => {
  const [productVariations, setProductVariations] = useState([]);
  const [selectValue, setSelectValue] = useState("");

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
          output.forEach((el) => {
            result.push([...el, variationAttributes[i][j]]);
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
    if (selectValue === "createVariation") {
      let attributes = combineAttributes();
      let variations = await ProductRepository.createVariations(
        productID,
        attributes
      );
    }
  };

  const renderVariations = () =>
    Array.from(productVariations).map((variation) => (
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
        backorder={variation.backorder}
        weight={variation.weight}
        dimensions={variation.dimensions}
        shipping_class={variation.shipping_class}
        description={variation.description}
        setProductVariations={setProductVariations}
      />
    ));

  return (
    <div style={{ marginTop: 50 }}>
      <div className="form-group form-group--select">
        <div className="form-group__content">
          <select
            className="ps-select"
            title="Variations"
            onChange={(e) => setSelectValue(e.target.value)}
          >
            <option value="addVariation">Add Variation</option>
            <option value="createVariation">
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
    </div>
  );
};

export default ProductVariations;
