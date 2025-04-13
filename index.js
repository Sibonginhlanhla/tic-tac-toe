function player(name, id) {
    this.name = name;
    this.id = id;
    this.turn = false;
}

const cells = document.querySelectorAll('.board h1');
const startBtn = document.getElementById('startBtn');
const resultDisplay = document.getElementById('resultDisplay');

let playRound;

startBtn.addEventListener("click", () => {
    const nameX = document.querySelector("#playerX").value || "Player X";
    const nameO = document.querySelector("#playerO").value || "Player O";

    startBtn.innerText = "In Progress"
    playRound = game(nameX, nameO);

    // Clear board and add listeners
    cells.forEach((cell, index) => {
        cell.textContent = "";
        cell.className = "empty"; // reset class
        cell.addEventListener("click", () => {
            playRound(index);
        }, { once: true }); // only clickable once
    });

    resultDisplay.textContent = ""; 
});

function game(nameX, nameO) {
    const gameboard = {
        board: Array(9).fill(""),
    };

    const playerOne = new player(nameX, "x");
    const playerTwo = new player(nameO, "o");
    playerOne.turn = true;

    function checkWinner(board) {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const [a, b, c] of winConditions) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a]; // 'x' or 'o'
            }
        }

        if (board.every(cell => cell !== "")) return "draw";

        return null;
    }

    return function (round) {
        if (gameboard.board[round] === "" && checkWinner(gameboard.board) === null) {
            const currentPlayer = playerOne.turn ? playerOne : playerTwo;
            gameboard.board[round] = currentPlayer.id;
            cells[round].textContent = currentPlayer.id.toUpperCase();
            cells[round].classList.remove("empty");
            cells[round].classList.add(currentPlayer.id === "x" ? "x-color" : "o-color");

            // Switch turns
            playerOne.turn = !playerOne.turn;
            playerTwo.turn = !playerTwo.turn;

            const result = checkWinner(gameboard.board);
            if (result) {
                setTimeout(() => {
                    resultDisplay.textContent =
                        result === "draw"
                            ? "It's a draw!"
                            : `${result === "x" ? playerOne.name : playerTwo.name} wins!`;
                }, 100);
            }
        }
    };
}

const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", () => {
    // Clear board UI and data
    cells.forEach(cell => {
        cell.textContent = "";
        cell.className = "empty";
        const newCell = cell.cloneNode(true); // Remove previous event listeners
        cell.replaceWith(newCell);
    });
    startBtn.innerText = "Start Game"
    resultDisplay.textContent = "";

    document.querySelector("#playerX").value = "";
    document.querySelector("#playerO").value = "";
});
