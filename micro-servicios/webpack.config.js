const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
    const defaultConfig = singleSpaDefaults({
        orgName: "roxfarma",
        projectName: "servicios",
        webpackConfigEnv,
        argv,
    });

    return webpackMerge.merge(defaultConfig, {
        devServer: {
            port: 9003,
        },
    });
};
