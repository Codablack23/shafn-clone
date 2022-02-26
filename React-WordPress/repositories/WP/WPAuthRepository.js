import Router from 'next/router';
import { notification } from 'antd';
import { WPDomain } from '~/repositories/WP/WPRepository';
import axios from 'axios';

class WPAuthRepository {
    constructor(callback) {
        this.callback = callback;
    }

    errorResponse(err) {
        notification['error']({
            message: 'Registration Failed',
            description:
                err.response === undefined
                    ? String(err)
                    : err.response.data.message,
        });
    }

    async register(user, storeData, isVendor, dispatchLogin, setIsLoading) {
        const adminLogin = {
            username: process.env.username,
            password: process.env.password,
        };

        try {
            let admin = await axios.post(
                `${WPDomain}/wp-json/jwt-auth/v1/token`,
                adminLogin
            );

            let config = {
                headers: {
                    Authorization: `Bearer ${admin.data.token}`,
                },
            };

            // Register User
            let response = await axios.post(
                `${WPDomain}/wp-json/wp/v2/users`,
                user,
                config
            );

            if (response) {
                const userLogin = {
                    username: user.email,
                    password: user.password,
                };

                let response = await axios.post(
                    `${WPDomain}/wp-json/jwt-auth/v1/token`,
                    userLogin,
                    config
                );

                if (isVendor) {
                    // Update store data
                    let result = await axios.put(
                        `${WPDomain}/wp-json/dokan/v1/settings`,
                        storeData,
                        {
                            headers: {
                                Authorization: `Bearer ${response.data.token}`,
                            },
                        }
                    );

                    if (result) {
                        notification['success']({
                            message: 'Registration Successful!',
                        });
                        window.location.assign(
                            `http://localhost:5500/${response.data.token}`
                        );
                        setIsLoading(false);
                    } else {
                        localStorage.setItem('auth_token', response.data.token);
                        dispatchLogin();
                        Router.push('/');
                        setIsLoading(false);
                    }
                }
            }
        } catch (err) {
            this.errorResponse(err);
            setIsLoading(false);
        }
    }

    async login(loginData, dispatchLogin, setIsLoading) {
        try {
            let user = await axios.post(
                `${WPDomain}/wp-json/jwt-auth/v1/token`,
                loginData
            );

            if (user.data.user_role[0] === 'customer') {
                localStorage.setItem('auth_token', user.data.token);
                dispatchLogin();
                Router.push('/');
            } else {
                window.location.assign(
                    `http://localhost:5500/${user.data.token}`
                );
            }
            setIsLoading(false);
        } catch (err) {
            this.errorResponse(err);

            setIsLoading(false);
        }
    }
}

export default new WPAuthRepository();
