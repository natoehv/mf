const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container
	.ModuleFederationPlugin;
const {webpackFormat} = require('./remotes');


module.exports = {
	entry: "./index.js",
	mode: "development",
	devServer: {
		port: 3005,
		hot: false,
		webSocketServer: false,
    liveReload: false
	},
	output: {
		publicPath: "auto",
	},
	resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
	module: {
		rules: [
			{
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
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
			name: "home",
			filename: "remoteEntry.js",
			remotes: webpackFormat,
			shared: [
				{
					react: { singleton: true, eager: true, requiredVersion: '^17.0.2' },
					"react-dom": { singleton: true, eager: true },
					"@fortawesome/fontawesome-svg-core": { singleton: true, eager: true },
					"@fortawesome/free-solid-svg-icons": { singleton: true, eager: true },
					"@fortawesome/react-fontawesome":{ singleton: true, eager: true },
				},
			],
		}),
		new HtmlWebpackPlugin({
			template: "./index.html",
		}),
	],
};

