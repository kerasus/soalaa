let Assistant = function () {
    function getId(id) {
        if (typeof id === 'undefined' || id === null || id === '') {
            return false
        } else {
            return id.toString()
        }
    }

    return {
        getId
    };
}();

export default Assistant
