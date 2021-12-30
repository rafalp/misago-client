const CracoAlias = require("craco-alias")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      if (webpackConfig["mode"] !== "production") return webpackConfig

      // Namespace js files under "misago"
      webpackConfig.output.filename =
        "static/misago/js/[name].[contenthash:8].js"
      webpackConfig.output.chunkFilename =
        "static/misago/js/[name].[contenthash:8].chunk.js"

      // Same with media files
      webpackConfig.module.rules.forEach((ruleset) => {
        if (!ruleset.oneOf) return

        ruleset.oneOf.forEach((rule) => {
          if (rule.options && rule.options.name) {
            rule.options.name = rule.options.name.replace(
              "static",
              "static/misago"
            )
          }
        })
      })

      // And CSS files
      webpackConfig.plugins.forEach((plugin) => {
        if (!(plugin instanceof MiniCssExtractPlugin)) return

        plugin.options.filename =
          "static/misago/css/[name].[contenthash:8].css"
        plugin.options.chunkFilename =
          "static/misago/css/[name].[contenthash:8].chunk.css"
      })

      return webpackConfig
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: "./src/",
        tsConfigPath: "./tsconfig.paths.json",
      },
    },
  ],
}
