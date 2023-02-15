const fs = require('fs'),
  path = require('path')
const { dirTree } = require('./getHierarchy')

const setJson = (obj) => {
  // eslint-disable-next-line no-prototype-builtins
  if (obj.hasOwnProperty('children')) {
    if (obj.children.find((x) => x.name === obj.name && x.file_type === 'vue')) {
      const srcPath = path.resolve('src/') + '/'
      obj.path = obj.path.replace(srcPath, '')
      obj.type = 'widget'
      obj.children.forEach((element) => {
        if (element.self_type === 'file' && element.file_type === 'json' && obj.name === element.name) {
          const rawData = fs.readFileSync(element.path)
          const jsonData = JSON.parse(rawData)
          obj.info = jsonData
        }
        if (element.self_type === 'file' && element.file_type === 'vue' && element.name === 'OptionPanel') {
          const optionPath = path.resolve('src/') + '/'
          obj.optionPanel = element.path.replace(optionPath, '')
          obj.optionPanelName = obj.name + 'OptionPanel'
        }
      })
      delete obj.children
      return
    } else {
      obj.type = 'folder'
    }
    obj.children.forEach((element) => {
      if (element.self_type === 'folder') {
        setJson(element)
      } else {
        if (element.file_type === 'json' && obj.name === element.name) {
          const rawData = fs.readFileSync(element.path)
          const jsonData = JSON.parse(rawData)
          obj.info = jsonData
        }
        if (element.file_type === 'vue' && element.name === 'OptionPanel') {
          obj.optionPanel = element.path
        }
      }
    })
  }
}

const generateWidgetList = (_dirname) => {
  const absolutePath = path.resolve(_dirname)
  const dirHierarchy = dirTree(absolutePath)

  setJson(dirHierarchy)

  const data = JSON.stringify(dirHierarchy, null, 2)

  fs.writeFile(`${absolutePath}/widget.json`, data, (err) => {
    if (err) throw err
    console.info('Data written to file')
  })
  return data
}

module.exports.generateWidgetList = generateWidgetList
