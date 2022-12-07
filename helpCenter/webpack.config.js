
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const packageJson = require("./package.json");
const { ModuleFederationPlugin } = webpack.container;

module.exports = {
  entry: "./src/index.js",
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
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
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
  resolve: {
    extensions: ['.tsx', '.ts', '.js', ".jsx"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "helpCenter",
      filename: "remoteEntry.js",
      exposes: {
        "./src/index": "./src/App.tsx",
      },
      shared: [
        {
          react: { singleton: true, eager: true, requiredVersion: '^17.0.2' },
          "react-dom": { singleton: true, eager: true },
          "@fortawesome/fontawesome-svg-core": { singleton: true, eager: true },
          "@fortawesome/free-solid-svg-icons": { singleton: true, eager: true },
          "@fortawesome/react-fontawesome": { singleton: true, eager: true },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};
