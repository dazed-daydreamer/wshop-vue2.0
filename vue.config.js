const path = require("path");
const CKEditorWebpackPlugin = require("@ckeditor/ckeditor5-dev-webpack-plugin");
const { styles } = require("@ckeditor/ckeditor5-dev-utils");
// const CompressionPlugin = require("compression-webpack-plugin")
// const productionGzipExtensions = ['js', 'css']
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  outputDir: "dist",
  assetsDir: "assets",
  transpileDependencies: [/ckeditor5-[^/\\]+[/\\]src[/\\].+\.js$/],
  configureWebpack: {
    plugins: [new CKEditorWebpackPlugin({})]
  },
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");
    config.resolve.alias
      .set("@", resolve("src"))
      .set("mixins", resolve("src/mixins"))
      .set("components", resolve("src/components"))
      .set("assets", resolve("src/assets"))
      .set("api", resolve("src/api"))
      .set("views", resolve("src/views"));
    svgRule.exclude.add(path.join(__dirname, "node_modules", "@ckeditor"));
    config.module
      .rule("cke-svg")
      .test(/ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/)
      .use("raw-loader")
      .loader("raw-loader");
    config.module
      .rule("cke-css")
      .test(/ckeditor5-[^/\\]+[/\\].+\.css$/)
      .use("postcss-loader")
      .loader("postcss-loader")
      .tap(() => {
        return styles.getPostCssConfig({
          themeImporter: {
            themePath: require.resolve("@ckeditor/ckeditor5-theme-lark")
          },
          minify: true
        });
      });
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
