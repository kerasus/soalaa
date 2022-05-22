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
      {
        key: 'parentOfSelectedNode',
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

  findParents () {

  }

  findNode (nodeId, node) {
    if (!node) {
      node = this
    }

    if (node.id === nodeId) {
      return node
    }

    for (const childNode of node.children) {
      const isParentRepeated = this.parentOfSelectedNode.find(item => item.parentId === node.id)
      if (!isParentRepeated && childNode.parent === node.id) {
        this.parentOfSelectedNode.push({
          parentId: node.id,
          parentTitle: node.title
        })
      }
      if (childNode.children.length > 0) {
        // nodeId: the first given node.id
        const result = this.findNode(nodeId, childNode)
        if (result !== null) {
          return result
        }
      }
      if (childNode.id === nodeId) {
        return childNode
      }
    }
    this.parentOfSelectedNode = []
    return null
  }
}
class TreeNodeList extends Collection {
  model () {
    return TreeNode
  }
}
export { TreeNode, TreeNodeList }
