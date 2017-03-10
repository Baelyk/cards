let game, deck

let startBtn = document.querySelector("#start")
let shuffleBtn = document.querySelector("#shuffle")
let shuffleinBtn = document.querySelector("#shufflein")
let drawBtn = document.querySelector("#draw")
let discardBtn = document.querySelector("#discard")
let playBtn = document.querySelector("#play")
let handDiv = document.querySelector("#hand")
let tableDiv = document.querySelector("#table")

function createStandardGame () {
    game = Game.standard()
    deck = game.primaryDeck
    hand = game.newHand()
    table = game.newTable()
    startBtn.disabled = true
    shuffleBtn.disabled = false
    drawBtn.disabled = false
}

function shuffle () {
    deck.shuffle()
}

function shuffleIn () {
    deck.shuffleIn()
    shuffleinBtn.disabled = true
    if(deck.deck.length > 0) {
        notEmptyDeck()
    }
}

function draw () {
    hand.draw(deck)
    displayHand()
    if(deck.deck.length === 0) {
        emptyDeck()
    }
    discardBtn.disabled = false
    playBtn.disabled = false
}

function discard () {
    hand.discard(deck)
    displayHand()
    if(hand.cards.length === 0) {
        emptyHand()
    }
    shuffleinBtn.disabled = false
}

function play () {
    hand.play(table)
    displayHand()
    displayTable()
    if(hand.cards.length === 0) emptyHand()
}

function displayHand () {
    let handContent = ""
    hand.cards.forEach(function(card) {
        handContent += `<span draggable="true" id="${card.num}${card.suit}" class="card">${card.name}</span>`
    })
    handDiv.innerHTML = handContent
}

function displayTable () {
    let tableContent = ""
    table.cards.forEach(function(card) {
        tableContent += `<span draggable="true" id="${card.num}${card.suit}" class="card">${card.name}</span>`
    })
    tableDiv.innerHTML = tableContent
}

function notEmptyDeck () {
    shuffleBtn.disabled = false
    drawBtn.disabled = false
}

function emptyDeck () {
    drawBtn.disabled = true
    shuffleBtn.disabled = true
}

function emptyHand () {
    discardBtn.disabled = true
    playBtn.disabled = true
}

startBtn.addEventListener("click", createStandardGame)
shuffleBtn.addEventListener("click", shuffle)
shuffleinBtn.addEventListener("click", shuffleIn)
drawBtn.addEventListener("click", draw)
discardBtn.addEventListener("click", discard)
playBtn.addEventListener("click", play)
