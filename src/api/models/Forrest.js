import APIRepository from '../classes/APIRepository'
import { apiV2 } from 'src/boot/axios'
import { TreeNode, TreeNodeList } from 'src/models/TreeNode.js'

const APIAdresses = {
  base: '/forrest/tree',
  bulkIndex: '/forrest/tree/bulk',
  tags: '/forrest/tags',
  grid: (grid) => '/forrest/tree/' + grid,
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

export default class ForrestAPI extends APIRepository {
  constructor() {
    super('tree', apiV2, '', '', APIAdresses)
    this.CacheList = {
      base: this.name + this.APIAdresses.base,
      bulkIndex: this.name + this.APIAdresses.bulkIndex,
      tags: this.name + this.APIAdresses.tags,
      grid: (grid) => this.name + this.APIAdresses.grid(grid),
      getMultiType: (grid) => this.name + this.APIAdresses.getMultiType(grid),
      getGradesList: this.name + this.APIAdresses.getGradesList,
      getNodeById: nodeId => this.name + this.APIAdresses.getNodeById(nodeId),
      getNodeByType: nodeType => this.name + this.APIAdresses.getNodeByType(nodeType),
      getNodeByTitle: nodeTitle => this.name + this.APIAdresses.getNodeByTitle(nodeTitle),
      editNode: id => this.name + this.APIAdresses.editNode(id),
      getLessonList: id => this.name + this.APIAdresses.getLessonList(id)
    }
  }

  index(data) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.base,
      data: this.getNormalizedSendData({
        page: 1 // Number
      }, data),
      resolveCallback: (response) => {
        return {
          treeNodeList: new TreeNodeList(response.data.data),
          paginate: response.data.meta
          // {
          //   current_page: 1,
          //   from: 1,
          //   last_page: 1,
          //   path: '...',
          //   per_page: 15,
          //   to: 10,
          //   total: 10
          // }
        }
      },
      rejectCallback: (error) => {
        return error
      }
    })
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

  getNodeBy(value, data) {
    const methodName = 'getNodeBy' + value
    let param = data.data.nodeType
    if (value === 'Id') {
      param = data.data.id
    }
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses[methodName](param),
      cacheKey: this.CacheList[methodName](param),
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

  getTags(data = {}, cache) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getMultiType(data),
      cacheKey: this.CacheList.getMultiType(data),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return response.data.data
        // return fillFakeData()
      },
      rejectCallback: (error) => {
        return error
        // return fillFakeData()
      }
    })
  }
}

