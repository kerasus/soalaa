import { apiV2 } from 'src/boot/axios'
import APIRepository from '../classes/APIRepository.js'
import { Comment } from 'src/models/Comment.js'
export default class CommentAPI extends APIRepository {
  constructor() {
    super('comment', apiV2, '/comment', Comment)
    this.APIAdresses = {
      base: '/comment',
      getComment: (commentId) => `/product/${commentId}/content-comments`
    }
    this.CacheList = {
      getComment: (commentId) => this.name + this.APIAdresses.getComment(commentId)
    }
    this.restUrl = (id) => this.APIAdresses.base + '/' + id
    /* Setting the callback functions for the CRUD operations. */
    this.setCrudCallbacks({
      get: (response) => { return new Comment(response.data.data) },
      post: (response) => { return new Comment(response.data.data) },
      put: (response) => { return new Comment(response.data.data) },
      delete: (response) => { return response.data.data }
    })
  }

  getComment(data, cache = { TTL: 1000 }) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.APIAdresses.getComment(data.commentId),
      cacheKey: this.CacheList.getComment(data.commentId),
      ...(cache && { cache }),
      resolveCallback: (response) => {
        return new Comment(response.data.data[0])
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
