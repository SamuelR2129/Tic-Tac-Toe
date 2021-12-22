



//CREATING THE BOARD

const gameboard = (() => {
    
    const board = 
    [
    1, 2, 3, 
    4, 5, 6, 
    7, 8, 9
    ];

    let boardTileId = 1;

    //render board
    board.forEach(tile => {
        makeBoard(); 
        boardTileId++;  
    });


    function makeBoard (){
        const grid = document.querySelector(".grid");
        const squareDiv = document.createElement('div');
        squareDiv.classList.add("square");
        squareDiv.setAttribute("id", boardTileId);
        grid.appendChild(squareDiv);
    }
})();



//CREATES PLAYERS AND CONTROLS THE GAME WITH BUTTONS
let p1;
let p2;
let currentPlayer;

const playerControler = (() => {
    
    //start button
    document.getElementById('start-btn').addEventListener('click', () => {
        document.querySelector("#main-game-section").hidden = false;
        document.querySelector(".player-input-container").style.display = "none";

        createPlayer();

    }, true);

    //player builder
    return player = (name) => {
        let turns = []
        return {name, turns};
    }

})();

const createPlayer = () => {
    let playerNames = [];

    const getUserNames = ((playerNames) => {
        playerNames.push(document.getElementById('player-one-input').value);
        playerNames.push(document.getElementById('player-two-input').value);
        return playerNames;
    })(playerNames);

    p1 = player(playerNames[0]);
    p2 = player(playerNames[1]);

    document.getElementById("tally-p1").textContent = p1.name;
    document.getElementById("tally-p2").textContent = p2.name;


    return currentPlayer = p1 
}




const applyKnotOrCross = ((currentPlayer) => {
    let cells = Array.from(document.querySelectorAll(".square"));


    //add knots or crosses
    document.querySelector('.grid').addEventListener('click', (event) => {
        if (currentPlayer == p1) {
            placeKnot(event);
            checkWinner(currentPlayer, cells);
            checkTie(cells);
            return currentPlayer = p2;
        } 
        else {
            placeCross(event);
            checkWinner(currentPlayer, cells);
            checkTie(cells);
            return currentPlayer = p1;
        }
    });

    function placeKnot (event, target){
        const image = document.createElement('img');
        image.src  = "knot.png";
        image.classList.add("knot");
        image.classList.add("p1")
        event.target.appendChild(image);
    }

    function placeCross (event){
        const image = document.createElement('img');
        image.src  = "cross.png";
        image.classList.add("cross");
        image.classList.add("p2")
        event.target.appendChild(image);
    };

    const checkTie = (cells) => {
        let img = document.getElementsByTagName("img");
        if (img.length == 9) {
            alert("it is a tie");
            restartBoard(cells)
        }
    }

    //reset button
    document.getElementById("reset-btn").addEventListener("click", () => {
        restartBoard(cells);
    });

 
})();

let p1Score = "";
let p2Score = "";

const checkWinner = (currentPlayer, cells) => {

    const winningCombo = [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];

    winningCombo.forEach((combo) => {

        let Ocounter = 0;
        let Xcounter = 0;

        combo.forEach((value) => {
            let trueValue = value - 1;

            let img = cells[trueValue].querySelector("img");
            
            if (img && img.getAttribute("src") == "knot.png") {
                Ocounter++;
            } 
            else if (img && img.getAttribute("src") == "cross.png") {
                Xcounter++;
            }

            if (Xcounter == 3 || Ocounter == 3) {
                alert(`${currentPlayer.name} is the winner`);
                playerScore(currentPlayer, p1Score, p2Score);
                restartBoard(cells);
                Xcounter = 0;
                Ocounter = 0;
                return;
            }
        });

    });
    
}

const restartBoard = (cells) => {
    let img = document.getElementsByTagName("img");
    cells.forEach((square) => {
        if (square.contains(img[0])) {
            img[0].parentNode.removeChild(img[0]);
        }
    });
}

const playerScore = (currentPlayer, p1Score, p2Score) => {

    if (currentPlayer == p1) {
        p1Score = p1Score + 1;
        document.getElementById("p1-tally-num").textContent = p1Score;
        return p1Score;
    }
    else {
        p2Score = p2Score + 1;
        document.getElementById("p2-tally-num").textContent = p2Score;
        return p2Score;
    }
}