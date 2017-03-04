Array.prototype.remove = function(element, isIndex = false) { // Utility
    if (isIndex) {
        if (element >= 0) {
            return this.splice(element, 1)[0] // [0] to return the element not the array
        }
    } else {
        if (this.indexOf(element) >= 0) {
            return this.splice(element, 1)[0] // [0] to return the element not the array
        }
    }
}

function rand(min, max) { // Utility
    return Math.random() * (max - min) + min
}
