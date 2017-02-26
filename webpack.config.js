const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './app/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
				test:/\.vue$/,
				loader: 'vue-loader',
				options: { loaders: { html: 'pug-loader' } }
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }, {
                test: /\.(png|jpe?g|gif|svg|ttf|woff2?|eot)$/,
                loader: 'file-loader',
                options: { name: '[name].[ext]?[hash]' }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
};

if(process.env.NODE_ENV === 'production'){
    module.exports.devtool = '#source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: '"production"' }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: { warnings: false }
        }),
        new webpack.LoaderOptionsPlugin({ minimize: true })
    ]);
}
