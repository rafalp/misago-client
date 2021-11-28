'use strict'

const fs = require('fs-extra')
const glob = require("glob")
const path = require('path')

const main = () => {
  const plugins = glob.sync("plugins/**/client/src")
  copyPluginsToSrc(plugins)
  registerPluginsTs(plugins)
  registerPluginsSass()
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

const MODE = {
  COPY: 0,
  SKIP: 1,
}

const registerPluginsSass = () => {
  const variables = glob.sync("src/plugins/**/styles/variables.scss")
  const components = glob.sync("src/plugins/**/styles/components.scss")

  const styles = new String(fs.readFileSync("src/styles/index.scss")).split("\n")
  const stylesNew = []

  let mode = MODE.COPY
  styles.forEach((l) => {
    const line = l.trim()
    if (mode === MODE.COPY) {
      if (line === "// Plugins variables") {
        stylesNew.push(line)
        stylesNew.push("")
        variables.forEach((plugin) => {
          stylesNew.push(`@import "..${plugin.substr(3)}";`)
        })
        if (variables.length) stylesNew.push("")
        mode = MODE.SKIP
      } else if (line === "// Plugins components") {
        stylesNew.push(line)
        stylesNew.push("")
        components.forEach((plugin) => {
          stylesNew.push(`@import "..${plugin.substr(3)}";`)
        })
        if (components.length) stylesNew.push("")
        mode = MODE.SKIP
      } else {
        stylesNew.push(line)
      }
    } else if (mode === MODE.SKIP) {
      if (line.substring(0, 2) === "//") {
        stylesNew.push(line)
        mode = MODE.COPY
      }
    }
  })

  fs.writeFileSync("src/styles/index.scss", stylesNew.join("\n"))
}

main()
