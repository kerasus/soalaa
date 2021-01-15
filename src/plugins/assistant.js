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
        let messages = []
        let statusCode = parseInt(error.response.status)
        if (AjaxResponseMessages.isCustomMessage(statusCode)) {
            messages.push(AjaxResponseMessages.getMessage(statusCode))
        } else if (error.response.data.errors) {
            for (const [key, value] of Object.entries(error.response.data.errors)) {
                messages.push(value)
                console.log(`${key}: ${value}`);
            }
        } else {
            for (const [key, value] of Object.entries(error.response.data)) {
                messages.push(value)
                console.log(`${key}: ${value}`);
            }
        }

        toastMessages($toasted, messages)
    }

    function toastMessages($toasted, messages) {
        messages.forEach( (item) => {
            $toasted.show(item, {
                theme: "toasted-primary",
                position: "top-right",
                duration : 2000
            })
        })
    }

    return {
        getId,
        handleAxiosError
    };
}();

let AjaxResponseMessages = function () {
    let messageMap = {
        '400': 'ابتدا وارد سامانه شوید.',
        '-1': 'پیش از این در این آزمون ثبت نام انجام شده است.'
    }

    function isCustomMessage(statusCode) {
        return !!(messageMap[statusCode.toString()])
    }

    function getMessage (statusCode) {
        return messageMap[statusCode]
    }

    return {
        isCustomMessage,
        getMessage
    }
}();

export default Assistant
