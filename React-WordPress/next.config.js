const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");

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

module.exports = withPlugins([withImages()]);
