var path = require('path');

module.exports = {

    // Environment mode
    mode: "development",

    // Entry point of app
    entry: "./src/index.js",

    output: {
        path: path.resolve(__dirname, "docs"),
        filename: "bundle.js",
        publicPath: "/"
    },

    devServer: {
        static: {
            directory: path.join(__dirname, "docs"),
        },
        compress: true,
        port: 9000
    }
};