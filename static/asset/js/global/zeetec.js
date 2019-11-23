String.prototype.format = function() {
    let defaultString = this;
    for (let index in arguments) {
        defaultString = defaultString.replace("{" + index + "}", arguments[index])
    }
    return defaultString
}

String.prototype.numberComma = function () {
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
