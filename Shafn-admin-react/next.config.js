/*
* Martfury - Admin Template
* Homepage: https://themeforest.net/user/nouthemes/portfolio
* Created at: n/a
* Updated at: n/a

* */
const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");

const nextSettings = {
  env: {
    title: "ShafN",
    titleDescription: "Admin Template",
    username: "floppiessofficial@gmail.com",
    password: "_1511sf$1@/2",
  },
};

module.exports = withPlugins([withImages(), nextSettings]);
