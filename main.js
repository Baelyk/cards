let deck = new Deck()

// Testing shuffle
console.log(deck)
deck.shuffle()
console.log(deck)

// Testing drawing
let hand = new Hand()
hand.cards.push("hi")
console.log(hand.cards)

hand.draw(deck)

console.log(hand.cards)

// Testing discard
console.log(deck.discardPile)
deck.trash()
console.log(deck.deck)
console.log(deck.discardPile)
console.log(hand.cards)
hand.discard(deck, ["hi"])
console.log(hand.cards)
console.log(deck.discardPile)
