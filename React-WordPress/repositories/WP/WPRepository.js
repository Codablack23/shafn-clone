/*
 * WPReact
 * Developed by: diaryforlife
 * */
import axios from "axios";

export const WPDomain = "https://shafn.com";
export const VendorDomain = "http://localhost:5000";
export const DashboardDomain =
    process.env.NODE_ENV === "production"
        ? "https://www.seller.shafn.com"
        : VendorDomain;

export const oathInfo = {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
};

export const customHeaders = {
    Accept: "*/*",
};

export const WPRepository = axios.create({
    headers: customHeaders,
});
