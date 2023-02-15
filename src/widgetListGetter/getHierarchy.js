const fs = require('fs'),
  path = require('path')

const dirTree = (filename) => {
  const stats = fs.lstatSync(filename),
    info = {
      path: filename,
      name: path.parse(filename).name
    }

  if (stats.isDirectory()) {
    info.self_type = 'folder'
    info.children = fs.readdirSync(filename).map(function (child) {
      return dirTree(filename + '/' + child)
    })
  } else {
    // Assuming it's a file. In real life it could be a symlink or
    // something else!
    info.self_type = 'file'
    info.file_type = path.basename(filename).split('.').pop()
  }

  return info
}

module.exports.dirTree = dirTree
