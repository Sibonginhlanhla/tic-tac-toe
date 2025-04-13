function player(turn, id){
    this.turn = turn;
    this.id = id;
}

function game(){
    const gameboard = {
        board: Array(9).fill(""), // or [] if you're initializing later
      
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
        if (checkWinner(gameboard.board) === null){
            if (gameboard[round] === ""){
                if (playerOne.turn === true){
                    gameboard[round] = playerOne.id;
                    playerOne.turn = false;
                    playerTwo.turn = true;
                } else {
                    gameboard[round] = playerTwo.id;
                    playerTwo.turn = false;
                    playerOne.turn = true;
                }
    
                const result = checkWinner(gameboard.board);
                if (result !== null) {
                    console.log("Result:", result);
                    
                    // Reset board
                    gameboard.board.fill("");
                    
                    // Reset player turns
                    playerOne.turn = true;
                    playerTwo.turn = false;
                }

            }
        }
    };
    
}

const play = game();

play("oneTwo");    // x
play("oneOne");    // o
play("twoTwo");    // x
play("twoOne");    // o
play("threeThree");// x
play("threeOne");  // o -> win

play("oneTwo");    // x
play("oneOne");    // o
play("twoTwo");    // x
play("threeOne");  // o
play("threeTwo");  // x -> win

play("oneOne");    // x
play("threeOne");  // o
play("oneTwo");    // x
play("threeTwo");  // o
play("twoTwo");    // x
play("threeThree");// o -> win


play("oneOne");    // x
play("oneTwo");    // o
play("twoTwo");    // x
play("threeTwo");  // o
play("threeThree");// x -> win

play("oneThree");  // x
play("oneOne");    // o
play("twoThree");  // x
play("twoTwo");    // o
play("threeOne");  // x
play("threeThree");// o -> win

play("oneOne");    // x
play("oneTwo");    // o
play("oneThree");  // x
play("twoOne");    // o
play("twoThree");  // x
play("twoTwo");    // o
play("threeTwo");  // x
play("threeOne");  // o
play("threeThree");// x -> draw

play("threeOne");  // x
play("oneOne");    // o
play("threeTwo");  // x
play("twoOne");    // o
play("threeThree");// x -> win

play("oneOne");    // x
play("oneTwo");    // o
play("threeOne");  // x
play("twoTwo");    // o
play("threeThree");// x
play("threeTwo");  // o -> win
