const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = function (_env, argv) {
    const isProduction = argv.mode === "production";
    const isDevelopment = !isProduction;

    return {
        
        entry: "./src/index.js",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "assets/js/name.js",
            publicPath: "/"
        }, module: {
            rules: [
                // {
                //     // Match `.js`, `.jsx`, `.ts` or `.tsx` files
                //     test: /\.jsx?$/,
                //     loader: 'esbuild-loader',
                //     options: {
                //         target: 'es2015',
                //     },
                // },
                // { 
                //     test: /\.(js|jsx)$/, 
                //     exclude: /node_modules/, 
                //     use: ["babel-loader"] 
                // },
                {
                    test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                    exclude: /node_modules/,
                    use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                            cacheCompression: false,
                            envName: isProduction ? "production" : "development"
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                        "css-loader"
                    ]
                },
                {
                    test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                    use: {
                        loader: 'url-loader?limit=100000'
                    }
                }
            ]
        },
        resolve: {
            extensions: [".js", ".jsx"]
        },
        plugins: [
            isProduction &&
            new MiniCssExtractPlugin({
                filename: "assets/css/[name].[contenthash:8].css",
                chunkFilename: "assets/css/[name].[contenthash:8].chunk.css"
            })
        ].filter(Boolean)
    };
};