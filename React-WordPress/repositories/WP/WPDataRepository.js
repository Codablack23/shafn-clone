import {
    oathInfo,
    WPDomain,
    WPRepository,
} from "~/repositories/WP/WPRepository";
import { serializeQuery } from "~/repositories/Repository";

class WPDataRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async getCountries() {
        const endpoint = `${WPDomain}/wp-json/wc/v3/data/countries?${serializeQuery(
            {
                ...oathInfo,
            }
        )}`;

        const response = WPRepository.get(endpoint).then((res) => res.data);

        return response;
    }
}

export default new WPDataRepository();
