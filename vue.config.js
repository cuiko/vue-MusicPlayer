let path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  //axios域代理，解决axios跨域问题
  publicPath: "/",
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set("@", resolve("src")); // key,value自行定义，比如.set('@@', resolve('src/components'))
  }
};
