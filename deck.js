class Deck {
    constructor() {
        this.deck = [new Card("A", this), new Card("B", this), new Card("C", this)]
        this.inPlay = []
        this.discardPile = []
        this.removedFromPlay = []
        this.amountOfCards = this.deck.length
    }
    shuffle() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            let temp = this.deck[i]
            this.deck[i] = this.deck[j]
            this.deck[j] = temp
        }
    }
    draw(times = 1, drawingToHand = true) {
        let drawnCards = []
        for (let i = 0; i < times; i++) {
            drawnCards.push(this.deck.shift())
        }
        if(drawingToHand) this.inPlay = this.inPlay.concat(drawnCards)
        return drawnCards
    }
    drawRandom(times = 1) {
        let drawnCards = []
        for (let i = 0; i < times; i++) {
            drawnCards.push(this.deck.remove(rand(0, this.deck.length), true))
        }
        return drawnCards
    }
    discard(cards) { // Take cards from not in this deck and discard them
        this.discardPile = this.discardPile.concat(cards)
        let that = this
        cards.forEach(function(card) {
            card.move(that, "discarded")
        })
    }
    trash(times) { // Draw cards and discard them
        let trashedCards = this.draw(times, false)
        let that = this
        trashedCards.forEach(function(card) {
            card.move(that, "discarded")
        })
        this.discardPile = this.discardPile.concat(trashedCards)
    }
    remove(cards) { // Same as discarded, but removing
        this.removedFromPlay = this.removedFromPlay.concat(cards)
        let that = this
        cards.forEach(function(card) {
            card.move(that, "removed")
        })
    }
    shred(times) { // Same as trash, but removing
        let shreddedCards = this.draw(times, false)
        let that = this
        shreddedCards.forEach(function(card) {
            card.move(that, "removed")
        })
        this.removedFromPlay = this.removedFromPlay.concat(shreddedCards)
    }
}

class Hand {
    constructor() {
        this.cards = []
    }
    draw(deck, times) {
        let drawnCards = deck.draw(times)
        let that = this
        drawnCards.forEach(function (card) {
            card.move(that)
        })
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
            card.move(deck, "discarded")
        })
        deck.discard(cards)
    }
    removeFromPlay(deck, cards) {
        let that = this // forEaches don't play well with this apparently
        cards.forEach(function(card) {
            console.log(that)
            Hand.remove(card, that)
            card.move(deck, "removed")
        })
        deck.remove(cards)
    }
}

class Card { // later
    constructor(name, parent = false, other = {
        discarded: false,
        removed: false
    }) {
        // this.where = where // Deck, Hand, or Discard
        if (name === undefined) throw "Error creating new Card instance: name undefined."
        this.name = name // The display name of the card
            // this.id = id // The unique id of the card (not sure if this will be used)
        this.parent = parent // its parent entity, e.g. the actual Deck its in (the intstance of it)
        this.discarded = other.discarded
        this.removed = other.removed
    }
    move(newParent, why = "drawn") { // newParent is the new parent of the card, why is why it was moved (e.g. "drawn", "discarded", or "removed")
        this.parent = newParent
        if (why == "discarded") {
            this.discarded = true
        } else if (why == "removed") {
            this.removed = true
        } else { // if drawn (why == "drawn")
            this.discarded = false
            this.removed = false
        }
    }
}
