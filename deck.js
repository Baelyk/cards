Array.prototype.remove = function(element, isIndex) {
        if (isIndex) {
            if (element >= 0) {
                return this.splice(element, 1)[0] // [0] to return the element not the array
            }
        } else {
            if (this.indexOf(element) >= 0) {
                return this.splice(element, 1)[0] // [0] to return the element not the array
            }
        }
    } // Utility

function rand(min, max) {
    return Math.random() * (max - min) + min
} // Utility

class Deck {
    constructor() {
        this.deck = ["a", "b", "c"]
        this.discardPile = []
    }
    shuffle() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            let temp = this.deck[i]
            this.deck[i] = this.deck[j]
            this.deck[j] = temp
        }
    }
    draw(times) {
        let drawnCards = []
        if(times === undefined) { // If times is undefined just draw one card
            drawnCards.push(this.deck.remove(rand(0, 3), true))
        } else { // If times is defiend draw times cards
            for(let i = 0; i < times; i++) {
                drawnCards.push(this.deck.remove(rand(0, 3), true))
            }
        }
        return drawnCards
    }
}

class Hand {
    constructor() {
        this.cards = []
    }
    draw(deck, times) {
        let drawnCards = deck.draw(times)
        this.cards = this.cards.concat(drawnCards)
        return drawnCards
    }
}
