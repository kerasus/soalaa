/* It's a class that wraps the APIInstanceWrapper class and provides a simple interface for making CRUD
requests to a RESTful API */
import APIInstanceWrapper from './APIInstanceWrapper'

export default class APIRepository {
  constructor(name, api, urlAddress, model, APIAdresses) {
    this.name = name
    this.api = api
    this.url = urlAddress
    this._model = model
    this.APIAdresses = APIAdresses
    this.FullAPIAdresses = APIAdresses === undefined || APIAdresses === null ? {} : this.getFullAPIAddress()
  }

  /**
   * It takes the APIAdresses object and adds the baseURL to each of the values
   * @returns An object with the same keys as the APIAdresses object, but with the values being the
   * baseURL + the APIAdresses values.
   */
  getFullAPIAddress() {
    const urlAddress = {}
    Object.keys(this.APIAdresses).map(item => {
      if (typeof this.APIAdresses[item] === 'function') {
        urlAddress[item] = (id) => {
          return this.api.defaults.baseURL + this.APIAdresses[item](id)
        }
      } else {
        urlAddress[item] = this.api.defaults.baseURL + this.APIAdresses[item]
      }
      return this.api.defaults.baseURL + this.APIAdresses[item]
    })
    return urlAddress
  }

  /**
   * It takes in a requestData object, and returns a promise that resolves to the result of the
   * resolveCallback function, or rejects to the result of the rejectCallback function
   * @param requestData - { apiMethod, api, request, cacheKey, cache, resolveCallback, rejectCallback, data, params }
   * @returns A promise that will resolve or reject based on the response from the API call.
   */
  sendRequest({ apiMethod, api, request, cacheKey, cache, resolveCallback, rejectCallback, data, params }) {
    return new Promise((resolve, reject) => {
      APIInstanceWrapper[apiMethod]({
        api,
        request,
        cacheKey,
        cache,
        params,
        data
      })
        .then((response) => {
          resolve(resolveCallback(response))
        })
        .catch((error) => {
          reject(rejectCallback(error))
        })
    })
  }

  /**
   * It takes two objects, merges them, and returns the merged object
   * @param defaultData - The default data that will be sent to the server.
   * @param data - The data to be sent to the server.
   * @returns The defaultSendData is being returned.
   */
  getNormalizedSendData(defaultData, data) {
    // for (const key of Object.keys(defaultData)) {
    //   if (data[key] === null || data[key] === undefined) {
    //     delete defaultData[key]
    //   }
    // }
    return Object.assign(defaultData, data)
  }

  /**
  explain
   */
  paramSerializer(params) {

  }

  /**
   * It sets the callbacks for the CRUD operations.
   * @param callbacks - an object with the following properties:
   */
  setCrudCallbacks(callbacks) {
    this.getResolveCallback = callbacks.get ? callbacks.get : (response) => { return response }
    this.postResolveCallback = callbacks.post ? callbacks.post : (response) => { return response }
    this.putResolveCallback = callbacks.put ? callbacks.put : (response) => { return response }
    this.deleteResolveCallback = callbacks.delete ? callbacks.delete : (response) => { return response }
  }

  /**
   * This function sends a GET request to the API endpoint for the entity, and returns the response
   * @param entityId - The id of the entity you want to get.
   * @returns The response from the server.
   */
  get(entityData) {
    return this.sendRequest({
      apiMethod: 'get',
      api: this.api,
      request: this.restUrl(entityData.data.id),
      cacheKey: this.restUrl(entityData.data.id) + '-get',
      cache: entityData.cache,
      resolveCallback: (response) => {
        return this.getResolveCallback(response)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }

  /**
   * It sends a POST request to the API, and returns the response
   * @param entityData - The data that will be sent to the API.
   * @returns The return value of the sendRequest function.
   */
  post(entityData) {
    return this.sendRequest({
      apiMethod: 'post',
      api: this.api,
      request: this.baseUrl,
      cacheKey: this.name + '-post',
      cache: entityData.cache,
      resolveCallback: (response) => {
        return this.postResolveCallback(response)
      },
      rejectCallback: (error) => {
        return error
      },
      data: new this._model(entityData.data)
    })
  }

  /**
   * The function sends a PUT request to the API, and returns the response
   * @param entityData - The data to be sent to the server.
   * @returns The return value of the sendRequest function.
   */
  put(entityData) {
    return this.sendRequest({
      apiMethod: 'put',
      api: this.api,
      request: this.restUrl(entityData.data.id),
      cacheKey: this.name + '-put',
      resolveCallback: (response) => {
        return this.putResolveCallback(response)
      },
      rejectCallback: (error) => {
        return error
      },
      data: new this._model(entityData.data)
    })
  }

  /**
  * It deletes an entity.
  * @param entityId - The id of the entity you want to delete.
  * @returns The promise object.
  */
  delete(entityId) {
    return this.sendRequest({
      apiMethod: 'delete',
      api: this.api,
      request: this.restUrl(entityId.data.id),
      cacheKey: this.name + '-delete',
      resolveCallback: (response) => {
        return this.deleteResolveCallback(response)
      },
      rejectCallback: (error) => {
        return error
      }
    })
  }
}
