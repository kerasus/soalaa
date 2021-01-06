import moment from 'moment'
let Time = function () {
    function now() {
        return moment().format('YYYY-MM-DD hh:mm:ss');
    }

    return {
        now
    };
}();

export default Time
