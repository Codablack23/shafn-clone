/*
 * WPReact
 * Developed by: diaryforlife
 * */
import axios from 'axios';

// export const WPDomain = 'https://wp.nouhtml5.com';

// const username = 'ck_7c8c5cfbeadd6d7780f88355fd393f2ee147a843';
// const password = 'cs_d0cd71491fa24bf859e96d23b963e2c1b5ab9866';

  export const WPDomain = 'https://shafn.com';
  export const VendorDomain = 'http://localhost:5000'

  const username = 'ck_a1afc51ff351c0c57c490de46c158cb372e5dae7';
  const password = 'cs_0f193ce5d8accbb6286ecc6675d1c78d1181c1f5';

export const oathInfo = {
    consumer_key: username,
    consumer_secret: password,
};

export const customHeaders = {
    Accept: '*/*',
};

export const WPRepository = axios.create({
    headers: customHeaders,
});

