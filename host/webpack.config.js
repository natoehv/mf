const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container
	.ModuleFederationPlugin;
const path = require("path");

module.exports = {
	entry: "./index.js",
	mode: "development",
	devServer: {
		port: 3005,
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
			name: "home",
			filename: "remoteEntry.js",
			remotes: {
				content: `content@//localhost:3001/remoteEntry.js`,
				footer: `footer@//localhost:3002/remoteEntry.js`,
				header: `header@//localhost:3003/remoteEntry.js`,
				helpCenter: `helpCenter@//localhost:3004/remoteEntry.js`,
			},
			shared: [
				
			],
		}),
		new HtmlWebpackPlugin({
			template: "./index.html",
		}),
	],
};

