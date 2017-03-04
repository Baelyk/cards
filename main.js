let game = new Game()
let deck = game.newDeck()
let hand = game.newHand()

console.log(game)

// Testing shuffle
console.log(deck)
deck.shuffle()
console.log(deck)

// Testing drawing

hand.cards.push("hi")
console.log(hand.cards)

hand.draw(deck)

console.log(hand.cards)

/* // Testing discard
console.log(deck.discardPile)
deck.trash()
console.log(deck.deck)
console.log(deck.discardPile)
console.log(hand.cards)
hand.discard(deck, [new Card ("Hi", hand)])
console.log(hand.cards)
console.log(deck.discardPile) */

/* // Testing remove
console.log(deck.removedFromPlay)
deck.shred()
console.log(deck.deck)
console.log(deck.removedFromPlay)
console.log(hand.cards)
hand.removeFromPlay(deck, [new Card ("Hi", hand)])
console.log(hand.cards)
console.log(deck.removedFromPlay) */

// Testing in play

console.log(deck.inPlay)

// Testing Card

let testing = new Card ("hi")
