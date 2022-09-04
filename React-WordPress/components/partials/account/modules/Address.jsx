import React from "react";

function Address({ customer, isBilling }) {
    return (
        <dl>
            <dt>
                <strong>First name:</strong>
            </dt>
            <dd>{customer.first_name}</dd>
            <dt>
                <strong>Last name:</strong>
            </dt>
            <dd>{customer.last_name}</dd>
            <dt>
                <strong>Company:</strong>
            </dt>
            <dd>{customer.company}</dd>
            <dt>
                <strong>First address:</strong>
            </dt>
            <dd>{customer.address_1}</dd>
            <dt>
                <strong>Second address:</strong>
            </dt>
            <dd>{customer.address_2}</dd>
            <dt>
                <strong>City:</strong>
            </dt>
            <dd>{customer.city}</dd>
            <dt>
                <strong>State:</strong>
            </dt>
            <dd>{customer.state}</dd>
            <dt>
                <strong>Post code:</strong>
            </dt>
            <dd>{customer.postcode}</dd>
            <dt>
                <strong>Country:</strong>
            </dt>
            <dd>{customer.country}</dd>
            {isBilling && (
                <>
                    <dt>
                        <strong>Email:</strong>
                    </dt>
                    <dd>{customer.email}</dd>
                    <dt>
                        <strong>Phone number:</strong>
                    </dt>
                    <dd>{customer.phone}</dd>
                </>
            )}
        </dl>
    );
}

export default Address;
