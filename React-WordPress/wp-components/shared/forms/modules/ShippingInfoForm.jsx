import React from "react";
import { Form, Input } from "antd";

export default () => {
    return (
        <figure>
            <h3 className="ps-form__heading">Shipping information</h3>
            <div className="row">
                <div className="col-sm-6 col-12">
                    <div className="form-group">
                        <label>
                            First Name <span className="required">*</span>
                        </label>
                        <Form.Item
                            name="shipping_first_name"
                            rules={[
                                {
                                    required: true,
                                    message: "This field is required.",
                                },
                            ]}>
                            <Input className="form-control" type="text" />
                        </Form.Item>
                    </div>
                </div>
                <div className="col-sm-6 col-12">
                    <div className="form-group">
                        <label>
                            Last Name <span className="required">*</span>
                        </label>
                        <Form.Item
                            name="shipping_last_name"
                            rules={[
                                {
                                    required: true,
                                    message: "This field is required.",
                                },
                            ]}>
                            <Input className="form-control" type="text" />
                        </Form.Item>
                    </div>
                </div>
                <div className="col-sm-6 col-12">
                    <div className="form-group">
                        <label>
                            Address 1 <span className="required">*</span>
                        </label>
                        <Form.Item
                            name="shipping_address_1"
                            rules={[
                                {
                                    required: true,
                                    message: "This field is required.",
                                },
                            ]}>
                            <Input className="form-control" type="text" />
                        </Form.Item>
                    </div>
                </div>
                <div className="col-sm-6 col-12">
                    <div className="form-group">
                        <label>Address 2 (optional)</label>
                        <Form.Item
                            name="shipping_address_2"
                            rules={[
                                {
                                    required: false,
                                },
                            ]}>
                            <Input className="form-control" type="text" />
                        </Form.Item>
                    </div>
                </div>
                <div className="col-sm-6 col-12">
                    <div className="form-group">
                        <label>
                            City <span className="required">*</span>
                        </label>
                        <Form.Item
                            name="shipping_city"
                            rules={[
                                {
                                    required: true,
                                    message: "This field is required.",
                                },
                            ]}>
                            <Input className="form-control" type="text" />
                        </Form.Item>
                    </div>
                </div>
                <div className="col-sm-6 col-12">
                    <div className="form-group">
                        <label>
                            State <span className="required">*</span>
                        </label>
                        <Form.Item
                            name="shipping_state"
                            rules={[
                                {
                                    required: true,
                                    message: "This field is required.",
                                },
                            ]}>
                            <Input className="form-control" type="text" />
                        </Form.Item>
                    </div>
                </div>
                <div className="col-sm-6 col-12">
                    <div className="form-group">
                        <label>
                            Postcode <span className="required">*</span>
                        </label>
                        <Form.Item
                            name="shipping_postcode"
                            rules={[
                                {
                                    required: true,
                                    message: "This field is required.",
                                },
                            ]}>
                            <Input className="form-control" type="text" />
                        </Form.Item>
                    </div>
                </div>
                <div className="col-sm-6 col-12">
                    <div className="form-group">
                        <label>
                            Country <span className="required">*</span>
                        </label>
                        <Form.Item
                            name="shipping_country"
                            rules={[
                                {
                                    required: true,
                                    message: "This field is required.",
                                },
                            ]}>
                            <Input className="form-control" type="text" />
                        </Form.Item>
                    </div>
                </div>
            </div>
        </figure>
    );
};
