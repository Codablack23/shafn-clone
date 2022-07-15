import React, { useState } from "react";
import { notification } from "antd";
import Variation from "./modules/Variation";
import ProductRepository from "~/repositories/ProductRepository";

const ProductVariations = ({
  productID,
  productAttributes,
  variations,
  setVariations,
  setProduct,
}) => {
  const [action, setAction] = useState("addVariation");

  const pairAttributes = async () => {
    const product = await ProductRepository.getProductByID(productID);

    let variationAttributes = product.attributes
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

    let attributePairs = [];

    if (variationAttributes.length > 1) {
      attributePairs = variationAttributes[0].map((el) => [el]);

      let newAttributePairs = [];

      for (let i = 1; i < variationAttributes.length; i++) {
        variationAttributes[i].forEach((element, j) => {
          attributePairs.forEach((attributePair) => {
            newAttributePairs.push([
              ...attributePair,
              variationAttributes[i][j],
            ]);
          });
        });

        attributePairs = newAttributePairs;
        newAttributePairs = [];
      }
    }
    if (variationAttributes.length === 1) {
      attributePairs = variationAttributes[0].map((attribute) => [attribute]);
    }

    return attributePairs;
  };

  const removeExistingAttributePairs = async () => {
    let attributePairs = await pairAttributes();
    let existingAttributePairs = variations.map((variation) =>
      variation.attributes.map((attribute) => attribute.option)
    );

    let newAttributePairs = [];

    for (const attributePair of Array.from(attributePairs)) {
      let exists = false;

      // Check if attribute pair exists in a variation
      for (const existingPair of Array.from(existingAttributePairs)) {
        if (attributePair.length !== existingPair.length) continue;

        let optionsMatch = true;

        // Check if attribute pair options matches the pair options of existing attributes
        for (const attribute of Array.from(attributePair)) {
          if (!existingPair.includes(attribute.option)) {
            optionsMatch = false;
            break;
          }
        }

        if (optionsMatch) {
          exists = true;
          break;
        }
      }

      if (!exists) newAttributePairs.push(attributePair);
    }

    return newAttributePairs;
  };

  const createVariations = async () => {
    if (action === "createVariations") {
      let attributePairs = await removeExistingAttributePairs();

      let newVariations = await ProductRepository.createVariations(
        productID,
        attributePairs
      );

      if (newVariations) {
        if (newVariations.length === 0) {
          notification["warning"]({
            message: "All Attributes Pair already exists",
          });
        } else {
          notification["success"]({
            message: `${newVariations.length} Variations Added!`,
          });
        }
      }

      setVariations((variations) => [...newVariations, ...variations]);
    }

    if (action === "addVariation") {
      const product = await ProductRepository.getProductByID(productID);

      let attributePair = Array.from(product.attributes).map((attribute) => ({
        name: attribute.name,
        option: "",
      }));

      let variation = await ProductRepository.createVariations(productID, [
        attributePair,
      ]);

      setVariations((variations) => [...variation, ...variations]);
    }
  };

  const saveVariations = async () => {
    let productVariations = await ProductRepository.saveVariations(
      productID,
      variations
    );

    if (productVariations) {
      notification["success"]({
        message: `Variations Saved Successfully`,
      });
    }

    setProduct((product) => ({
      ...product,
      variations: productVariations,
    }));
  };

  const renderVariations = () =>
    Array.from(variations).map((variation) => (
      <Variation
        key={variation.id}
        variation={variation}
        productID={productID}
        productAttributes={productAttributes}
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
        onClick={createVariations}
      >
        Go
      </button>

      {renderVariations()}

      {variations.length > 0 ? (
        <button type="button" className="ps-btn" onClick={saveVariations}>
          Save variations
        </button>
      ) : null}
    </div>
  );
};

export default ProductVariations;
