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
export const MAIN_DOMAIN =
  process.env.NEXT_PUBLIC_NODE_ENV === "production"
    ? "https://www.shafn.com"
    : "http://localhost:3000";
export const domain =
  process.env.NEXT_PUBLIC_NODE_ENV === "production"
    ? "https://dashboard.shafn.com"
    : "http://localhost:5500";

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
  consumer_key: process.env.NEXT_PUBLIC_CONSUMER_KEY,
  consumer_secret: process.env.NEXT_PUBLIC_CONSUMER_SECRET,
};

export const serializeQuery = (query) => {
  return Object.keys(query)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
    )
    .join("&");
};


export const  getUsers = async ()=>{
    const enpoint = `/wp-json/wp/v2/users/?${serializeQuery({
        ...oathInfo,
    })}`;
    const reponse = await axios.get(`${WPDomain}/${enpoint}`).then(
        (response) => response.data
    );

    return reponse;
}