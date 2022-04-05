import { Model, Collection } from 'js-abstract-model'

class TreeNode extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'parent' },
      {
        key: 'ancestors',
        default: []
      },
      { key: 'type' },
      { key: 'updated_at' },
      { key: 'created_at' },
      {
        key: 'children',
        default: []
      },
      {
        key: 'lazy',
        default: true
      },
      { key: 'order' },
      {
        key: 'treeNodes'
      }

    ])
  }

  findNode (nodeId, node) {
    if (!node) {
      node = this
    }

    if (node.id === nodeId) {
      return node
    }

    for (const childNode of node.children) {
      if (childNode.children.length > 0) {
        const result = this.findNode(nodeId, childNode)
        if (result !== null) {
          return result
        }
      }
      if (childNode.id === nodeId) {
        return childNode
      }
    }

    return null
  }

  test () {
    console.log('hi')
  }
}
class TreeNodeList extends Collection {
  model () {
    return TreeNode
  }
}
export { TreeNode, TreeNodeList }
