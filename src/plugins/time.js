import moment from 'moment'
import Assistant from "@/plugins/assistant";
// import store from '@/store/store'
// import { Quiz } from '@/models/Quiz'

let Time = function () {
    function now() {
        return moment().format('YYYY-MM-DD HH:mm:ss');
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
            return moment(base).add(amount, type).format('YYYY-MM-DD HH:mm:ss')
        }
        return moment().add(amount, type).unix()
    }

    function diff(a, b) {
        let aDiff = moment(a);
        let bDiff = moment(b);
        return aDiff.diff(bDiff) // 86400000
    }

    function setStateOfExamCategories(categories) {
        const now = this.now()
        categories.list.forEach( (category, index, categories) => {
            const prevCat = categories[index - 1]
            const nextCat = categories[index + 1]
            const lastCat = categories[categories.length - 1]
            const isLastCat = Assistant.getId(lastCat.id) === Assistant.getId(category.id)

            if (prevCat && getRemainTime(prevCat.accept_at) > 0) {
                category.is_active = false
            } else if (nextCat && getRemainTime(prevCat.accept_at) > 0) {
                category.is_active = false
            } else if (getPassedTime(lastCat.accept_at) > 0) {
                category.is_active = true
            } else category.is_active = category.accept_at > now;

            return category
        })
    }

    function getCurrentCategoryAcceptAt(categories) {
        const now = this.now()
        const currentCat = categories.list.find( (item) => item.is_active)
        const lastCat = categories[categories.length - 1]
        const isLastCat = Assistant.getId(lastCat.id) === Assistant.getId(category.id)

        if (currentCat && !isLastCat) {
            return currentCat
        } else if (currentCat && isLastCat) {
            return true
        } else {
            return false
        }
    }

    return {
        now,
        diff,
        msToTime,
        getRemainTime,
        getPassedTime,
        setStateOfExamCategories,
        getNextCategoryAcceptAt,
        addTime
    };
}();

export default Time
