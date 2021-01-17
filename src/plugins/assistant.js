// import Toasted from 'vue-toasted';
import Vue from 'vue'
// Vue.use(Toasted)
let Assistant = function () {
    function getId(id) {
        if (typeof id === 'undefined' || id === null || id === '') {
            return false
        } else {
            return id.toString()
        }
    }

    function handleAxiosError(error) {
        let messages = []
        if (error === "can't get exam file") {
            toastMessages(['مشکلی در دریافت اطلاعات رخ داده است. لطفا مجدد تلاش کنید.'])
            return
        }
        if (!error || !error.response) {
            return
        }
        let statusCode = parseInt(error.response.status)
        if (statusCode === 500) {
            messages.push('مشکلی رخ داده است. مجدد تلاش کنید.')
        } else if (statusCode === 404) {
            messages.push('موردی یافت نشد.')
        } else if (statusCode === 401) {
            messages.push('ابتدا وارد سامانه شوید.')
        } else if (error.response.data.errors) {
            for (const [key, value] of Object.entries(error.response.data.errors)) {
                messages.push(value)
                console.log(`${key}: ${value}`);
            }
        } else if (error.response.data.error && !AjaxResponseMessages.isCustomMessage(error.response.data.error.code)) {
            messages.push(error.response.data.error.message)
        } else if (error.response.data.error && AjaxResponseMessages.isCustomMessage(error.response.data.error.code)) {
            messages.push(AjaxResponseMessages.getMessage(error.response.data.error.code))
        } else if (error.response.data) {
            for (const [key, value] of Object.entries(error.response.data)) {
                messages.push(value)
                console.log(`${key}: ${value}`);
            }
        }

        toastMessages(messages)
    }

    function toastMessages(messages) {
        messages.forEach( (item) => {
            Vue.prototype.$notify({
                group: 'notifs',
                title: 'توجه!',
                text: item,
                type: 'error'
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
        '0': 'مشکلی پیش آمده است. مجدد تلاش کنید.',
        '400': 'ابتدا وارد سامانه شوید.',
        '1': 'پیش از این در این آزمون ثبت نام انجام شده است.',
        '2': 'زمان آزمون فرا نرسیده است',
        '3': 'ثبت نام در این آزمون انجام نشده است.',
        '6': 'پاسخنامه داوطلب پیش از این ارسال شده است.',
        '7': 'زمان پاسخگویی قبل از شروع آزمون است.',
        '8': 'آزمون متعلق به کاربر نیست.'
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
