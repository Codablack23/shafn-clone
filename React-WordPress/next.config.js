/*
* Martfury - Multipurpose Marketplace React Ecommerce Template
* Author: nouthemes
* Homepage: https://themeforest.net/user/nouthemes/portfolio
* Created at: 2019-11-15T08:00:00+07:00
* Updated at: 2020-11-06T15:29:20+07:00

* */
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

const nextSettings = {
    env: {
        title: 'ShafN',
        titleDescription: 'ShafN We are here to serve you',
    },
};

module.exports = withPlugins([withImages(), nextSettings]);
