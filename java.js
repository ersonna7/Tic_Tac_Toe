const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector(".btn");
const board = document.querySelector("#board");
const gameOverScreen = document.querySelector(".game-over");
const endText = document.querySelector(".end-text");
const winnerText = document.querySelector(".winner");
const playAgainBtn = document.querySelector("#play-again");
const starterScreen = document.querySelector("#starting");
const startGame = document.querySelector(".play");
const showNamesBtn = document.querySelector(".show-names");
const namesScreen = document.querySelector("#names");
//Button on name screen to start game
let player1;
let player2;
startGame.addEventListener("click", () => {
    player1 = Player(document.getElementById("player1").value);
    player2 = Player(document.getElementById("player2").value);
    namesScreen.style.display = "none";
    board.style.display = "block";
})
//Event when a box is clicked to make a move
boxes.forEach(box => {
    box.addEventListener("click", () => newMove(box.id))
})
//Button to reset the board
resetBtn.addEventListener("click", () => resetBoard());
//Button on player winner screen that brings up name screen
playAgainBtn.addEventListener("click", () => {
    resetBoard();
    gameOverScreen.style.display = "none";
    namesScreen.style.display = "block";
})
//Very first button to start your first game and enter names
showNamesBtn.addEventListener("click", () => {
    starterScreen.style.display = "none";
    namesScreen.style.display = "block";
})
//Module storing 2D array of the gameboard
const Gameboard = (() => {
    //Each array is a new row
    let gameArr = 
    [[0, 0, 0], 
     [0, 0, 0], 
     [0, 0, 0]];
    const changeScore = (row, col, player) => {
        gameArr[row][col] = player;
    }
    const resetScore = ()=> {
        gameArr = 
        [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    }
    const checkWinner = () => {
        //check player 1 rows
        if (gameArr[0][0] == 1 && gameArr[0][1] == 1 && gameArr[0][2] == 1) {
            return 1;
        } else if (gameArr[1][0] == 1 && gameArr[1][1] == 1 && gameArr[1][2] == 1) {
            return 1;
        } else if (gameArr[2][0] == 1 && gameArr[2][1] == 1 && gameArr[2][2] == 1) {
            return 1;
        //check player 1 cols
        } else if (gameArr[0][0] == 1 && gameArr[1][0] == 1 && gameArr[2][0] == 1) {
            return 1;
        } else if (gameArr[0][1] == 1 && gameArr[1][1] == 1 && gameArr[2][1] == 1) {
            return 1;
        } else if (gameArr[0][2] == 1 && gameArr[1][2] == 1 && gameArr[2][2] == 1) {
            return 1;
        //check player 1 diag
        } else if (gameArr[0][0] == 1 && gameArr[1][1] == 1 && gameArr[2][2] == 1) {
            return 1;
        } else if (gameArr[0][2] == 1 && gameArr[1][1] == 1 && gameArr[2][0] == 1) {
            return 1;
        } 
        //check player 2 rows
        else if (gameArr[0][0] == 2 && gameArr[0][1] == 2 && gameArr[0][2] == 2) {
            return 2;
        } else if (gameArr[1][0] == 2 && gameArr[1][1] == 2 && gameArr[1][2] == 2) {
            return 2;
        } else if (gameArr[2][0] == 2 && gameArr[2][1] == 2 && gameArr[2][2] == 2) {
            return 2;
        //check player 2 cols
        } else if (gameArr[0][0] == 2 && gameArr[1][0] == 2 && gameArr[2][0] == 2) {
            return 2;
        } else if (gameArr[0][1] == 2 && gameArr[1][1] == 2 && gameArr[2][1] == 2) {
            return 2;
        } else if (gameArr[0][2] == 2 && gameArr[1][2] == 2 && gameArr[2][2] == 2) {
            return 2;
        //check player 2 diag
        } else if (gameArr[0][0] == 2 && gameArr[1][1] == 2 && gameArr[2][2] == 2) {
            return 2;
        } else if (gameArr[0][2] == 2 && gameArr[1][1] == 2 && gameArr[2][0] == 2) {
            return 2;
        } 
        for (let i = 0; i < gameArr.length; i++) {
            for (let j = 0; j < gameArr.length; j++) {
                if (gameArr[i][j] == 0) return;
            }
        }
        return "tie";

    }
    const displayScore = () => console.log(gameArr);
    const checkIfAval = (row, col) => {
        if (gameArr[row][col] == 0) return true;
        //return gameArr[row][col] == 0;
    }
    return {changeScore, displayScore, resetScore, checkWinner, checkIfAval}
})();
const Player = (name) => {
    return {name};
}
const resetBoard = () => {
    playerOneTurn = true;
    Gameboard.resetScore();
    boxes.forEach(box => box.textContent = "");
}
//Boolean to let know whose turn it is
let playerOneTurn = true;
const newMove = (id) => {
    let row = convertScore(id).row;
    let col = convertScore(id).col;
    let element = document.getElementById(id);
    if (!Gameboard.checkIfAval(row, col)) return;
    if (playerOneTurn == true) {
        Gameboard.changeScore(row, col, 1);
        let imgOne = document.createElement("img");
        imgOne.classList.add("fade-in-image");
        imgOne.src = "images/X.png"
        element.appendChild(imgOne);
        checkForWinner();
        playerOneTurn = false;
    } else {
        Gameboard.changeScore(row, col, 2);
        let imgTwo = document.createElement("img");
        imgTwo.src = "images/O.png";
        imgTwo.classList.add("fade-in-image");
        element.appendChild(imgTwo);
        checkForWinner();
        playerOneTurn = true;
    }
}
//Convert 1-9 into correct rows and columns
const convertScore = (pos) => {
    let row;
    let col;
    switch (pos) {
        case "1": 
            row = 0;
            col = 0;
            break;
        case "2":
            row = 0;
            col = 1;
            break;
        case "3":
            row = 0;
            col = 2;
            break;
        case "4":
            row = 1;
            col = 0;
            break;
        case "5":
            row = 1;
            col = 1;
            break;
        case "6": 
            row = 1;
            col = 2;
            break;
        case "7":
            row = 2;
            col = 0;
            break;
        case "8":
            row = 2;
            col = 1;
            break;
        case "9":
            row = 2;
            col = 2;
            break;
    }
    return {row, col};
}
const checkForWinner = () => {
    if(Gameboard.checkWinner() == 1) {
        gameOverScreen.style.display = "block";
        board.classList.add("fade");
        let fadeOut = setInterval(function() {
            board.classList.remove("fade");
            board.style.display = "none";
            gameOverScreen.style.display = "block";
            clearInterval(fadeOut);
        }, 1200);
        winnerText.textContent = `${player1.name} wins!`;
    } else if (Gameboard.checkWinner() == 2) {
        gameOverScreen.style.display = "block";
        board.classList.add("fade");
        let fadeOut = setInterval(function() {
            board.classList.remove("fade");
            board.style.display = "none";
            gameOverScreen.style.display = "block";
            clearInterval(fadeOut);
        }, 1200);
        winnerText.textContent = `${player2.name} wins!`;
    } else if (Gameboard.checkWinner() == "tie") {
        gameOverScreen.style.display = "block";
        board.style.display = "none";
        winnerText.textContent = "It's a tie!";
    }
}