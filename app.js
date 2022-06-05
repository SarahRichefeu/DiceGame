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


function reset () {
    globalScore0.innerHTML = 0
    globalScore1.innerHTML = 0
    currentScore0.innerHTML = 0
    currentScore1.innerHTML = 0
}

reset()


let currentScore = 0
let playing = true
let activePlayer = 0

newGame.addEventListener('click', () => {

    // Addind the names of the players when the user click on New Game
   let player0 = prompt('Entrez le nom du premier joueur: ') 
    document.querySelector('.player-0-name').innerText = player0

   let player1 = prompt('Entrez le nom du deuxième joueur: ')
    document.querySelector('.player-1-name').innerText = player1

    //Reset settings 
    reset()
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

    // Condition: if it's 1, you loose
    if (randomNumber === 1) {
        currentScore = 0
        document.querySelector(`.current-${activePlayer}`).textContent = 0
        switchPlayer()
    } else {
        currentScore += randomNumber
        document.querySelector(`.current-${activePlayer}`).textContent = currentScore
    }
})









// Dot 
/*<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-dot" viewbox="0 0 16 16">
                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                </svg>
*/
