const path = require("path");

const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { ServiceWorkerPlugin } = require("service-worker-webpack");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "roxfarma";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new ServiceWorkerPlugin(),
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
      new CopyPlugin({
        patterns: [
          path.resolve(__dirname, "src", "manifest.json"),
          path.resolve(__dirname, "src", "logo20.svg"),
          path.resolve(__dirname, "src", "logo29.svg"),
          path.resolve(__dirname, "src", "logo36.svg"),
          path.resolve(__dirname, "src", "logo40.svg"),
          path.resolve(__dirname, "src", "logo48.svg"),
          path.resolve(__dirname, "src", "logo50.svg"),
          path.resolve(__dirname, "src", "logo57.svg"),
          path.resolve(__dirname, "src", "logo58.svg"),
          path.resolve(__dirname, "src", "logo60.svg"),
          path.resolve(__dirname, "src", "logo72.svg"),
          path.resolve(__dirname, "src", "logo76.svg"),
          path.resolve(__dirname, "src", "logo80.svg"),
          path.resolve(__dirname, "src", "logo87.svg"),
          path.resolve(__dirname, "src", "logo96.svg"),
          path.resolve(__dirname, "src", "logo100.svg"),
          path.resolve(__dirname, "src", "logo114.svg"),
          path.resolve(__dirname, "src", "logo120.svg"),
          path.resolve(__dirname, "src", "logo144.svg"),
        ],
        options: {
          concurrency: 100,
        },
      }),
    ],
  });
};
