const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const packageJson = require('./package.json')

const { ModuleFederationPlugin } = webpack.container;

module.exports = {
	entry: "./index.js",
	mode: "development",
	devServer: {
		port: 3002,
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
			name: "footer",
			filename: "remoteEntry.js",
			exposes: {
				"./index": "./app.jsx",
			},
			shared: [
				{
					react: { singleton: true, eager: true },
					"react-dom": { singleton: true, eager: true },
				},
			],
		}),
		new HtmlWebpackPlugin({
			template: "./index.html",
		}),
	],
};
