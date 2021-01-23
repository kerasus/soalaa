import moment from 'moment'
import Assistant from "@/plugins/assistant";
// import Assistant from "@/plugins/assistant";
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
        categories.list.forEach( (category, index, categories) => {
            const prevCat = categories[index - 1]
            const lastCat = categories[categories.length - 1]
            const lastCatAcceptAtPassedTime = (!lastCat) ? -1 : getPassedTime(lastCat.accept_at, false)
            const prevCatAcceptAtRemainTime = (!prevCat) ? -1 : getRemainTime(prevCat.accept_at, false)
            const categoryAcceptAtRemainTime = (!category) ? -1 : getRemainTime(category.accept_at, false)
            const categoryAcceptAtPassedTime = (!category) ? -1 : getPassedTime(category.accept_at, false)

            if (lastCat && lastCatAcceptAtPassedTime > 0) {
                category.is_active = true
            } else if (prevCat && prevCatAcceptAtRemainTime > 0) {
                category.is_active = false
            } else if (categoryAcceptAtRemainTime > 0) {
                category.is_active = true
            } else if (categoryAcceptAtPassedTime > 0) {
                category.is_active = false
            }

            return category
        })
    }

    function getCurrentCategoryAcceptAt(categories) {
        const currentCat = categories.list.find( (item) => item.is_active)
        const lastCat = categories[categories.length - 1]

        if (lastCat && getPassedTime(lastCat.accept_at, false) > 0) {
            return false
        } else if (currentCat && getRemainTime(currentCat.accept_at, false) > 0) {
            return currentCat
        }
    }

    function setStateOfQuestionsBasedOnActiveCategory(quiz, questions) {
        const currentActiveCategory = getCurrentCategoryAcceptAt(quiz.categories)
        if (!currentActiveCategory) {
            for (const questionId in questions) {
                questions[questionId].in_active_category = true
            }
            // quiz.questions.list.forEach( (item, index) => {
            //     quiz.questions.list[index].in_active_category = true
            // })
            return
        }
        for (const questionId in questions) {
            questions[questionId].in_active_category = Assistant.getId(questions[questionId].sub_category.category_id) === Assistant.getId(currentActiveCategory.id);
        }

        // quiz.questions.list.forEach( (item, index) => {
        //     quiz.questions.list[index].in_active_category = Assistant.getId(item.sub_category.category_id) === Assistant.getId(currentActiveCategory.id);
        // })
    }

    return {
        now,
        diff,
        msToTime,
        getRemainTime,
        getPassedTime,
        setStateOfExamCategories,
        getCurrentCategoryAcceptAt,
        setStateOfQuestionsBasedOnActiveCategory,
        addTime
    };
}();

export default Time
