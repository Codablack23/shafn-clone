import { STRAPI_DOMAIN, WPDomain } from "~/repositories/WP/WPRepository";
import axios from "axios";

class WPPaymentRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async createPaymentIntent(payload) {
        const endpoint = `/api/stripe/create-payment-intent`;
        const response = await axios.post(endpoint, payload);

        return response.data;
    }

    async updatePaymentIntent(payload) {
        const endpoint = `/api/stripe/update-payment-intent/${payload.id}`;
        const response = await axios.post(endpoint, {
            orderId: payload.orderId,
        });

        return response.data;
    }

    async createOrderSession(payload) {
        const endpoint = `${STRAPI_DOMAIN}/api/orders`;
        const response = await axios.post(
            endpoint,
            { data: payload },
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
                },
            }
        );

        return response;
    }
}

export default new WPPaymentRepository();
