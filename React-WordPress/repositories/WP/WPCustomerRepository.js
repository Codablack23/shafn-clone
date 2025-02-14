import {
    oathInfo,
    WPDomain,
    WPRepository,
} from "@/repositories/WP/WPRepository";
import Repository, { serializeQuery } from "@/repositories/Repository";

class WPCustomerRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async getCustomer(id) {
        const enpoint = `/wp-json/wc/v3/customers/${id}?${serializeQuery({
            ...oathInfo,
        })}`;
        const reponse = await WPRepository.get(`${WPDomain}/${enpoint}`).then(
            (response) => response.data
        );

        return reponse;
    }
    async getCustomers() {
        const enpoint = `/wp-json/wc/v3/customers/?${serializeQuery({
            ...oathInfo,
        })}`;
        const reponse = await WPRepository.get(`${WPDomain}/${enpoint}`).then(
            (response) => response.data
        );

        return reponse;
    }

    async updateCustomer(id, payload) {
        const enpoint = `/wp-json/wc/v3/customers/${id}?${serializeQuery({
            ...oathInfo,
        })}`;
        const reponse = await WPRepository.put(
            `${WPDomain}/${enpoint}`,
            payload
        ).then((response) => response.data);

        return reponse;
    }
}

export default new WPCustomerRepository();
