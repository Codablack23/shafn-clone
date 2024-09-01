import axios from "axios";

const baseDomain = "http://45.76.97.89:3000/";
export const wp = "https://shafn.com/";

export const customHeaders = {
    Accept: "application/json",
};

export const baseUrl = `${baseDomain}`;

export default axios.create({
    baseUrl,
    headers: customHeaders,
    withCredentials: true,
});

export const serializeQuery = (query) => {
    return Object.keys(query)
        .map(
            (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join("&");
};