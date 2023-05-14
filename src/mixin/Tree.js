import { APIGateway } from 'src/api/APIGateway'

const mixinTree = {
  methods: {
    showTree (refKey, callback) {
      return new Promise((resolve, reject) => {
        callback
          .then(node => {
            const treeComponent = this.$refs[refKey]
            if (!treeComponent) {
              resolve(node)
            }
            treeComponent.createRoot({
              title: node.title,
              id: node.id,
              type: node.type,
              order: node.order,
              parent: node.parent,
              children: node.children
            })
            resolve(node)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    getRootNode (nodeType) {
      return APIGateway.tree.getNodeByType(nodeType)
    },

    getNode (id) {
      return APIGateway.tree.getNodeById(id)
    },

    getNodeById (id, done, fail, loadChildOfNode) {
      return new Promise((resolve, reject) => {
        this.getNode(id)
          .then(node => {
            resolve(loadChildOfNode(node, done))
          }).catch(err => {
            console.error(err)
            if (fail) {
              reject(fail())
            }
          })
      })
    },

    createNode (parentId, type, title, order, callback) {
      return new Promise((resolve, reject) => {
        APIGateway.tree.createNode({
          data: { parent_id: parentId, type, title, order }
        })
          .then(node => {
            if (callback) {
              callback(node)
            }
            resolve(node)
          }).catch(err => {
            reject(err)
          })
      })
    },

    editNode (id, title, order) {
      return new Promise((resolve, reject) => {
        APIGateway.tree.editNode(id, {
          data: { title, order }
        })
          .then(node => {
            resolve(node)
          }).catch(err => {
            reject(err)
            console.error(err)
          })
      })
    },

    setTickedMode (refKey, key, state) {
      const ref = (this.$refs[refKey] && this.$refs[refKey][0] && this.$refs[refKey][0].$el) ? this.$refs[refKey][0]
        : (this.$refs[refKey] && this.$refs[refKey].$el) ? this.$refs[refKey]
            : null
      if (!ref) {
        return
      }
      ref.setNodesTicked(key, state)
    }
  }
}

export default mixinTree
