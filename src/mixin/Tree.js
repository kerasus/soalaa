import API_ADDRESS from 'src/api/Addresses'

const mixinTree = {
  methods: {
    showTree (refKey, nodeType) {
      return new Promise((resolve, reject) => {
        this.getRootNode(nodeType)
          .then(response => {
            const node = response.data.data
            let treeComponent = this.$refs[refKey]
            if (!treeComponent.createRoot) {
              treeComponent = this.$refs[refKey][0]
            }
            treeComponent.createRoot({
              title: node.title,
              id: node.id,
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

    getNodeById (id, done, fail, loadChildOfNode) {
      this.$axios.get(API_ADDRESS.tree.getNodeById(id))
        .then(response => {
          const node = response.data.data
          loadChildOfNode(node, done)
        }).catch(err => {
          console.log(err)
          if (fail) {
            fail()
          }
        })
    },

    createNode (parentId, title, order, callback) {
      return new Promise((resolve, reject) => {
        this.$axios.post(API_ADDRESS.tree.base, { parent_id: parentId, title: title, order: order })
          .then(response => {
            if (callback) {
              callback(response)
            }
          }).catch(err => {
            console.log(err)
          })
      })
    },

    editNode (id, title, order) {
      this.$axios.put(API_ADDRESS.tree.editNode(id), { title: title, order: order })
        .then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
    },

    setTicked (refKey, key, state) {
      this.$refs[refKey].setNodesTicked(key, state)
    }
  }
}

export default mixinTree
