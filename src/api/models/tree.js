import APIRepository from '../classes/APIRepository'
import { apiV2 } from 'src/boot/axios'
import { TreeNode } from 'src/models/TreeNode.js'
const APIAdresses = {
  base: '/forrest/tree',
  getMultiType: (types) => {
    let treeAddress = '/forrest/tree?'
    types.forEach(element => {
      treeAddress = treeAddress + `multi-type[]=${element}&`
    })
    return treeAddress
  },
  getGradesList: '/forrest/tree?type=test',
  getNodeById(nodeId) {
    return '/forrest/tree/' + nodeId
  },
  getNodeByType(nodeType) {
    return '/forrest/tree?type=' + nodeType
  },
  getNodeByTitle(nodeType) {
    return '/forrest/tree?title=' + nodeType
  },
  editNode(id) {
    return '/forrest/tree/' + id
  },
  getLessonList(lessonId) {
    return '/forrest/tree/' + lessonId
  }
}

export default class TreeAPI extends APIRepository {
  constructor() {
    super('tree', apiV2, '', '', APIAdresses)
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      getGradesList: this.name + this.APIAdresses.getGradesList,
      getNodeById: nodeId => this.name + this.APIAdresses.getNodeById(nodeId),
      getNodeByType: nodeType => this.name + this.APIAdresses.getNodeByType(nodeType),
      getNodeByTitle: nodeTitle => this.name + this.APIAdresses.getNodeByTitle(nodeTitle),
      editNode: id => this.name + this.APIAdresses.editNode(id),
      getLessonList: id => this.name + this.APIAdresses.getLessonList(id)
    }
  }

  base(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      cacheKey: this.CacheList.base,
      ...(data?.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return new TreeNode(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  createNode(data = {}) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.APIAdresses.base,
      cacheKey: this.CacheList.base,
      data: data.data,
      ...(data?.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return new TreeNode(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getNodeById(data) {
    return this.getNodeBy('Id', data)
  }

  getNodeByType(data) {
    return this.getNodeBy('Type', data)
  }

  getNodeByTitle(data) {
    return this.getNodeBy('Title', data)
  }

  editNode(nodeId, data) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.APIAdresses.editNode(nodeId),
      cacheKey: this.CacheList.editNode(nodeId),
      ...(data?.cache && { cache: data.cache }),
      data: data.data,
      resolveCallback: (response) => {
        return new TreeNode(response.data.data)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getGradesList(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getGradesList,
      cacheKey: this.CacheList.getGradesList,
      ...(data?.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return response.data.data.children
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  getLessonList(data = {}) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getLessonList(data.data.id),
      cacheKey: this.CacheList.getLessonList(data.data.id),
      ...(data?.cache && { cache: data.cache }),
      resolveCallback: (response) => {
        return response.data.data.children
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
