import axios from "axios";
export const isGrapql = true;
const baseDomain = "http://localhost:1337";
/*const baseDomain = 'http://45.76.97.89:1337';*/
const authorization_prefix = "Bearer ";
export const customHeaders = {
  Accept: "application/json",
  /* Authorization: authorization_prefix + token || undefined*/
};

export const baseUrl = `${baseDomain}`;
export const WPDomain = "https://shafn.com";

export default axios.create({
  baseUrl,
  headers: customHeaders,
});

export async function fetchData(query) {
  const response = await axios({
    method: "POST",
    url: `${baseDomain}/graphql`,
    headers: customHeaders,
    data: {
      query: query,
    },
  });

  return response;
}

const username = "ck_a1afc51ff351c0c57c490de46c158cb372e5dae7";
const password = "cs_0f193ce5d8accbb6286ecc6675d1c78d1181c1f5";

export const oathInfo = {
  consumer_key: username,
  consumer_secret: password,
};

export const serializeQuery = (query) => {
  return Object.keys(query)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
    )
    .join("&");
};
