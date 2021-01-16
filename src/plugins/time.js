import moment from 'moment'
// import store from '@/store/store'
// import { Quiz } from '@/models/Quiz'

let Time = function () {
    function now() {
        return moment().format('YYYY-MM-DD HH:MM:SS');
    }

    function getPassedTime(startTime, formattedTime) {
        let passedDiff = diff(now(), startTime)
        if (typeof formattedTime === 'undefined' || formattedTime === true) {
            return msToTime(passedDiff)
        }
        return passedDiff
    }

    function getRemainTime(endTime, formattedTime) {
        let remainDiff = diff(endTime, now())
        if (typeof formattedTime === 'undefined' || formattedTime === true) {
            return msToTime(remainDiff)
        }
        return remainDiff
    }

    function msToTime(s) {
        // Pad to 2 or 3 digits, default is 2
        let pad = (n, z = 2) => ('00' + n).slice(-z);
        //+ '.' + pad(s%1000, 3)
        return pad(s/3.6e6|0) + ':' + pad((s%3.6e6)/6e4 | 0) + ':' + pad((s%6e4)/1000|0);
    }

    function addTime(amount, type, formattedTime, base) {
        if (formattedTime) {
            return moment(base).add(amount, type).format('YYYY-MM-DD HH:MM:SS')
        }
        return moment().add(amount, type).unix()
    }

    function diff(a, b) {
        let aDiff = moment(a);
        let bDiff = moment(b);
        return aDiff.diff(bDiff) // 86400000
    }

    function setStateOfExamCategories() {
        // const now = this.now()
        // console.log('store.getters.quiz.categories', store)
        // store.getters.quiz.categories.list.forEach( (category, index, categories) => {
        //     const prevCat = categories[index - 1]
        //
        //     if (prevCat && prevCat.end_at > now) {
        //         category.is_active = false
        //     } else category.is_active = category.end_at > now;
        //
        //     return category
        // })
    }

    return {
        now,
        diff,
        msToTime,
        getRemainTime,
        getPassedTime,
        setStateOfExamCategories,
        addTime
    };
}();

export default Time
