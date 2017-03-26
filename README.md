# cards
A javascript library for creating card games

## To do
- ~~Stop drawing randomly, draw the first element in the deck~~
- ~~Add a Card class - postponed~~ (why needed?)
- ~~Remove cards from the "game"~~
- ~~Drawing moves cards to "in play"~~
- Implement Card.move for all the various functions that move cards around
    - When discard/removing/\*ing actual move it to the discard/removed/\* pile
    - Also discard
    - Also remove
- ~~API~~
- Expand game.newDeck and Game.create() so that all constructor arguments can be passed
- deck.drawRandom() also has a drawingToHand argument like deck.draw()
- When discarding cards also remove them from deck.inPlay if they are in it.
- Add a hand.choose() or hand.chooseRandom(), where it chooses random cards from the hand.
- When a deck variable is not specified, use the game's primaryDeck (possible?)
- Make the API docs style consistent

--------------------------------------------------------------------------------

## Common spelling mistakes

I'm human. I am make a lot of spelling issues. This is a list for me to check through, and a list for you to see what I might have actually ment.

- mispelling > what I meant
- discared > discarded
