import { axios } from 'src/boot/axios'

export default class GetWidgetsData {
  static _requests = []

  static hasThisRequest(url) {
    return !!this.getRequest(url)
  }

  static addToRequests(url) {
    this._requests.push({
      url,
      // eslint-disable-next-line promise/param-names
      promise: new Promise(function (myResolve, myReject) {
        axios
          .get(url)
          .then((response) => {
            myResolve(response)
          })
          .catch((error) => {
            myReject(error)
          })
      })
    })
  }

  static getRequest(url) {
    return this._requests.find((request) => request.url === url)
  }

  static getData(url) {
    if (!this.hasThisRequest(url)) {
      this.addToRequests(url)
    }

    return this.getRequest(url).promise
  }
}
