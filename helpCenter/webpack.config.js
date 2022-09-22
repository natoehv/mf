const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { ModuleFederationPlugin } = webpack.container;

module.exports = {
	entry: "./index.js",
	mode: "development",
	devServer: {
		port: 3004,
	},
	output: {
		publicPath: "auto",
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: "babel-loader",
				exclude: /node_modules/,
				options: {
					presets: ["@babel/preset-react"],
				},
			},
		],
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "helpCenter",
			filename: "remoteEntry.js",
			exposes: {
				"./index": "./app.jsx",
			},
			shared: [
			
			],
		}),
		new HtmlWebpackPlugin({
			template: "./index.html",
		}),
	],
};
