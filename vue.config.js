const path = require("path");
// const CompressionPlugin = require("compression-webpack-plugin")
// const productionGzipExtensions = ['js', 'css']
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  outputDir: "dist",
  assetsDir: "assets",
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("mixins", resolve("src/mixins"))
      .set("components", resolve("src/components"))
      .set("assets", resolve("src/assets"))
      .set("api", resolve("src/api"))
      .set("views", resolve("src/views"));
  }
  //    configureWebpack: config => {
  //         if (process.env.NODE_ENV === 'production') {   //启动GZIP打包
  //             return {
  //                 plugins: [
  //                     new CompressionPlugin({
  //                         filename: '[path].gz[query]',
  //                         algorithm: 'gzip',
  //                         test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
  //                         threshold: 10240,
  //                         minRatio: 0.8,
  //                         deleteOriginalAssets: false
  //                     })
  //                 ]
  //             }
  //         }
  //     },
  // devServer:{
  //     open:false,          //当执行npm run serve 的时候自动弹出浏览器
  //     proxy:{
  //         '/api':{
  //             target:"url",
  //             wx:true,
  //             changOrigin:true,
  //             pathRewrite:{
  //                 '^/api':''
  //             }
  //         }
  //     }
  // }
};
