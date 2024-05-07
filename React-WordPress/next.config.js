const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const nextSettings = {
    env: {
        TITLE: "ShafN",
        TITLE_DESCRIPTION: "Smarter Beauty Shopping",
        GOOGLE_CLIENTID: "652023039992-oj4618l3ombdnpb168umti2a5nehi6ha.apps.googleusercontent.com",
        FACEBOOK_APPID: "1188145718594459",
        ADMIN_USERNAME: "floppiessofficial@gmail.com",
        ADMIN_PASSWORD: "1188145718594459",
        NODEMAILER_AUTH_USER: "",
        NODEMAILER_AUTH_PASSWORD: "",
        CONSUMER_KEY: "ck_8780f4e0e8de23f507553d4ba0c781ebd1dcd635",
        CONSUMER_SECRET: "cs_ec782c1132885e67a5f955b0cf811d88e08186ad",
    },
};

module.exports = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "https://shafn.com/:path*",
            },
        ];
    },
};

module.exports = withPlugins([withImages(),nextSettings]);
