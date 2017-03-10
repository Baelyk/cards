let hands = {}

let startBtn = document.querySelector("#start")
let humanHand = document.querySelector("#human-deck")
let humanCardCount = document.querySelector("#human-card-count")
let computerHand = document.querySelector("#computer-deck")
let computerCardCount = document.querySelector("#computer-card-count")
let tableCards = document.querySelector("#table #played")

function start () {
    game = Game.standard()
    deck = game.primaryDeck
    hands.human = game.newHand()
    hands.computer = game.newHand()
    table = game.newTable()

    deck.shuffle()

    hands.human.draw(deck, 26)
    hands.computer.draw(deck, 26)

    humanCardCount.textContent = hands.human.cards.length
    computerCardCount.textContent = hands.computer.cards.length
}

function showCard (card, hidden = false) {
    let color = (card.suit == "Hearts" || card.suit ==  "Diamonds") ? "red" : "black"
    let suit = (card.suit == "Diamonds") ? "&diams;" : (`&${card.suit.toLowerCase()};`)
    let back = hidden ? "back" : ""
    return `<div id="${card.number + card.suit}" class="card ${color} ${hidden}"><span class="number">${card.number}</span><span class="suit">${suit}</span></div>`
    /* <div id="${card.number + card.suit}" class="card ${color}">
        <span class="number">${card.number}</span>
        <span class="suit">&${card.suit.toLowerCase()};</span>
    </div> */
}

function showCards (to, cards, hidden = false) {
    let display = ""
    if(Array.isArray(cards)) {
        cards.forEach(function (card) {
            display += showCard(card, hidden)
        })
    } else if(cards === undefined) {
        display = "No cards here!"
    } else {
        display = showCard(cards, hidden)
    }
    to.innerHTML = display
}

function playCard () {
    let hcn, ccn
    let humanCard = hands.human.play(table)[0]
    let computerCard = hands.computer.play(table)[0]

    showCards(tableCards, table.cards)

    if(humanCard.number == "J") {
        hcn = 11
    } else if(humanCard.number == "Q") {
        hcn = 12
    } else if(humanCard.number == "K") {
        hcn = 13
    } else if(humanCard.number == "A") {
        hcn = 14
    } else {
        hcn = humanCard.number
    }
    if(computerCard.number == "J") {
        ccn = 11
    } else if(computerCard.number == "Q") {
        ccn = 12
    } else if(computerCard.number == "K") {
        ccn = 13
    } else if(computerCard.number == "A") {
        ccn = 14
    } else {
        ccn = computerCard.number
    }

    // let wins = hcn > ccn  // human wins if true; computer, false

    console.log(humanCard.number)
    console.log(computerCard.number)
    console.log(hcn)
    console.log(ccn)

    if(hcn == ccn) {
        tie()
    } else if(hcn > ccn) {
        console.log("Human wins!")
        table.giveCards(hands.human)
    } else {
        console.log("Computer wins!")
        table.giveCards(hands.computer)
    }

    checkIfWin()

    humanCardCount.textContent = hands.human.cards.length
    computerCardCount.textContent = hands.computer.cards.length
}

function tie () {
    let hcn, ccn
    hands.human.play(table)
    hands.human.play(table)
    hands.human.play(table)
    hands.computer.play(table)
    hands.computer.play(table)
    hands.computer.play(table)

    let humanCard = hands.human.play(table)[0]
    let computerCard = hands.computer.play(table)[0]
    showCards(tableCards, table.cards)

    if(humanCard.number == "J") {
        hcn = 11
    } else if(humanCard.number == "Q") {
        hcn = 12
    } else if(humanCard.number == "K") {
        hcn = 13
    } else if(humanCard.number == "A") {
        hcn = 14
    } else {
        hcn = humanCard.number
    }
    if(computerCard.number == "J") {
        ccn = 11
    } else if(computerCard.number == "Q") {
        ccn = 12
    } else if(computerCard.number == "K") {
        ccn = 13
    } else if(computerCard.number == "A") {
        ccn = 14
    } else {
        hcn = humanCard.number
    }

    // let wins = hcn > ccn // human wins if true; computer, false

    console.log(humanCard.number)
    console.log(computerCard.number)
    console.log(hcn)
    console.log(ccn)

    if(hcn == ccn) {
        tie()
    } else if(hcn > ccn) {
        console.log("Human wins!")
        table.giveCards(hands.human)
    } else {
        console.log("Computer wins!")
        table.giveCards(hands.computer)
    }

    checkIfWin()
}

function checkIfWin () {
    if(hands.human.cards.length === 0) {
        alert("You lost!")
        game = game.over(game)
    } else if(hands.computer.cards.length === 0) {
        alert("You win!")
        game = game.over(game)
    }
}

start()
humanHand.addEventListener("click", playCard)
