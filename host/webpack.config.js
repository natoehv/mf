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
				content: `content@//localhost:3001/remoteEntry.js`, // jano - jorge
				footer: `footer@//localhost:3002/remoteEntry.js`, // jorge
				header: `header@//localhost:3003/remoteEntry.js`, // nato
				helpCenter: `helpCenter@//localhost:3004/remoteEntry.js`, // vicky
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

