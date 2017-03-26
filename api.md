# cards API v0.1.0

## Game

### Properties

- `decks` [Array of [`Deck` instances]] - an array of all the `Deck` instances belonging to the game.
- `hands` [Array of [`Hand` instances]] - an array of all the `Hand` instances belonging to the game.
- `primaryDeck` [`Deck` instance] - the primary `Deck` instance.
- `tables` [Array of [`Table` instances]] - an array of all the `Table` instances belonging to the game.
- `primaryTable` [`Table` instance] - the primary `Table` instance.

### Game.constructor()

The `Game` constructor.

`new Game()`

**Parameters**

None.

**Returns**

None.

**Examples**

```js
let game = new Game()
```

### Game.standard()

Create a standard game (one 52 playing card deck).

`Game.standard()`

**Parameters**

None.

**Returns**

A `Game` instance with a standard 52-card deck.

**Example**

```js
let game = game.standard()
```

### Game.add()

Add a `Deck`, `Hand`, or `Table` instance to a game.

`Game.add(thing, game)`

**Parameters**

- `thing` [`Deck`, `Hand`, or `Table` instance]
- `game` [`Game` instance] - The `Game` instance the thing should be added too.

**Returns**

None.

**Examples**

```js
Game.add(new Deck, game)
```

### Game.create()

Create and add a `Deck`, `Hand`, or `Table` to a game.

`Game.create(thing, game[, constructor arguments ...])`

**Parameters**

- `thing` [`String`] - The type of thing to be added. Either `deck`, `hand`, or `table`.
- `game` [`Game` instance] - The `Game` instance the thing should be added too.
- `constructor arguments` - Arguments that you want to pass to the constructor of the instance to be made.

**Returns**

- `thing` [`Deck`, `Hand`, or `Table` instance] - The thing that was added to the game.

**Examples**

```js
let playerHand = Game.create("hand", game)
```

### game.newDeck()

Create and add a new Deck instance to the Game. If there is no primary deck for the game, than the created deck also becomes the primary deck.

`game.newDeck(deck)`

**Parameters**
- deck [`String`] - The type of deck to be created and added. Can be `null` or `standard`.

**Returns**
- deck [`Deck instance`] - The `Deck` instance that was created and added to the game.

**Examples**

```js
let deck = game.newDeck("standard")
```

### game.newStandardDeck()

Create and add a new standard deck to the Game. An alias of `game.newDeck("standard")`.

`game.newStandardDeck()`

**Parameters**

None.

**Returns**

- deck [`Deck` instance] - The `Deck` instance that was created and added to the game.

**Examples**

```js
let deck = game.newStandardDeck()
```

### game.makePrimaryDeck()

Make a deck the primary deck.

`game.makePrimaryDeck(deck)`

**Parameters**

- `deck` [`Deck instance`] - The `Deck` instance to be made the primary deck.

**Returns**

None.

**Examples**

```js
game.makePrimaryDeck(new Deck("standard"))
```

### game.newHand()

Create and add a new `Hand` instance to the `Game` instance.

`game.newHand()`

**Parameters**

None.

**Returns**

- `hand` (`Hand instance`) - The hand created and added to the Game.

**Examples**

```js
let hand = game.newHand()
```

### game.newTable()

Create and add a new Table instance to the Game.

`game.newTable()`

**Parameters**

None.

**Returns**

- `table` (`Table instance`) - The table created and added to the Game.

**Examples**

```js
let table = game.newTable()
```

### game.over()

End the game. Makes all of the properties of the Game null.

`game.over()`

**Parameters**

None.

**Returns**

- null

**Examples**

```js
game = game.over()
```

## Card

### Properties

- `name` [`String`] - the name of the card.
- `parent` [`Deck`, `Hand`, or `Table` instane] - the `Deck`, `Hand`, or `Table` instance that the card is in.
- `discarded` [`Boolean`] - whether the card is discarded.
- `removed` [`Boolean`] - whether the card is removed from play.
- `suit` [`String`, `Number`, `Boolean`] - the suit of the card, it defaults to `false`.
- `number` [`String`, `Number`, `Boolean`] - the number of the card, it defaults to `false`.

### Card.constructor()

The `Card` constructor.

```js
new Card(name[, parent = false[, other = {
    discarded: false,
    removed: false,
    suit: false,
    number: false
}]])
```

**Parameters**

- name [String] - the name of the card.
- parent [Deck, Hand, or Table instance, Boolean] - where the card is. If not specified, defaults to `false`.
- other [Object]
    - `discarded` [`Boolean`] - whether or not the card has been discarded. Defaults to `false`.
    - `removed` [`Boolean`] - whether or not the card has been removed. Defaults to `false`.
    - `suit` [`String`, `Number`, or `Boolean`] - the suit of the card. Defaults to `false`.
    - `number` [`String`, `Number`, or `Boolean`] - the "number" of the card. Doesn't actually need to be a number, e.g. a Jack. Defaults to `false`.

**Returns**

None.

**Examples**

