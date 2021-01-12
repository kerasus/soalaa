import moment from 'moment'
// import store from '@/store/store'
// import { Quiz } from '@/models/Quiz'

let Time = function () {
    function now() {
        return moment().format('YYYY-MM-DD hh:mm:ss');
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
        setStateOfExamCategories
    };
}();

export default Time
