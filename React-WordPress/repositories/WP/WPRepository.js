/*
 * WPReact
 * Developed by: diaryforlife
 * */
import axios from "axios";

export const STRAPI_DOMAIN =
    process.env.NEXT_PUBLIC_NODE_ENV === "production"
        ? "https://strapi.shafn.com"
        : "http://localhost:1337";
export const DOMAIN =
    process.env.NEXT_PUBLIC_NODE_ENV === "production"
        ? "https://shafn.com"
        : "http://localhost:3000";
export const WPDomain = "https://api.shafn.com";
export const VendorDomain = "http://localhost:5500";
export const DashboardDomain =
    process.env.NEXT_PUBLIC_NODE_ENV === "production"
        ? "https://www.seller.shafn.com"
        : VendorDomain;

export const oathInfo = {
    consumer_key: process.env.NEXT_PUBLIC_CONSUMER_KEY
        ? process.env.NEXT_PUBLIC_CONSUMER_KEY
        : process.env.CONSUMER_KEY,
    consumer_secret: process.env.NEXT_PUBLIC_CONSUMER_SECRET
        ? process.env.NEXT_PUBLIC_CONSUMER_SECRET
        : process.env.CONSUMER_SECRET,
};

export const customHeaders = {
    Accept: "*/*",
};

export const WPRepository = axios.create({
    headers: customHeaders,
});