```js
let card1 = new Card("3 of Spades", deck, {
    suit: "spades",
    number: 3
})

let card2 = new Card("Queen of Hearts", deck, {
    suit: "hearts",
    number: "Queen"
})
```

### card.move()

Move a card to a `Deck` or `Hand instance`.

`card.move(newParent[, why])`

**Parameters**

- `newParent` (`Deck` or `Hand instance`) - The new "parent" of the card.
- `why` (`String`) - Why it was moved. Defaults to `drawn`. Can be `drawn`, `discarded`, or `removed`.

**Returns**

None.

**Examples**

```js
card.move(deck, "discarded")

card.move(hand, "drawn")
```

## Deck

### Properties

- `type` [`String`] - can be `custom` or `standard`.
- `deck` [`Array of [Card instances, Other]`] - the cards in the deck.
- `inPlay` [`Array of [Card instances, Other]`] - the cards that were in the deck but are now in a `Hand` or a `Table` instance.
- `discardPile` [`Array of [Card instances, Other]`] - the cards that were in the deck but have since been discarded (and are now in the discard pile).
- `removedFromPlay` [`Array of [Card instances, Other]`] - the cards that were in the deck but have since been removed from play (and are now in the removed from play pile).
- `amountOfCards` [`Number`] - the amount of cards in `deck`.

### Deck.constructor()

The Deck constructor.

`new Deck([type = "custom"[, cards]])`

**Parameters**

- `type` [`String`] - can be `custom` or `standard`. If standard, uses `Deck.standard(this)` to define itself as a standard deck.
- `cards` [`Array`] - the cards to set to its deck property. Only used if `type` is `custom`.

**Returns**

None.

**Examples**

```js
let deck1 = new Deck("standard")

let deck2 = new Deck("custom", ["a", "b", "c"])
```

### Deck.standard()

Create a standard deck.

`Deck.standard(that)`

**Parameters**

- `that` (`Deck instance`) - The parent deck for the cards.

**Returns**

- `deck` (`Array of [Card instances, Other]`) - An array of cards.

**Examples**

```js
deck.deck = Deck.standard(deck)
```

### deck.shuffle()

Shuffle the deck.

`deck.shuffle()`

**Parameters**

None.

**Returns**

None.

**Examples**

```js
let deck = Deck.standard(deck)
console.log(deck.cards) // Organized deck
deck.shuffle()
console.log(deck.cards) // Shuffled deck
```

### deck.shuffleIn()

Shuffle cards into the deck.

`deck.shuffleIn(cards)`

**Parameters**

- `cards` [`Array of [Card instances, Other], Card instance`] - the card(s) to be shuffled into the deck.

**Returns**

None.

**Examples**

```js
deck.shuffleIn(["a", "b"])
deck.shuffleIn("c")
```

### deck.draw()

Return cards from the top of the deck.

`deck.draw([times = 1, drawingToHand = true)]`

**Parameters**

- `times` [`Number`] - the number of cards to be returned.
- `drawingToHand` [`Boolean`] - whether or not the return cards will be going to a hand. If `true` the returned cards will also be moved to deck.inPlay.

**Returns**

- `drawnCards` [Array of [Card instances, Other]] - the drawn cards.

**Example**

```js
hand.cards.concat(deck.draw(2, true))
```

### deck.drawRandom()

Return random cards from the deck.

`deck.drawRandom([times = 1])`

**Parameters**

- `times` [`Number`] - the number of cards to be returned.

**Returns**

- drawnCards [`Array of [Card instances, Other]`] - the randomly drawn cards.

**Examples**

```js
hand.cards.concat(deck.drawRandom(5))
```

### deck.discard()

Discard cards from the deck.

`deck.discard(cards)`

**Parameters**

- `cards` [Array of [Card instances, Other]] - the cards to be discarded.

**Returns**

None.

**Examples**

```js
hand.cards.concat(deck.discard(5))
```

### deck.trash()

Draw cards from the top of the deck and discard them.

`deck.trash([times = 1])`

**Parameters**

- `times` [`Number`] - the number of cards to draw and discard.

**Returns**

None.

**Examples**

```js
deck.trash(2)
```

### deck.remove()

Remove cards from the deck.

`deck.discard(cards)`

**Parameters**

- `cards` [`Array of [Card instances, Other]`] - the cards to be removed.

**Returns**

None.

**Examples**

```js
hand.cards.concat(deck.remove(5))
```

### deck.trash()

Draw cards from the top of the deck and remove them.

`deck.trash([times = 1])`

**Parameters**

- `times` [`Number`] - the number of cards to draw and remove.

**Returns**

None.

**Examples**

```js
deck.remove(2)
```

## Hand

### Properties

- `cards` [`Array of [Card instances, Other]`] - an array of the cards in the hand.

### Hand.constructor()

The Hand constructor.

`new Hand.constructor()`

**Parameters**

None.

**Returns**

None.

**Examples**

```js
let hand = new Hand()
```

### Hand.remove()

Remove cards from the hand. Note, this is different than removing from play, like `deck.remove()`.

`Hand.remove(card, that)`

**Parameters**

