import { WPDomain } from '~/repositories/WP/WPRepository';
import axios from 'axios';

class WPAuthRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async register(user, adminToken) {
        let response = await axios.post(
            `${WPDomain}/wp-json/wp/v2/users`,
            user,
            {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            }
        );

        return response;
    }

    async login(user) {
        const endpoint = `${WPDomain}/wp-json/jwt-auth/v1/token`;
        const response = await axios
            .post(endpoint, user)
            .then((res) => res.data);

        return response;
    }
}

export default new WPAuthRepository();
