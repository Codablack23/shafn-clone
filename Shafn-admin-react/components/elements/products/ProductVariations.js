import React, { useState, useEffect } from "react";

const ProductVariations = () => {
  return (
    <div>
      <div className="form-group form-group--select">
        <div className="form-group__content">
          <select
            className="ps-select"
            title="Attributes"
            onChange={(e) => setName(e.target.value)}
          >
            <option value="addVariation">Add Variation</option>
            <option value="createVariation">
              Create variations from attributes
            </option>
          </select>
        </div>
      </div>

      <button type="button" className="ps-btn ps-btn--gray">
        Go
      </button>
    </div>
  );
};

export default ProductVariations;
