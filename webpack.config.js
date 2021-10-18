var path = require("path");

module.exports = {

    // Environment mode
    mode: "production",

    // Entry point of app
    entry: "./src/index.js",

    output: {
        path: path.resolve(__dirname, "docs"),
        filename: "bundle.js",
        publicPath: "/"
    },

    module: {
        rules: [
            {
                test: /\.md$/,
                use: [
                    {
                        loader: "html-loader"
                    },
                    {
                        loader: "markdown-loader",
                        options: {
                            "gfm": true,
                            "breaks": true
                        }
                    }
                ]
            }
        ]
    },

    performance : {
        hints : false
    },

    devServer: {
        static: {
            directory: path.join(__dirname, "docs"),
        },
        compress: true,
        port: 9000
    }
};