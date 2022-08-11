import React from "react";

const PartialSpecification = ({ attributes }) => {
    return (
        <div className="table-responsive">
            <table className="table table-bordered ps-table ps-table--specification">
                <tbody>
                    {attributes.map((attribute) => (
                        <tr>
                            <td>{attribute.name}</td>
                            <td>{attribute.options.join(", ")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PartialSpecification;
