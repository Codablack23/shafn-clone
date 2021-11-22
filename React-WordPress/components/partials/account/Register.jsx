import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { login } from '../../../store/auth/action';
import {
    oathInfo,
    WPDomain,
    WPRepository,
} from '~/repositories/WP/WPRepository';
import Repository, { serializeQuery } from '~/repositories/Repository';
import axios from 'axios';

import { Form, Input } from 'antd';
import { connect } from 'react-redux';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
        };
    }

    handleOnChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value });
    };

    handleSubmit = () => {
        window.location.assign('http://localhost:5500');
    };

    render() {
        return (
            <div className="ps-my-account">
                <div className="container">
                    <Form
                        className="ps-form--account"
                        onFinish={this.handleSubmit}>
                        <ul className="ps-tab-list">
                            <li>
                                <Link href="/account/login">
                                    <a>Login</a>
                                </Link>
                            </li>
                            <li className="active">
                                <Link href="/account/register">
                                    <a>Register</a>
                                </Link>
                            </li>
                        </ul>
                        <div className="ps-tab active" id="register">
                            <div className="ps-form__content">
                                <h5>Register An Account</h5>
                                <div className="form-group">
                                    <Form.Item
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your username',
                                            },
                                        ]}>
                                        <Input
                                            name="username"
                                            className="form-control"
                                            type="text"
                                            placeholder="Username"
                                            value={this.state.email}
                                            onChange={this.handleOnChange}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <Form.Item
                                        rules={[
                                            {
                                                required: true,
                                                type: 'email',
                                                message:
                                                    'Please input a valid email!',
                                            },
                                        ]}>
                                        <Input
                                            name="email"
                                            className="form-control"
                                            type="email"
                                            placeholder="Email address"
                                            value={this.state.email}
                                            onChange={this.handleOnChange}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group form-forgot">
                                    <Form.Item
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Password input your password',
                                            },
                                        ]}>
                                        <Input
                                            name="password"
                                            className="form-control"
                                            type="password"
                                            placeholder="Password..."
                                            value={this.state.password}
                                            onChange={this.handleOnChange}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group submit">
                                    <button
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth">
                                        Register
                                    </button>
                                </div>
                            </div>
                            <div className="ps-form__footer">
                                <p>Connect with:</p>
                                <ul className="ps-list--social">
                                    <li>
                                        <a className="facebook" href="#">
                                            <i className="fa fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="google" href="#">
                                            <i className="fa fa-google-plus"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="twitter" href="#">
                                            <i className="fa fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="instagram" href="#">
                                            <i className="fa fa-instagram"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state.auth;
};
export default connect(mapStateToProps)(Register);
