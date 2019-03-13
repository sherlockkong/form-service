const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = (env) => {
	if (!env) env = {};

	const devMode = !env.prod;
	const plugins = devMode && [] || [new MiniCssExtractPlugin()];

	const config = {
		entry: {
			"form-builder": "./ClientApp/form-builder/boot.tsx",
			"form-data-editor": "./ClientApp/form-data-editor/boot.tsx",
		},

		mode: env.prod && 'production' || 'development',

		performance: {
			maxEntrypointSize: 1024 * 1024 * 5,      // Bytes
			maxAssetSize: 1024 * 1024 * 5,           // Bytes
		},

		optimization: {
			minimizer: [
				new UglifyJsPlugin({
					cache: true,
					parallel: true,
					sourceMap: true
				}),
				new OptimizeCSSAssetsPlugin({})
			],
			splitChunks: {
				cacheGroups: {
					vendor: {
						test: /node_modules/,
						chunks: 'initial',
						name: 'vendor',
						enforce: true
					},
				}
			} 
		},

		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, './wwwroot/dist')
		},

		plugins: plugins,

		module: {
			rules: [
				{ test: /\.jsx?$/, use: ['babel-loader'], exclude: /node_modules/ },
				{ test: /\.tsx?$/, use: ['babel-loader', 'awesome-typescript-loader?silent=true'], exclude: /node_modules/ },
				{
					test: /\.scss$/,
					use: [
						devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
						'css-loader',
						'sass-loader',
					],
				}
			]
		},

		resolve: {
			extensions: [".ts", ".tsx", ".js", ".jsx"]
		},
	}

	if (devMode) {
		plugins.push(new webpack.HotModuleReplacementPlugin());
		config.devtool = 'inline-source-map';
		config.devServer = {
			contentBase: './wwwroot/dist',
			port: 8080,
			hot: true
		};
	}

	return config;
};