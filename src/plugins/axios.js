import axios from 'axios'
import router from '@/router/index'
import Assistant from "@/plugins/assistant";

let Axios = function () {

    function notFound() {
        console.log('The requested resource does not exist or has been deleted')
    }

    function unauthorized() {
        let loginRouteName = 'login'
        if (router.history.current.name === loginRouteName) {
            return
        }
        console.log('Please login to access this resource')
        router.push({ name: loginRouteName })
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

            Assistant.handleAxiosError(this.$toasted, error)

            return Promise.reject(error);
        })
    }

    return {
        handleError
    };
}();

export default Axios
