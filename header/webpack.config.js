const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const packageJson = require('./package.json')
const { ModuleFederationPlugin } = webpack.container;

module.exports = {
	entry: "./index.js",
	mode: "development",
	devServer: {
		port: 3003,
		hot: false,
		webSocketServer: false,
    liveReload: false,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
			"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
		}
	},
	output: {
		publicPath: "auto",
	},
	module: {
		rules: [
			{
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
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
			name: "header",
			filename: "remoteEntry.js",
			exposes: {
				"./index": "./app.jsx?" + packageJson.version,
			},
			shared: [
				{
					react: { singleton: true, eager: true },
					"react-dom": { singleton: true, eager: true },
					"@fortawesome/fontawesome-svg-core": { singleton: true, eager: true },
					"@fortawesome/free-solid-svg-icons": { singleton: true, eager: true },
					"@fortawesome/react-fontawesome":{ singleton: true, eager: true },
				},
			],
		}),
		new WebpackManifestPlugin({
			generate: () => {
				return {
					v: packageJson.version
				}
			}
		}),
		new HtmlWebpackPlugin({
			template: "./index.html",
		}),
	],
};
