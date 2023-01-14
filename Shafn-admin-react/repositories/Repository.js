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
export const WPDomain = "https://api.shafn.com";
export const domain =
  process.env.NODE_ENV === "production"
    ? "https://shafn.com"
    : "http://localhost:3000";

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

export const oathInfo = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
};

export const serializeQuery = (query) => {
  return Object.keys(query)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
    )
    .join("&");
};
