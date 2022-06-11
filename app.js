// Get all the needed DOM
let player0board = document.getElementById('player-0-panel')
let player1board = document.getElementById('player-1-panel')
let player0 = document.getElementById('player-0-name')
let player1 = document.getElementById('player-1-name')
let globalScore1 = document.getElementById('player-1-global')
let globalScore0 = document.getElementById('player-0-global')
let currentScore0 = document.querySelector('.current-0')
let currentScore1 = document.querySelector('.current-1')

const newGameBtn = document.getElementById('newGame')
const rollBtn = document.getElementById('roll')
const holdBtn = document.getElementById('hold')
const dice = document.querySelector('img')

const svg = document.querySelector('.bi-dot')


// Default game settings
let scores = [0, 0]
let currentScore = 0
let activePlayer = 0
let players = [player0, player1]


// Reset settings
function reset () {
    globalScore0.innerHTML = 0
    globalScore1.innerHTML = 0
    currentScore0.innerHTML = 0
    currentScore1.innerHTML = 0
    scores = [0, 0]
    currentScore = 0
}

reset()


// Start a new game
newGame.addEventListener('click', () => {

    // Addind the names of the players when the user click on New Game
   const player0 = prompt('Entrez le nom du premier joueur: ') 
    document.querySelector('.player-0-name').innerText = player0

   const player1 = prompt('Entrez le nom du deuxième joueur: ')
    document.querySelector('.player-1-name').innerText = player1

    //Reset settings 
    reset()
    switchPlayer()
})


// Switching players
function switchPlayer () {
    player0board.classList.toggle("active")
    player0.classList.toggle('active')
    document.getElementById('dot-0').classList.toggle('hidden')
    player1board.classList.toggle("active")
    player1.classList.toggle('active')
    document.getElementById('dot-1').classList.toggle('hidden')
    activePlayer = activePlayer === 0 ? 1 : 0
}

// Rolls dice
rollBtn.addEventListener("click", () => {
    // Add "shake" class to img for the css animation, then remove it after 1 second
    dice.setAttribute('class', 'shake')

    setTimeout(() => {
        dice.removeAttribute('class')
    }, 1000)

    // Generate an random number between 1 and 6
    const randomNumber = Math.floor(Math.random() * 6) + 1

    // Changing the dice image with the random number
    const diceImage = "images/dice-" + randomNumber + ".svg"
    setTimeout(() => {
        dice.setAttribute("src", diceImage)
    }, 1000)

    // Condition: if it's 1, you loose your current score and your turn
    if (randomNumber === 1) {
        currentScore = 0
        document.querySelector(`.current-${activePlayer}`).textContent = 0
        switchPlayer()
    } else {
        currentScore += randomNumber
        document.querySelector(`.current-${activePlayer}`).textContent = currentScore
    }
})

// Hold current sctore to global score
holdBtn.addEventListener('click', () => {
    //Get the current score and store it in global score
    scores[activePlayer] += currentScore 
    document.getElementById(`player-${activePlayer}-global`).textContent = scores[activePlayer]
    document.querySelector(`.current-${activePlayer}`).textContent = 0
    currentScore = 0


    // Conditions to win the game
    if (scores[activePlayer] >= 100) {
        const myModal = new bootstrap.Modal(document.getElementById('myModal'), {})
        const names = [player0.innerText, player1.innerText]
        document.querySelector('.modal-title').innerText = "Congratulations " + names[activePlayer] + " !"
        myModal.show()
        reset()
    } else {
        switchPlayer()
    }
})