- card [`Card instance`, `Other`] - the card to be removed from the hand.
- that [`Hand instance`] - the hand to remove the card from.

**Returns**

None.

**Examples**

```js
Hand.remove(hand.cards[1], hand)
```

### Hand.chooseFirst()

Choose and remove cards. This is not random, and will always start with the first cards.

`Hand.chooseFirst(that[, times = 1])`

**Parameters**

- `that` [`Hand instance`] - the hand to choose the cards from.
- `times` [`Number`] - the amount of cards to choose.

**Returns**

- `chosenCards` [`Array of [Card instance, other]`] - the cards that were chosen.

**Examples**

```js
let card = Hand.chooseFirst(hand)[0]
let threeCards = Hand.chooseFirst(hand, 3)
```

### hand.draw()

Draw cards from a deck and add them to the hand.

`hand.draw(deck[, times = 1])`

**Parameters**

- `deck` [`Deck instance`] - the deck to draw from.
- `times` [`Number`] - the number of cards to draw, defaults to `1`.

**Returns**

- `drawnCards` [`Array of [Card instance, other]`] - the cards that were drawn and added to the hand.

**Examples**

```js
console.log(`The player drew ${hand.draw(deck)[0]}`)
```

### hand.discard()

Discard some cards or a specified amount of cards from the start of the hand.

`hand.discard(deck[, cards = 1])`

**Parameters**

- `deck` [`Deck instance`] - the deck to discard to.
- `cards` [`Array of [cards from the hand]`, `Number`] - if the array, remove those cards from the hand; if the number choose that amount of cards using `Hand.chooseFirst(hand, cards)`, then remove those cards from the hand.

**Returns**

None.

**Examples**

```js
let hand.cards = ["a", "b", "c"]
hand.discard(deck, ["a"]) // hand.cards is now ["b", "c"]
hand.discard(deck) // hand.cards is now ["c"]

let hand.cards = ["a", "b", "c"]
hand.discard(deck, 2) // hand.cards is now ["c"]
```

### hand.removeFromPlay()

Remove some cards or a specified amount of cards from the start of the hand.

`hand.removeFromPlay(deck[, cards = 1])`

**Parameters**

- `deck` [`Deck instance`] - the deck to remove to.
- `cards` [`Array of [cards from the hand]`, `Number`] - if the array, remove those cards from the hand; if the number choose that amount of cards using `Hand.chooseFirst(hand, cards)`, then remove those cards from the hand.

**Returns**

None.

**Examples**

```js
let hand.cards = ["a", "b", "c"]
hand.removeFromPlay(deck, ["a"]) // hand.cards is now ["b", "c"]
hand.removeFromPlay(deck) // hand.cards is now ["c"]

let hand.cards = ["a", "b", "c"]
hand.removeFromPlay(deck, 2) // hand.cards is now ["c"]
```

### hand.fold()

Discard your entire hand.

`hand.fold(deck)`

**Parameters**

- `deck` [`Deck instance`] - the deck to discard the hand to.

**Returns**

None.

**Examples**

```js
hand.fold(deck)
```

### hand.play()

Play card(s) to a table.

`hand.play(to[, cards = 1])`

**Parameters**

- `to` [`Table instance`] - the Table instance to play the cards to.
- `cards` [`Array of [Card instances, Other]`, `Number`] - if an array, play those cards to the table. If a number, use `Hand.chooseFirst(hand, cards)` to get an array, then play those cards to the table. "Playing those to the table" uses `table.getPlayedTo(cards)`.

**Returns**

- `cards` [`Array of [Card instances, Other]`] - if cards the paramater was a number, the array produced with `Hand.chooseFirst(hand, cards)` is returned. Otherwise, both are the same.

**Examples**

```js
hand.play(table, 2)
```

### hand.recieveCards()

Add cards to the hand.

`hand.recieveCards(cards)`

**Parameters**

- `cards` [`Array of [Card instances, Other]`] - the array of cards to concatenate to the hand.

**Returns**

None.

**Examples**

```js
let hand.cards = ["a", "b", "c"]
hand.recieveCards(["d", "e", "f"]) // hand.cards is now ["a", "b", "c", "d", "e", "f"]
```

## Table

### Properties

- `table` [`Array of [Card instances, Other]`] - an array of the cards in the table.

### Table.constructor()

The Table constructor.

`new Table()`

**Parameters**

None.

**Returns**

None.

**Examples**

```js
let table = new Table()
```

### table.getPlayedTo()

Add cards to the table.

`table.getPlayedTo(cards)`

**Parameters**

- `cards` [`Array of [Card instances, Other]`] - the array of cards to concatenate to the table.

**Returns**

None.

**Examples**

```js
let table.cards = ["a", "b", "c"]
table.getPlayedTo(["d", "e", "f"]) // table.cards is now ["a", "b", "c", "d", "e", "f"]
```

### table.giveCards()

Send all the table's cards to a Hand instance.

`table.giveCards(to)`

**Parameters**

- `to` [`Hand instance`] - the hand to send the cards to.

**Returns**

None.

**Examples**

```js
table.giveCards(hand) // now table.cards is []
```
