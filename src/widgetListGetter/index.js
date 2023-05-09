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
    generateWidgetListJs(dirHierarchy, absolutePath)
  })
  return data
}

const generateWidgetListJs = (jsonData, absolutePath) => {
  const widgets = []
  function extractWidgets (json) {
    json.children.forEach(element => {
      if (element.type === 'widget') {
        widgets.push(element)
      } else {
        // eslint-disable-next-line no-prototype-builtins
        if (element.hasOwnProperty('children')) {
          extractWidgets(element)
        }
      }
    })
  }

  extractWidgets(jsonData)

  let widgetsComponentString = ''
  widgets.forEach((widget, index) => {
    const widgetName = widget.name
    const widgetPath = widget.path
    // console.log('index', index)
    // console.log('widgets.length', widgets.length)
    const lastComponent = ((widgets.length - 1) === index)
    // console.log('lastComponent', lastComponent)
    widgetsComponentString += '  ' + widgetName + ': defineAsyncComponent(() => import(\'src/' + widgetPath + '/' + widgetName + '.vue\'))'
    if (!lastComponent) {
      widgetsComponentString += ',\n'
    } else {
      widgetsComponentString += '\n'
    }
    // console.log('widgetsComponentString', widgetsComponentString)
  })

  let widgetsOptionPanelString = ''
  const widgetsOptionPanel = widgets.filter(widget => widget.optionPanel)
  widgetsOptionPanel.forEach((widget, index) => {
    const widgetName = widget.name
    const widgetPath = widget.path
    const hasOptionPanel = !!widget.optionPanel
    if (hasOptionPanel) {
      const widgetOptionPanelName = widgetName + 'OptionPanel'
      const widgetOptionPanelPath = widgetPath + '/' + 'OptionPanel'
      const lastComponent = (widgetsOptionPanel.length - 1 === index)
      widgetsOptionPanelString += '  ' + widgetOptionPanelName + ': defineAsyncComponent(() => import(\'src/' + widgetOptionPanelPath + '.vue\'))'
      if (!lastComponent) {
        widgetsOptionPanelString += ',\n'
      } else {
        widgetsOptionPanelString += '\n'
      }
    }
  })

  createComponentJsFile(widgetsComponentString, absolutePath, 'PageBuilderComponents')
  createComponentJsFile(widgetsOptionPanelString, absolutePath, 'PageBuilderOptionPanels')
}

function createComponentJsFile (componentsString, absolutePath, fileName) {
  let jsString = '' +
    'import { defineAsyncComponent } from \'vue\'\n' +
    '\n' +
    'export default {\n'

  jsString += componentsString

  jsString += '}\n'

  fs.writeFile(`${absolutePath}/${fileName}.js`, jsString, (err) => {
    if (err) throw err
    console.info('Data written to file (' + fileName + ')')
  })
}

module.exports.generateWidgetList = generateWidgetList
