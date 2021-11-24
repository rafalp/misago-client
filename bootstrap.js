'use strict'

const fs = require('fs-extra')
const glob = require("glob")
const path = require('path')

const main = () => {
  const plugins = glob.sync("plugins/**/client/src")
  copyPluginsToSrc(plugins)
}

const copyPluginsToSrc = (plugins) => {
  plugins.forEach((src) => {
    const name = getPluginName(src)
    const dst = `src/plugins/${name}`
    fs.copySync(src, dst)
  })
}

const getPluginName = (src) => {
  return src.split(path.sep)[1]
}

main()
