import API_ADDRESS from 'src/api/Addresses'

const mixinTree = {
  methods: {
    showTree (refKey, callback) {
      return new Promise((resolve, reject) => {
        callback
          .then(response => {
            const node = response.data.data
            const treeComponent = this.$refs[refKey]
            if (!treeComponent) {
              return
            }
            treeComponent.createRoot({
              title: node.title,
              id: node.id,
              type: node.type,
              order: node.order,
              parent: node.parent,
              children: node.children
            })
            resolve(response)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    getRootNode (nodeType) {
      return this.$axios.get(API_ADDRESS.tree.getNodeByType(nodeType))
    },

    getNode (id) {
      return this.$axios.get(API_ADDRESS.tree.getNodeById(id))
    },

    getNodeById (id, done, fail, loadChildOfNode) {
      return new Promise((resolve, reject) => {
        this.getNode(id)
          .then(response => {
            const node = response.data.data
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
        this.$axios.post(API_ADDRESS.tree.base, { parent_id: parentId, type, title, order })
          .then(response => {
            if (callback) {
              callback(response)
            }
            resolve(response)
          }).catch(err => {
            reject(err)
          })
      })
    },

    editNode (id, title, order) {
      return new Promise((resolve, reject) => {
        this.$axios.put(API_ADDRESS.tree.editNode(id), { title, order })
          .then(res => {
            resolve(res)
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
