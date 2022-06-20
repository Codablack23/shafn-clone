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
        const response = await axios
            .post(endpoint, user)
            .then((res) => res.data);

        return response;
    }

    async logout() {
        const endpoint = `${WPDomain}/route`;
        const response = await axios.post(endpoint).then((res) => res);

        return response;
    }
}

export default new WPAuthRepository();
