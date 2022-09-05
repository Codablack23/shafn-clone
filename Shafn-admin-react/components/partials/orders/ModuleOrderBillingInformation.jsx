import React from "react"

const ModuleOrderBillingInformation = ({ billing }) => {
  return (
    <div className="ps-card ps-card--order-information ps-card--small">
      <div className="ps-card__header">
        <h4>Billing Information</h4>
      </div>
      <div className="ps-card__content">
        <p>
          <strong>Name:</strong> {billing?.first_name} {billing?.last_name}
        </p>
        <p>
          <strong>Company:</strong> {billing?.company}
        </p>
        <p>
          <strong>Address 1:</strong> {billing?.address_1}
        </p>
        <p>
          <strong>Address 2:</strong> {billing?.address_2}
        </p>
        <p>
          <strong>City:</strong> {billing?.city}
        </p>
        <p>
          <strong>State:</strong> {billing?.state}
        </p>
        <p>
          <strong>Post code:</strong> {billing?.postcode}
        </p>
        <p>
          <strong>Country:</strong> {billing?.country}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${billing?.email}`}>{billing?.email}</a>
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          <a href={`tel:${billing?.phone}`}>{billing?.phone}</a>
        </p>
      </div>
    </div>
  )
}

export default ModuleOrderBillingInformation