// function fillFakeData() {
//   const treeNodes = [
//     {
//       children: [
//         {
//           id: '6281fbeb2f1bafe99f050336',
//           title: 'پایه دوازدهم',
//           parent: {
//             id: '6281fb9e2f1bafe99f050334',
//             title: 'درخت دانش'
//           },
//           ancestors: [
//             {
//               id: '6281fb9e2f1bafe99f050334',
//               title: 'درخت دانش'
//             }
//           ],
//           order: 1,
//           type: null,
//           number_of_children: 20,
//           updated_at: '2022-06-06 12:54:01',
//           created_at: '2022-05-16 11:53:23'
//         },
//         {
//           id: '628204312f1bafe99f050346',
//           title: 'پایه یازدهم',
//           parent: {
//             id: '6281fb9e2f1bafe99f050334',
//             title: 'درخت دانش'
//           },
//           ancestors: [
//             {
//               id: '6281fb9e2f1bafe99f050334',
//               title: 'درخت دانش'
//             }
//           ],
//           order: '1',
//           type: null,
//           number_of_children: 22,
//           updated_at: '2022-06-06 12:55:19',
//           created_at: '2022-05-16 12:28:41'
//         },
//         {
//           id: '62947d2624d62d858d09a4d2',
//           title: 'پایه دهم',
//           parent: {
//             id: '6281fb9e2f1bafe99f050334',
//             title: 'درخت دانش'
//           },
//           ancestors: [
//             {
//               id: '6281fb9e2f1bafe99f050334',
//               title: 'درخت دانش'
//             }
//           ],
//           order: 1,
//           type: null,
//           number_of_children: 19,
//           updated_at: '2022-06-06 12:58:16',
//           created_at: '2022-05-30 12:45:34'
//         },
//         {
//           id: '628204c52f1bafe99f05034a',
//           title: 'پایه نهم',
//           parent: {
//             id: '6281fb9e2f1bafe99f050334',
//             title: 'درخت دانش'
//           },
//           ancestors: [
//             {
//               id: '6281fb9e2f1bafe99f050334',
//               title: 'درخت دانش'
//             }
//           ],
//           order: '3',
//           type: null,
//           number_of_children: 8,
//           updated_at: '2022-06-06 12:56:52',
//           created_at: '2022-05-16 12:31:09'
//         },
//         {
//           id: '6284c10647a54520840442a2',
//           title: 'پایه هشتم',
//           parent: {
//             id: '6281fb9e2f1bafe99f050334',
//             title: 'درخت دانش'
//           },
//           ancestors: [
//             {
//               id: '6281fb9e2f1bafe99f050334',
//               title: 'درخت دانش'
//             }
//           ],
//           order: '4',
//           type: null,
//           number_of_children: 7,
//           updated_at: '2022-06-06 12:56:59',
//           created_at: '2022-05-18 14:18:54'
//         },
//         {
//           id: '629dba608c4d7e26720cece3',
//           title: 'پایه هفتم',
//           parent: {
//             id: '6281fb9e2f1bafe99f050334',
//             title: 'درخت دانش'
//           },
//           ancestors: [
//             {
//               id: '6281fb9e2f1bafe99f050334',
//               title: 'درخت دانش'
//             }
//           ],
//           order: '4',
//           type: null,
//           number_of_children: 7,
//           updated_at: '2022-06-06 12:57:12',
//           created_at: '2022-06-06 12:57:12'
//         },
//         {
//           id: '629dba888c4d7e26720cece5',
//           title: 'پایه ششم',
//           parent: {
//             id: '6281fb9e2f1bafe99f050334',
//             title: 'درخت دانش'
//           },
//           ancestors: [
//             {
//               id: '6281fb9e2f1bafe99f050334',
//               title: 'درخت دانش'
//             }
//           ],
//           order: '7',
//           type: null,
//           number_of_children: 6,
//           updated_at: '2022-06-06 12:57:52',
//           created_at: '2022-06-06 12:57:52'
//         },
//         {
//           id: '629dc3b58c4d7e26720ced28',
//           title: 'پایه پنجم',
//           parent: {
//             id: '6281fb9e2f1bafe99f050334',
//             title: 'درخت دانش'
//           },
//           ancestors: [
//             {
//               id: '6281fb9e2f1bafe99f050334',
//               title: 'درخت دانش'
//             }
//           ],
//           order: '8',
//           type: null,
//           number_of_children: 5,
//           updated_at: '2022-06-06 13:37:01',
//           created_at: '2022-06-06 13:37:01'
//         },
//         {
//           id: '62f8eb444dcdcce15d084e62',
//           title: 'پایه چهارم',
//           parent: {
//             id: '6281fb9e2f1bafe99f050334',
//             title: 'درخت دانش'
//           },
//           ancestors: [
//             {
//               id: '6281fb9e2f1bafe99f050334',
//               title: 'درخت دانش'
//             }
//           ],
//           order: '9',
//           type: null,
//           number_of_children: 0,
//           updated_at: '2022-08-23 17:26:06',
//           created_at: '2022-08-14 17:02:04'
//         }
//       ]
//     },
//     {
//       children: [
//         {
//           id: '63ff427566344faf860f0f9f',
//           title: 'دبیر 1',
//           parent: {
//             id: '63f37272c590054efc012d12',
//             title: 'دبیر'
//           },
//           ancestors: [
//             {
//               id: '63f37272c590054efc012d12',
//               title: 'دبیر'
//             }
//           ],
//           order: '0',
//           type: null,
//           number_of_children: 0,
//           updated_at: '2023-03-01 15:49:18',
//           created_at: '2023-03-01 15:47:57'
//         },
//         {
//           id: '63ff427c66344faf860f0fa0',
//           title: 'دبیر 2',
//           parent: {
//             id: '63f37272c590054efc012d12',
//             title: 'دبیر'
//           },
//           ancestors: [
//             {
//               id: '63f37272c590054efc012d12',
//               title: 'دبیر'
//             }
//           ],
//           order: '2',
//           type: null,
//           number_of_children: 1,
//           updated_at: '2023-03-01 15:49:18',
//           created_at: '2023-03-01 15:48:04'
//         },
//         {
//           id: '63ff429866344faf860f0fa2',
//           title: 'دبیر 3',
//           parent: {
//             id: '63f37272c590054efc012d12',
//             title: 'دبیر'
//           },
//           ancestors: [
//             {
//               id: '63f37272c590054efc012d12',
//               title: 'دبیر'
//             }
//           ],
//           order: '3',
//           type: null,
//           number_of_children: 0,
//           updated_at: '2023-03-01 15:49:18',
//           created_at: '2023-03-01 15:48:32'
//         },
//         {
//           id: '63ff42b466344faf860f0fa3',
//           title: 'دبیر 4',
//           parent: {
//             id: '63f37272c590054efc012d12',
//             title: 'دبیر'
//           },
//           ancestors: [
//             {
//               id: '63f37272c590054efc012d12',
//               title: 'دبیر'
//             }
//           ],
//           order: '4',
//           type: null,
//           number_of_children: 0,
//           updated_at: '2023-03-01 15:49:18',
//           created_at: '2023-03-01 15:49:00'
//         }
//       ]
//     }
//   ]

//   return treeNodes
// }
