const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const packageJson = require('./package.json')

const { ModuleFederationPlugin } = webpack.container;

module.exports = {
	entry: "./index.js",
	mode: "development",
	devServer: {
		port: 3001,
	},
	output: {
		publicPath: "auto",
	},
	resolve: {
    extensions: [".js", ".jsx"],
  },
	module: {
		rules: [
			{
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
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
			name: "content",
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
