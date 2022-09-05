import React from "react"

const ModuleOrderShippingInformation = ({ shipping }) => (
  <div className="ps-card ps-card--order-information ps-card--small">
    <div className="ps-card__header">
      <h4>Shipping Information</h4>
    </div>
    <div className="ps-card__content">
      <p>
        <strong>Name:</strong> {shipping?.first_name} {shipping?.last_name}
      </p>
      <p>
        <strong>Company:</strong> {shipping?.company}
      </p>
      <p>
        <strong>Address 1:</strong> {shipping?.address_1}
      </p>
      <p>
        <strong>Address 2:</strong> {shipping?.address_2}
      </p>
      <p>
        <strong>City:</strong> {shipping?.city}
      </p>
      <p>
        <strong>State:</strong> {shipping?.state}
      </p>
      <p>
        <strong>Post code:</strong> {shipping?.postcode}
      </p>
      <p>
        <strong>Country:</strong> {shipping?.country}
      </p>
    </div>
  </div>
)

export default ModuleOrderShippingInformation
