class Game {
    constructor() {
        this.decks = []
        this.hands = []
        this.primaryDeck = false
        this.tables = []
        this.primaryTable = false
    }
    static standard () {
        let game = new Game ()
        game.newDeck("standard")
        return game
    }
    static add (thing, game) {
        if(thing instanceof Deck) {
            game.decks.push(thing)
        } else if (thing instanceof Hand) {
            game.hands.push(thing)
        } else if (thing instanceof Table) {
            game.tables.push(thing)
        }
    }
    static create (thing, game) {
        if(thing == "deck") {
            thing = new Deck (arguments[2])
        } else if(thing == "hand") {
            thing = new Hand ()
        } else if(thing == "table") {
            thing = new Table()
        } else {
            thing = null
        }
        Game.add(thing, game)
        return thing
    }
    newDeck (deck) {
        if(!this.primaryDeck) {
            this.primaryDeck = Game.create("deck", this, deck)
            return this.primaryDeck
        } else {
            return Game.create("deck", this)
        }
    }
    newStandardDeck () {
        return this.newDeck("standard")
    }
    makePrimaryDeck (deck) {
        this.primaryDeck = primaryDeck
    }
    newHand () {
        return Game.create("hand", this)
    }
    newTable () {
        if(!this.primaryTable) {
            this.primaryTable = Game.create("table", this)
            return this.primaryTable
        } else {
            return Game.create("table", this)
        }
    }
    over () {
        this.decks = null
        this.hands = null
        this.tables = null
        this.primaryDeck = null
        this.primaryTable = null
        return null
    }
}

class Card { // later
    constructor(name, parent = false, other = {
        discarded: false,
        removed: false,
        suit: false,
        number: false
    }) {
        // this.where = where // Deck, Hand, or Discard
        if (name === undefined) throw "Error creating new Card instance: name undefined."
        this.name = name // The display name of the card
            // this.id = id // The unique id of the card (not sure if this will be used)
        this.parent = parent // its parent entity, e.g. the actual Deck its in (the intstance of it)
        this.discarded = other.discarded ? other.discarded : false
        this.removed = other.removed ? other.removed : false
        this.suit = other.suit ? other.suit : false
        this.number = other.number ? other.number : false
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

class Deck {
    constructor(type) {
        this.type = type
        this.deck = []
        if(type == "custom") {
            this.deck = arguments[1]
        } else if(type == "standard") {
            this.deck = Deck.standard(this)
        }
        this.inPlay = []
        this.discardPile = []
        this.removedFromPlay = []
        this.amountOfCards = this.deck.length
    }
    static standard (that) {
        let deck = []
        for(let i = 0; i < 52; i++) {
            let name, suit, num
            if(i >= 0 && i < 13) {
                suit = "Spades"
                if(i === 0) {
                    num = "Ace"
                } else if(i == 10) {
                    num = "Jack"
                } else if(i == 11) {
                    num = "Queen"
                } else if(i == 12) {
                    num = "King"
                } else {
                    num = i + 1
                }
            } else if(i >= 13 && i < 26) {
                suit = "Hearts"
                if(i - 13 === 0) {
                    num = "Ace"
                } else if(i - 13 == 10) {
                    num = "Jack"
                } else if(i - 13 == 11) {
                    num = "Queen"
                } else if(i - 13 == 12) {
                    num = "King"
                } else {
                    num = i - 12
                }
            } else if(i >= 26 && i < 39) {
                suit = "Diamonds"
                if(i - 26 === 0) {
                    num = "Ace"
                } else if(i - 26 == 10) {
                    num = "Jack"
                } else if(i - 26 == 11) {
                    num = "Queen"
                } else if(i - 26 == 12) {
                    num = "King"
                } else {
                    num = i - 25
                }
            } else if(i >= 39 && i < 52) {
                suit = "Clubs"
                if(i - 39 === 0) {
                    num = "Ace"
                } else if(i - 39 == 10) {
                    num = "Jack"
                } else if(i - 39 == 11) {
                    num = "Queen"
                } else if(i - 39 == 12) {
                    num = "King"
                } else {
                    num = i - 38
                }
            } else {
                suit = "Errors"
            }
            name = `${num} of ${suit}`
            num = typeof num == "string" ? num.charAt(0) : num
            // suit = "&" + suit.toLowerCase() + ";"
            let card = new Card(name, that, {suit: suit, number: num})
            deck.push(card)
        }
        return deck
    }
    shuffle() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            let temp = this.deck[i]
            this.deck[i] = this.deck[j]
            this.deck[j] = temp
        }
    }
    shuffleIn(cards = false) {
        if(!cards) {
            this.deck = this.deck.concat(this.discardPile)
        } else if(Array.isArray(cards)) {
            this.deck = this.deck.concat(cards)
        } else {
            this.deck.push(cards)
        }
        this.shuffle()
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
    static chooseFirst(that, times = 1) {
        let chosenCards = []
        for (let i = 0; i < times; i++) {
            chosenCards.push(that.cards.shift())
        }
        return chosenCards
    }
    discard(deck, cards = 1) {
        let that = this // forEaches don't play well with this apparently
        if(typeof cards == "number") {
            cards = Hand.chooseFirst(this, cards)
        }
        cards.forEach(function(card) {
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
    fold(deck) {
        this.discard(deck, this.cards)
    }
    play(to, cards = 1) {
        let that = this
        if(typeof cards == "number") {
            cards = Hand.chooseFirst(this, cards)
        }
        cards.forEach(function(card) {
            Hand.remove(card, that)
            card.move(to, "played")
        })
        to.getPlayedTo(cards)
        return cards
    }
    recieveCards(cards) {
        this.cards = this.cards.concat(cards)
    }
}

class Table {
    constructor () {
        this.cards = []
    }
    getPlayedTo (cards) {
        this.cards = this.cards.concat(cards)
    }
    giveCards (to) {
        to.recieveCards(this.cards)
        this.cards = []
    }
}
