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
    draw(times = 1) {
        let drawnCards = []
        for(let i = 0; i < times; i++) {
            drawnCards.push(this.deck.shift())
        }
        return drawnCards
    }
    drawRandom(times = 1) {
        let drawnCards = []
        for (let i = 0; i < times; i++) {
            drawnCards.push(this.deck.remove(rand(0, this.deck.length), true))
        }
        return drawnCards
    }
    discard(cards) {
        this.discardPile = this.discardPile.concat(cards)
    }
    trash(times) {
        this.discardPile = this.discardPile.concat(this.draw(times))
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
    static remove(card, that) {
        that.cards.remove(card) // we want the instance of Hand's cards, not the class of Hand's cards, hence "that"
    }
    discard(deck, cards) {
        let that = this // forEaches don't play well with this apparently
        cards.forEach(function(card) {
            console.log(that)
            Hand.remove(card, that)
        })
        deck.discard(cards)
    }
}
