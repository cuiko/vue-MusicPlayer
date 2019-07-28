var path = require("path");
var webpack = require("webpack");
var TerserPlugin = require("terser-webpack-plugin");
var VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  entry: ["babel-polyfill", "./src/main.js"],
  output: {
    path: path.resolve(__dirname, "./dist/"),
    publicPath: "/dist/",
    filename: "js/bundle.js"
  },
  devtool: "eval-source-map",
  devServer: {
    historyApiFallback: true,
    overlay: true,
    inline: true,
    contentBase: "./public",
    port: process.env.PORT || 8080,
    host: "localhost",
    open: true
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.resolve("./src")
    }
  },
  plugins: [new VueLoaderPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        use: ["vue-style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.js[x]$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "resolve/[name].[ext]?[hash]"
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            less: ["vue-style-loader", "css-loader", "less-loader"]
          }
        }
      }
    ]
  }
};

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "source-map";
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      NODE_ENV: "production"
    })
  ]);
  module.exports.optimization = {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
  };
}
