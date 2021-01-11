// import Toasted from 'vue-toasted';
// import Vue from 'vue'
// Vue.use(Toasted)
let Assistant = function () {
    function getId(id) {
        if (typeof id === 'undefined' || id === null || id === '') {
            return false
        } else {
            return id.toString()
        }
    }

    function handleAxiosError($toasted, error) {
        console.log('error.response.data-------', error.response.data)
        for (const [key, value] of Object.entries(error.response.data)) {
            $toasted.show(value, {
                theme: "toasted-primary",
                position: "top-right",
                duration : 2000
            })
            console.log(`${key}: ${value}`);
        }
    }

    return {
        getId,
        handleAxiosError
    };
}();

export default Assistant
