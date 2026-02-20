const cells = document.querySelectorAll(".cell");
const gameContainer = document.querySelector(".game-container");
const resultContainer = document.getElementById("resultContainer");
const resultText = document.getElementById("resultText");

let currentPlayer = "X";
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

function handleClick(e) {
    const index = e.target.dataset.index;

    if (boardState[index] !== "" || !gameActive) return;

    boardState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    checkWinner();

    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;

        if (boardState[a] &&
            boardState[a] === boardState[b] &&
            boardState[a] === boardState[c]) {

            gameActive = false;
            showResult(`Player ${boardState[a]} Wins!`);
            return;
        }
    }

    if (!boardState.includes("")) {
        gameActive = false;
        showResult("It's a Draw!");
    }
}

function showResult(message) {
    gameContainer.style.display = "none";
    resultContainer.style.display = "block";
    resultText.textContent = message;
}

function newGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;

    cells.forEach(cell => cell.textContent = "");

    resultContainer.style.display = "none";
    gameContainer.style.display = "block";
}
