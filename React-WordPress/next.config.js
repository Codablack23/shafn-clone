const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");

const nextSettings = {
    env: {
        title: "ShafN",
        titleDescription: "We are here to serve you",
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

module.exports = withPlugins([withImages(), nextSettings]);
