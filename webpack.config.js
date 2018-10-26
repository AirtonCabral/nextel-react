const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html'
});

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(gif|svg|jpg|png|eot|woff|woff2|ttf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                include : path.join(__dirname, 'pages'),
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                        limit: 89192
                    }
                  }
                ]
            }
        ]
    },
    entry: [
        'babel-polyfill',
        './src/index'
    ],
    devServer: {
        historyApiFallback: true
    },
    plugins: [htmlPlugin]
};