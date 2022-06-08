import { WPDomain } from '~/repositories/WP/WPRepository';
import axios from 'axios';

class WPAuthRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async register(user, adminToken) {
        const endpoint = `${WPDomain}/wp-json/wp/v2/users`;
        const config = {
            headers: {
                Authorization: `Bearer ${adminToken}`,
            },
        };
        const response = await axios.post(endpoint, user, config);

        return response;
    }

    async login(user) {
        const endpoint = `${WPDomain}/wp-json/jwt-auth/v1/token`;
        // const endpoint = `${WPDomain}/?rest_route=/simple-jwt-login/v1/auth&email=${user.username}&password=${user.password}`;
        const response = await axios
            .post(endpoint, user)
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
}

export default new WPAuthRepository();
