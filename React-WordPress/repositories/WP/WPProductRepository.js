import {
    oathInfo,
    WPDomain,
    WPRepository,
} from "~/repositories/WP/WPRepository";
import Repository, { serializeQuery } from "~/repositories/Repository";

const settings = {
    async: true,
    crossDomain: true,
    url: "http://shafn.com/wp-json/dokan/v1/stores",
    method: "GET",
    headers: {
        "Cache-Control": "no-cache",
    },
};

//   $.ajax(settings).done(function (response) {
//     console.log(response);
//   });

class WPProductRepository {
    constructor(callback) {
        this.callback = callback;
    }

    //For example, if you want to get data for a section, do the following:
    async getSectionProducts() {
        const queries = {
            per_page: 20,
        };

        const WPProducts = await WPProductRepository.getProducts(queries);
        setProductItems(WPProducts.items);

        useEffect(() => {
            getSectionProducts();
        }, []);
    }
    async getProductsByIds(payload) {
        const endPoint = `${baseDomain}/products?${payload}`;
        const response = await Repository.get(endPoint)
            .then((response) => {
                return {
                    items: response.data,
                };
            })

            .catch((error) => ({ error: JSON.stringify(error) }));
        return response;
    }

    async getProducts(payload, cancelToken) {
        let enpoint;
        if (payload) {
            enpoint = `wp-json/wc/v3/products?${serializeQuery({
                ...payload,
                ...oathInfo,
            })}`;
        } else {
            enpoint = "wp-json/wc/v3/products";
        }
        const reponse = await WPRepository.get(`${WPDomain}/${enpoint}`, {
            cancelToken,
        })
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    const data = {
                        items: response.data,
                        totalItems: response.headers["x-wp-total"],
                        totalPages: response.headers["x-wp-totalpages"],
                    };
                    return data;
                } else return null;
            })
            .catch((error) => {
                return null;
            });
        return reponse;
    }

    async getOnSaleProducts(payload, cancelToken) {
        let enpoint;
        if (payload) {
            enpoint = `wp-json/wc/v3/products?${serializeQuery({
                ...payload,
                ...oathInfo,
            })}`;
        } else {
            enpoint = "wp-json/wc/v3/products";
        }
        const reponse = await WPRepository.get(`${WPDomain}/${enpoint}`, {
            cancelToken,
        })
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    const data = {
                        items: response.data,
                        totalItems: response.headers["x-wp-total"],
                        totalPages: response.headers["x-wp-totalpages"],
                    };
                    return data;
                } else return null;
            })
            .catch((error) => {
                return null;
            });
        return reponse;
    }

    async getProductAttributes() {
        const enpoint = `/wp-json/wc/v3/products/attributes?${serializeQuery({
            ...oathInfo,
        })}`;
        const reponse = await WPRepository.get(`${WPDomain}/${enpoint}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getBrands() {
        const enpoint = `wp-json/wc/v3/products/attributes/10/terms?${serializeQuery(
            {
                ...oathInfo,
            }
        )}`;
        return await WPRepository.get(`${WPDomain}/${enpoint}`)
            .then((response) => {
                return response.data;
            })
            .catch(() => {
                return null;
            });
    }

    async getProductCategories(payload, cancelToken) {
        let enpoint;
        if (payload) {
            enpoint = `wp-json/wc/v3/products/categories?${serializeQuery({
                ...payload,
                ...oathInfo,
            })}`;
        } else {
            enpoint = "wp-json/wc/v3/products/categories";
        }
        const reponse = await WPRepository.get(`${WPDomain}/${enpoint}`, {
            cancelToken,
        })
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    const data = {
                        items: response.data,
                        totalItems: response.headers["x-wp-total"],
                        totalPages: response.headers["x-wp-totalpages"],
                    };
                    return data;
                } else return null;
            })
            .catch((error) => {
                return null;
            });
        return reponse;
    }

    async getProductByID(payload) {
        const enpoint = `wp-json/wc/v3/products/${payload}?${serializeQuery({
            ...oathInfo,
        })}`;
        const reponse = await WPRepository.get(`${WPDomain}/${enpoint}`)
            .then((response) => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                return null;
            });
        return reponse;
    }

    async getProductVariantsByID(payload) {
        const enpoint = `wp-json/wc/v3/products/${payload}/variations?${serializeQuery(
            {
                ...oathInfo,
            }
        )}`;
        const reponse = await WPRepository.get(`${WPDomain}/${enpoint}`)
            .then((response) => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                return null;
            });

        return reponse;
    }

    async getRelatedProductByID(payload) {
        const enpoint = `wp-json/wc/v2/products/?include=${payload}?${serializeQuery(
            {
                ...oathInfo,
            }
        )}`;
        const reponse = await WPRepository.get(`${WPDomain}/${enpoint}`)
            .then((response) => {
                console.log(response);
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getCategories() {
        const enpoint = `wp-json/wc/v3/products/categories?${serializeQuery({
            ...oathInfo,
        })}`;
        const reponse = await WPRepository.get(`${WPDomain}/${enpoint}`)
            .then((response) => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                return null;
            });
        return reponse;
    }

    async getCategoryByID(payload) {
        const enpoint = `wp-json/wc/v3/products/categories/${payload}?${serializeQuery(
            {
                ...oathInfo,
            }
        )}`;
        const reponse = await WPRepository.get(`${WPDomain}/${enpoint}`)
            .then((response) => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                return null;
            });
        return reponse;
    }

    async getReviews() {
        const endpoint = `wp-json/wc/v3/products/reviews/?${serializeQuery({
            ...oathInfo,
        })}`;

        const reponse = await WPRepository.get(`${WPDomain}/${endpoint}`)
            .then((response) => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                return null;
            });
        return reponse;
    }

    async createReview(payload) {
        const endpoint = `wp-json/wc/v3/products/reviews/?${serializeQuery({
            ...oathInfo,
        })}`;

        await WPRepository.post(`${WPDomain}/${endpoint}`, payload).then(
            (response) => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            }
        );
    }
}

export default new WPProductRepository();
