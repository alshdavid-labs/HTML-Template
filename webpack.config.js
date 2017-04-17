const path = require('path');
const port = 8080
const host = "0.0.0.0"

module.exports = {
    devServer: {
        publicPath: "/",
        contentBase: "./public",
        port: port,
        host: host
    },
    entry: [
        "webpack-dev-server/client?http://localhost:" + port,
        "./public/scripts/scripts.js",
        "./public/styles/styles.scss"
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: "bundle.js"
    },
    module: {
        // loaders: [
        //     { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        // ],
        rules: [
             {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "postcss-loader" // compiles Sass to CSS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            }
        ]
    }
};