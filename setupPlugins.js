'use strict'

const fs = require('fs-extra')
const glob = require("glob")
const path = require('path')

const main = () => {
  const plugins = glob.sync("plugins/*/client/src")
  copyPluginsToSrc(plugins)
  registerPluginsTypescript(plugins)
  registerPluginsStyles()
  registerPluginsTranslations()
}

const copyPluginsToSrc = (plugins) => {
  plugins.forEach((src) => {
    const name = getPluginName(src)
    const dst = `src/plugins/${name}`
    fs.copySync(src, dst)
  })
}

const registerPluginsTypescript = (plugins) => {
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

const registerPluginsStyles = () => {
  const variables = glob.sync("src/plugins/*/client/src/styles/variables.scss")
  const components = glob.sync("src/plugins/*/client/src/styles/components.scss")

  const styles = readFileLinesSync("src/styles/index.scss")
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

const PLUGIN_LOCALES_DELIMITER = "# Plugins locales"

const registerPluginsTranslations = () => {
  const locales = glob.sync("src/locale/**/messages.po")
  locales.forEach((filepath) => {
    // Reset locale file to original format
    const corePo = new String(fs.readFileSync(filepath))
    if (corePo.indexOf(PLUGIN_LOCALES_DELIMITER) !== -1) {
      const coreMessagesEnd = corePo.indexOf(PLUGIN_LOCALES_DELIMITER)
      const orgCorePo = corePo.substring(0, coreMessagesEnd).trim() + "\n"
      fs.writeFileSync(filepath, orgCorePo)
    }

    // Append plugins to core locale after delimiter
    fs.appendFileSync(filepath, `\n${PLUGIN_LOCALES_DELIMITER}\n`)

    const coreMessages = getCoreMessages(filepath)
    const pathSegments = filepath.split(path.sep)
    const lang = pathSegments[pathSegments.length - 2]
    const plugins = glob.sync(`src/plugins/*/client/src/locale/${lang}/messages.po`)

    plugins.forEach((pluginLocale) => {
      const pluginMessages = getPluginMessages(coreMessages, pluginLocale)
      if (pluginMessages.length) {
        fs.appendFileSync(filepath, pluginMessages)
      }
    })
  })
}

const getCoreMessages = (filepath) => {
  const lines = readFileLinesSync(filepath)
  const msgids = []
  lines.forEach((line) => {
    if (!line.trim().startsWith("msgid")) return
    let msgid = getMsgIdFromLine(line)
    if (msgids.indexOf(msgid) === -1) msgids.push(msgid)
  })
  return msgids
}

const getPluginMessages = (coreMessages, filepath) => {
  const newMessages = []
  const lastMessage = {
    comment: null,
    msgid: null,
  }
  
  const lines = readFileLinesSync(filepath)
  lines.forEach((line) => {
    if (line.trim().startsWith("#: ")) {
      lastMessage.comment = line
    }
    if (line.trim().startsWith("msgid ")) {
      lastMessage.msgid = line
    }
    if (line.trim().startsWith("msgstr ")) {
      if (lastMessage.msgid !== null) {
        const msgid = getMsgIdFromLine(lastMessage.msgid)
        if (coreMessages.indexOf(msgid) === -1) {
          newMessages.push("")
          newMessages.push(lastMessage.comment)
          newMessages.push(lastMessage.msgid)
          newMessages.push(line)
        }

        lastMessage.comment = null
        lastMessage.msgid = null
      }
    }
  })

  return newMessages.join("\n")
}

const readFileLinesSync = (file) => {
  return new String(fs.readFileSync(file)).split("\n")
}

const getMsgIdFromLine = (line) => {
    if (!line.trim().startsWith("msgid")) return null
    let msgid = line.trim().substr(5).trim()
    msgid = msgid.substr(1)
    msgid = msgid.substr(0, msgid.length - 1)
    return msgid
}

main()
