/*
 * WPReact
 * Developed by: diaryforlife
 * */
import axios from "axios";

export const WPDomain = "https://api.shafn.com";
export const VendorDomain = "http://localhost:5500";
export const DashboardDomain =
    process.env.NODE_ENV === "production"
        ? "https://www.seller.shafn.com"
        : VendorDomain;

export const oathInfo = {
    consumer_key: "ck_8780f4e0e8de23f507553d4ba0c781ebd1dcd635",
    consumer_secret: "cs_ec782c1132885e67a5f955b0cf811d88e08186ad",
};

export const customHeaders = {
    Accept: "*/*",
};

export const WPRepository = axios.create({
    headers: customHeaders,
});
