const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

const nextSettings = {
    env: {
        title: 'ShafN',
        titleDescription: 'ShafN We are here to serve you',
        username: 'floppiessofficial@gmail.com',
        password: '_1511sf$1@/2',
        google_clientID:
            '652023039992-oj4618l3ombdnpb168umti2a5nehi6ha.apps.googleusercontent.com',
        fb_appID: '1188145718594459',
        HTTPS: true,
    },
};

module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://shafn.com/:path*',
            },
        ];
    },
};

module.exports = withPlugins([withImages(), nextSettings]);
