import axios from 'axios'
import router from '@/router/index'

let Axios = function () {

    function notFound() {
        console.log('The requested resource does not exist or has been deleted')
    }

    function unauthorized() {
        console.log('Please login to access this resource')
        router.push({ name: 'login' })
    }

    function handleError() {
        axios.interceptors.response.use(undefined, function (error) {
            const statusCode = error.response ? error.response.status : null;

            if (statusCode === 404) {
                notFound()
            }

            if (statusCode === 401) {
                unauthorized()
            }

            return Promise.reject(error);
        })
    }

    return {
        handleError
    };
}();

export default Axios
