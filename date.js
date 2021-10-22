
exports.day =  () => {
    var today = new Date();

    var options = {
        weekday: 'long', day: 'numeric', month: 'long'
    }
    return today.toLocaleDateString('en-US', options);
}

console.log(exports)