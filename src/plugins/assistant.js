let Assistant = function () {
    function getId(id) {
        if (typeof id === 'undefined' || id === null || id === '') {
            return false
        } else {
            return id.toString()
        }
    }

    function handleAxiosError(error) {
        console.log('errors-------', error.errors)
        console.log('message-------', error.message)
        for (const [key, value] of Object.entries(error.response.data)) {
            this.$toasted.show(value, {
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
