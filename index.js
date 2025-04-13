function player(turn, id){
    this.turn = turn;
    this.id = id;
}

const cells = document.querySelectorAll('.board h1');
const playRound = game(); // Get the closure function

// Attach one-time click listeners to each cell
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        playRound(index); // Use index to determine which cell
    });
    cell.classList.add("empty");
});

function game(){
    const gameboard = {
        board: Array(9).fill(""),
        /*
        get oneOne() { return this.board[0]; },
        set oneOne(value) { this.board[0] = value; },
      
        get oneTwo() { return this.board[1]; },
        set oneTwo(value) { this.board[1] = value; },
      
        get oneThree() { return this.board[2]; },
        set oneThree(value) { this.board[2] = value; },
      
        get twoOne() { return this.board[3]; },
        set twoOne(value) { this.board[3] = value; },
      
        get twoTwo() { return this.board[4]; },
        set twoTwo(value) { this.board[4] = value; },
      
        get twoThree() { return this.board[5]; },
        set twoThree(value) { this.board[5] = value; },
      
        get threeOne() { return this.board[6]; },
        set threeOne(value) { this.board[6] = value; },
      
        get threeTwo() { return this.board[7]; },
        set threeTwo(value) { this.board[7] = value; },
      
        get threeThree() { return this.board[8]; },
        set threeThree(value) { this.board[8] = value; }
        */
    };
      
    const playerOne = new player(true, "x");
    const playerTwo = new player(false, "o");

    function checkWinner(board){
        const winConditions = [
          [0, 1, 2], // top row
          [3, 4, 5], // middle row
          [6, 7, 8], // bottom row
          [0, 3, 6], // left column
          [1, 4, 7], // middle column
          [2, 5, 8], // right column
          [0, 4, 8], // diagonal top-left to bottom-right
          [2, 4, 6]  // diagonal top-right to bottom-left
        ];
      
        for (const [a, b, c] of winConditions) {
          if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]; // 'x' or 'o'
          }
        }
      
        if (board.every(cell => cell !== "")) {
          return "draw"; // board is full and no winner
        }
      
        return null; // game is still ongoing
    }
    
    return function(round){
        if (checkWinner(gameboard.board) === null && gameboard.board[round] === ""){
            const currentPlayer = playerOne.turn ? playerOne : playerTwo;
            gameboard.board[round] = currentPlayer.id;
            cells[round].textContent = currentPlayer.id;
            cells[round].classList.remove("empty");
            cells[round].classList.add(currentPlayer.id === "x" ? "x-color" : "o-color");
            // Switch turns
            playerOne.turn = !playerOne.turn;
            playerTwo.turn = !playerTwo.turn;

            const result = checkWinner(gameboard.board);
            if (result !== null) {
                //console.log("Result:", result);
                setTimeout(() => {
                    alert(result === "draw" ? "It's a draw!" : `${result.toUpperCase()} wins!`);
                    resetGame();
                }, 100);
            }
        }
    };

    function resetGame() {
        gameboard.board.fill("");
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("x-color", "o-color");
            cell.classList.add("empty");
        });
        playerOne.turn = true;
        playerTwo.turn = false;
    }
    
}



