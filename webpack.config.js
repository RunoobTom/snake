const path = require('path');
const htmlPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: path.join(__dirname, './app.js')
    },
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },{
                test: /\.scss$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                exclude: __dirname + 'node_modules',
                loader: 'babel-loader',
            },{
                test: /\.jsx$/,
                exclude: __dirname + 'node_modules',
                loader: 'babel-loader',
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 50000,
                            outputPath: './asset'
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        port: 9001,
            open: true,
            hot: true,
        // inline: true
    },
    plugins: [
        new htmlPlugin({
            template: "./index.html",
            title: "Webpack App123",
        }),
    ]
}