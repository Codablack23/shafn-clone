import Router from 'next/router';
import { notification } from 'antd';
import { WPDomain, WPRepository } from '~/repositories/WP/WPRepository';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';

class WPAuthRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async getUserByLogs(payload) {
        const endpoint = `${WPDomain}/wp-json/jwt-auth/v1/token`;
        const response = await axios
            .post(endpoint, payload)
            .then((res) => res.data);

        return response;
    }

    async updateVendorSettings(payload, token) {
        const endpoint = `${WPDomain}/wp-json/dokan/v1/settings`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios
            .put(endpoint, payload, config)
            .then((res) => res.data);

        return response;
    }

    async register(user, storeData, dispatchLogin, setIsLoading) {
        try {
            const adminLogs = {
                username: process.env.username,
                password: process.env.password,
            };

            const admin = await this.getUserByLogs(adminLogs);

            // Register User
            let response = await axios.post(
                `${WPDomain}/wp-json/wp/v2/users`,
                user,
                {
                    headers: {
                        Authorization: `Bearer ${admin.token}`,
                    },
                }
            );

            if (response) {
                /*
                Registeration successful.
                Handle user roles.
                */
                const userLogs = {
                    username: user.email,
                    password: user.password,
                };

                let loggedUser = await this.getUserByLogs(userLogs);

                if (user.roles[0] === 'seller') {
                    // Update vendor store name
                    this.updateVendorSettings(storeData, loggedUser.token)
                        .then((res) => {
                            notification['success']({
                                message: 'Registration Successful!',
                            });
                            window.location.assign(
                                `http://localhost:5500/${loggedUser.token}`
                            );
                            setIsLoading(false);
                        })
                        .catch((err) => {
                            notification['error']({
                                message:
                                    'Could not update store name. Please check your data connection and update it from your dashboard settings.',
                                description:
                                    err.response === undefined
                                        ? ReactHtmlParser(String(err))
                                        : ReactHtmlParser(
                                              err.response.data.message
                                          ),
                            });

                            window.location.assign(
                                `http://localhost:5500/${loggedUser.token}`
                            );
                        });
                } else {
                    notification['success']({
                        message: 'Registration Successful!',
                    });
                    dispatchLogin({
                        email: loggedUser.user_email,
                        token: loggedUser.token,
                    });
                    Router.push('/');
                    setIsLoading(false);
                }
            }
        } catch (err) {
            notification['error']({
                message: 'Registration Failed',
                description:
                    err.response === undefined
                        ? ReactHtmlParser(String(err))
                        : ReactHtmlParser(err.response.data.message),
            });
            setIsLoading(false);
        }
    }

    async login(userLogs, dispatchLogin, setIsLoading) {
        try {
            let user = await this.getUserByLogs(userLogs);

            let role = user.user_role[0].toLowerCase();

            if (role === 'customer') {
                notification['success']({
                    message: 'Login Successful!',
                });
                dispatchLogin({
                    email: user.user_email,
                    token: user.token,
                });
                Router.push('/');
            }

            if (role === 'seller') {
                notification['success']({
                    message: 'Login Successful!',
                });
                window.location.assign(`http://localhost:5500/${user.token}`);
            }
            setIsLoading(false);
        } catch (err) {
            notification['error']({
                message: 'Login Failed',
                description:
                    err.response === undefined
                        ? ReactHtmlParser(String(err))
                        : ReactHtmlParser(err.response.data.message),
            });
            setIsLoading(false);
        }
    }
}

export default new WPAuthRepository();
