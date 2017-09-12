/**
 *  SIMPLE WEBPACK CONFIG
 *  Just for learning how things work with webpack. 
 *
 *  What is done here:
 *   - manage JS & dependencies
 *   - manage SASS
 *   - extract and store built CSS file apart 
 *   - distinct builds for development and production
 *  
 */
const path = require('path'),
      ManifestPlugin = require('webpack-manifest-plugin')
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      UglifyJSPlugin = require('uglifyjs-webpack-plugin'); 

const extractCSS = new ExtractTextPlugin({
    filename: "css/main.css"
});

const isProduction = process.env.NODE_ENV === 'production';


let plugins = [
        extractCSS,
        new ManifestPlugin()
]

if (isProduction) {
    plugins.push(new UglifyJSPlugin());
}



module.exports = {
    entry: {
        app: "./js/index.js"
    },
    devtool: 'source-map',
    plugins: plugins,
    output: {
        path: path.resolve(__dirname, '../www/built'),
        // filename: "[name].[chunkhash].js"
        filename: "js/[name].js"
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: extractCSS.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            minimize: isProduction
                        }
                    }, {
                        loader: "sass-loader"
                    }],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: 'file-loader?' + JSON.stringify({
                    name: '[name].[ext]',
                    publicPath: '../',
                    outputPath: 'images/',
                })
            }
        ]
    }
};