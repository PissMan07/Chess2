//Build Board
const greenSquares = []
const whiteSquares = []
const matrix1 = []

function r1(x1, x2, y) {
    const m1 = []
    for (let i = 0; i < 4; i++) {
        const board = document.getElementById("chessBoard");

        const newDiv1 = document.createElement("div");
        newDiv1.classList.add('square1');
        //newDiv1.innerHTML=x2[i]+y
        newDiv1.id = `${x2[i]}${y}`;
        greenSquares.push(`${x2[i]}${y}`);

        const newDiv2 = document.createElement("div");
        newDiv2.classList.add('square2');
        //newDiv2.innerHTML=x1[i]+y
        newDiv2.id = `${x1[i]}${y}`;
        whiteSquares.push(`${x1[i]}${y}`)

        board.appendChild(newDiv2);
        board.appendChild(newDiv1);
        m1.push(`${x1[i]}${y}`, `${x2[i]}${y}`);

        //Create Move Circles
        const c = document.createElement('span')
        c.classList.add('dot1')
        newDiv1.appendChild(c)
        c.id = 'dot'+newDiv1.id;

        const c1 = document.createElement('span')
        c1.classList.add('dot2')
        newDiv2.appendChild(c1)
        c1.id = 'dot'+newDiv2.id;
    }
    matrix1.push(m1);
};

function r2(x1, x2, y) {
    const m1 = [];
    for (let i = 0; i < 4; i++) {
        const board = document.getElementById("chessBoard");
        const newDiv1 = document.createElement("div");
        newDiv1.classList.add('square1');
        //newDiv1.innerHTML=x1[i]+y
        newDiv1.id = `${x1[i]}${y}`;
        greenSquares.push(`${x1[i]}${y}`);
        const newDiv2 = document.createElement("div");
        newDiv2.classList.add('square2');
        //newDiv2.innerHTML=x2[i]+y
        newDiv2.id = `${x2[i]}${y}`;
        whiteSquares.push(`${x2[i]}${y}`)
        //Connect To Board
        board.appendChild(newDiv1);
        board.appendChild(newDiv2);
        m1.push(`${x1[i]}${y}`, `${x2[i]}${y}`);
        //Create Move Circles
        const c = document.createElement('span')
        c.classList.add('dot1')
        newDiv1.appendChild(c)
        c.id = 'dot'+newDiv1.id;

        const c1 = document.createElement('span')
        c1.classList.add('dot2')
        newDiv2.appendChild(c1)
        c1.id = 'dot'+newDiv2.id;

    };
    matrix1.push(m1);
};
for (let i = 0; i < 4; i++) {
    /* to invert board
    const l1 = ['1','3','5','7']
    const l2 = ['2','4','6','8']
    */
    const l1 = ['8', '6', '4', '2'];
    const l2 = ['7', '5', '3', '1'];
    r1(['A', 'C', 'E', 'G'], ['B', 'D', 'F', 'H'], l1[i]);
    r2(['A', 'C', 'E', 'G'], ['B', 'D', 'F', 'H'], l2[i]);
};

//Place Pieces
const wKing = 'Images/KingWhite.png'
const bKing = 'Images/KingBlack.png'
const wQueen = 'Images/QueenWhite.png'
const bQueen = 'Images/QueenBlack.png'
const wBishop = 'Images/BishopWhite.png'
const bBishop = 'Images/BishopBlack.png'
const wKnight = 'Images/KnightWhite.png'
const bKnight = 'Images/KnightBlack.png'
const wRook = 'Images/RookWhite.png'
const bRook = 'Images/RookBlack.png'
const wPawn = 'Images/PawnWhite.png'
const bPawn = 'Images/PawnBlack.png'

//function to place pieces
function placePiece(image, position, id) {
    //Create Button
    const buttonPiece = document.createElement('button');
    buttonPiece.classList.add('pieceButtton');
    buttonPiece.id = id;
    document.getElementById(position).appendChild(buttonPiece);
    //Create Image
    const i1 = document.createElement('img'); 
    i1.src = image;
    buttonPiece.appendChild(i1)
    //Check if Pawwn (make smaller)
    if(image == wPawn || image == bPawn){
        i1.classList.add('piecePawn')
    } else{
        i1.classList.add('piece');
    }
    //Change background color
    if (greenSquares.indexOf(position)>=0){
        buttonPiece.style.backgroundColor = 'rgba(118,150,86,255)';
    }else{
        buttonPiece.style.backgroundColor = 'rgba(238,238,210,255)';
    }

}

//Place Black Pieces
placePiece(bKing, 'E8', 'BlackKing')
placePiece(bQueen,'D8','BlackQueen')
placePiece(bBishop,'C8','BlackBishop1')
placePiece(bKnight,'B8','BlackKnight1')
placePiece(bRook,'A8','BlackRook1')
placePiece(bRook,'H8','BlackRook2')
placePiece(bBishop,'F8','BlackBishop2')
placePiece(bKnight,'G8','BlackKnight2')

//Place White Pieces
placePiece(wKing, 'E1','WhiteKing')
placePiece(wQueen,'D1','WhiteQueen')
placePiece(wBishop,'C1','WhiteBishop1')
placePiece(wKnight,'B1','WhiteKnight1')
placePiece(wRook,'A1','WhiteRook1')
placePiece(wRook,'H1','WhiteRook2')
placePiece(wBishop,'F1','WhiteBishop2')
placePiece(wKnight,'G1','WhiteKnight2')

//Place Pawns
for(let i1 = 0; i1 < 8; i1++){
    const pawnsWhite = ['A2','B2','C2','D2','E2','F2','G2','H2']
    const pawnsBlack = ['A7','B7','C7','D7','E7','F7','G7','H7']
    placePiece(wPawn, pawnsWhite[i1], `WhitePawn${i1+1}`)
    placePiece(bPawn, pawnsBlack[i1], `BlackPawn${i1+1}`)
}

export {matrix1, greenSquares}