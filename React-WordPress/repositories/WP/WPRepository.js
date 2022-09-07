/*
 * WPReact
 * Developed by: diaryforlife
 * */
import axios from "axios";

export const WPDomain = "https://shafn.com";
export const VendorDomain = "http://localhost:5000";
export const DashboardDomain =
    process.env.NODE_ENV === "production"
        ? "https://www.dashboard.shafn.com"
        : VendorDomain;

export const oathInfo = {
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
};

export const customHeaders = {
    Accept: "*/*",
};

export const WPRepository = axios.create({
    headers: customHeaders,
});
