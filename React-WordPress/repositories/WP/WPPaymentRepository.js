import { STRAPI_DOMAIN } from "@/repositories/WP/WPRepository";
import axios from "axios";

class WPPaymentRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async createPaymentIntent(payload) {
        const endpoint = `/api/checkout`;
        const response = await axios.post(endpoint, payload);
        return response.data;
    }

    async updatePaymentIntent(payload) {
        const endpoint = `/api/stripe/update-payment-intent/${payload.id}`;
        const response = await axios.post(endpoint, payload.data);

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

    async updateOrderSession(payload) {
        const endpoint = `${STRAPI_DOMAIN}/api/orders/${payload.id}`;
        await axios.put(
            endpoint,
            { data: payload.data },
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
                },
            }
        );
    }
}

export default new WPPaymentRepository();
