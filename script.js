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

const player = (name) => {
    let turns = []
    return {name, turns};
}

const p1 = player("sam");
const p2 = player("jack");




const applyKnotOrCross = (() => {
    let currentPlayer = p1

    //add knots or crosses
    document.querySelector('.grid').addEventListener('click', (event) => {
        if (currentPlayer == p1) {
            placeKnot(event);
            checkWinner(currentPlayer);
            currentPlayer = p2;
        } 
        else {
            placeCross(event);
            checkWinner(currentPlayer);
            currentPlayer = p1;
        }
    });

    function placeKnot (event){
        const image = document.createElement('img')
        image.src  = "knot.png";
        image.classList.add("knot");
        image.classList.add("p1")
        event.target.appendChild(image);
    }

    function placeCross (event){
        const image = document.createElement('img')
        image.src  = "cross.png";
        image.classList.add("cross");
        image.classList.add("p2")
        event.target.appendChild(image);
    };
 
})();

const checkWinner = (currentPlayer) => {

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

        let counter = 0;

        combo.forEach((value) => {

            let cells = Array.from(document.querySelectorAll(".square"));

            if (cells[value].classList.contains(currentPlayer)) {

                counter++;

                if (counter == 3 ){

                alert(`${currentPlayer} is the winner`);
                return;
                
                }
            }
        });
    });
}


