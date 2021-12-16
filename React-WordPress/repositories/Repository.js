import axios from 'axios';
import app from 'next/app';
const baseDomain = 'http://45.76.97.89:3000';
export const wp = 'https://shafn.com';
//export const wp = 'http://wp.diaryforlife.info';

const authorization_prefix = 'Bearer ';

export const customHeaders = {
    "Accept": 'application/json',
    /* Authorization: authorization_prefix + token || undefined*/
    /*auth: {
        "username": "ck_a1afc51ff351c0c57c490de46c158cb372e5dae7",
        "password": "cs_0f193ce5d8accbb6286ecc6675d1c78d1181c1f5"
    }*/
};

export const baseUrl = `${baseDomain}`;

export default axios.create({
    baseUrl,
    headers: customHeaders,
});

export const serializeQuery = query => {
    return Object.keys(query)
        .map(
            key =>
                `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join('&');
};

