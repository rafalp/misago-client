'use strict'

const fs = require('fs-extra')
const glob = require("glob")
const path = require('path')

const main = () => {
  const plugins = glob.sync("plugins/**/client/src")
  copyPluginsToSrc(plugins)
  registerPluginsTs(plugins)
}

const copyPluginsToSrc = (plugins) => {
  plugins.forEach((src) => {
    const name = getPluginName(src)
    const dst = `src/plugins/${name}`
    fs.copySync(src, dst)
  })
}

const registerPluginsTs = (plugins) => {
  const imports = []
  const registers = []

  plugins.forEach((src, i) => {
    const name = getPluginName(src)
    imports.push(`import register${i} from "./${name}/plugin"`)
    registers.push(`register${i}()`)
  })

  let file = imports.join("\n")
  if (imports.length) file += "\n\n"

  file += "const setupPlugins = () => {"
  if (registers.length) {
    file += "\n  "
    file += registers.join("\n  ")
    file += "\n"
  } else {
    file += " "
  }
  file += "}\n\nexport default setupPlugins"

  fs.writeFileSync("src/plugins/index.ts", file)
}

const getPluginName = (src) => {
  return src.split(path.sep)[1]
}

main()
