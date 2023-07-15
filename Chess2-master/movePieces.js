import {matrix1, color} from './buildBoard.js';
const nPos = []
const opps = []
let clickedPiece = null
const green = 'rgba(238,238,210,255)'
const white = `rgba(118,150,86,255)`
const regColor = new RegExp(color)

//pieces
const piecer = document.getElementsByClassName('pieceButtton')
const pieces = [...piecer]
const h = /Knight/
const p = /Pawn/
const k = /King/
const q =/Queen/
const b = /Bishop/
const r = /Rook/

//function
function changeOpacity(x){
    for (let i = 0;i<nPos.length;i++){
        const c = document.getElementById('dot'+nPos[i])
        c.style.opacity = x
    }
}

function promote(){
    console.log('premote')
}


function move(pos){
    if (clickedPiece !== null){ //check if there was a clicked piece
        const piece = document.getElementById(clickedPiece);
        const position = document.getElementById(pos);
        if (nPos.indexOf(position.id) >= 0){ //check if the clicked square is a valid pos
            if (position.childElementCount > 1){ //if obstruction remove it
                position.children[1].remove()
            }
            if (position.classList[0][position.classList[0].length-1]=='2'){ //if class is square 2 in css
                position.appendChild(piece)
                piece.style.backgroundColor = green
                changeOpacity('0')
                if (p.test(clickedPiece)){ //test for pawn
                    if (color == 'White'){
                         if (position.id[1]=='8'){
                             promote()
                         }
                    }
                 }
                clickedPiece = null
                nPos.length = 0
            } else { //checks if it is square 1
                position.appendChild(piece)
                piece.style.backgroundColor = white
                changeOpacity('0')
                if (p.test(clickedPiece)){ //test for pawn
                    if (color == 'White'){
                         if (position.id[1]=='8'){
                             promote()
                         }
                    }
                 }
                clickedPiece = null
                nPos.length = 0
            }
        }
    }
}

function knight(x){
    if (clickedPiece !== x.id){
        //Variables
        const pos = x.parentNode.id;
        const yPos = (pos[1]-1)
        const xPos = pos.charCodeAt(0)-65
        clickedPiece = x.id
        changeOpacity('0')
        nPos.length = 0
        //Functions
        function right(sign, x){
            if (x){
                if (matrix1[yPos][xPos+2]){ //check right 2
                    nPos.push(matrix1[yPos+2*(sign)][xPos+1],matrix1[yPos+1*(sign)][xPos+2]); //add 2 pos
                } else if (matrix1[yPos][xPos+1]){ //else check right 1
                    nPos.push(matrix1[yPos+2*(sign)][xPos+1]); //add 1 pos
                };
            } else{
                if (matrix1[yPos][xPos+2]){ //check right 2
                    nPos.push(matrix1[yPos+1*(sign)][xPos+2]); //add 2 pos
                };
            }
        }
        function left(sign, x){
            if (x){
                if (matrix1[yPos][xPos-2]){ //check left 2
                    nPos.push(matrix1[yPos+2*(sign)][xPos-1],matrix1[yPos+1*(sign)][xPos-2]); //add 2 pos
                } else if (matrix1[yPos][xPos-1]){ //else check right 1
                    nPos.push(matrix1[yPos+2*(sign)][xPos-1]); //add 1 pos
                };
            } else{
                if (matrix1[yPos][xPos-2]){ //check left 2
                    nPos.push(matrix1[yPos+1*(sign)][xPos-2]); //add 2 pos
                };
            }
        }
        
        //Actions
        //Avaliable Spaces
        if (matrix1[yPos+2]){ //check up 2
            right(1, true)
            left(1, true)
        } else if (matrix1[yPos+1]){ //check up 1
            right(1, false)
            left(1, false)
        };
        if (matrix1[yPos-2]){ //check down 2
            right(-1, true)
            left(-1, true)
        } else if (matrix1[yPos-1]){ //check down 1
            right(-1, false)
            left(-1, false)
        };

        //Check if Obstrction
        const d = []
        for (let i = 0;i<nPos.length;i++){
            const x = document.getElementById(nPos[i])
            if (x.childElementCount > 1){
                if (clickedPiece[0] == x.children[1].id[0]){ //check color
                    d.push(nPos[i])
                }
            }
        }
        for (let i =0;i<d.length;i++){
            nPos.splice(nPos.indexOf(d[i]),1)
        }
        changeOpacity('.3')
    } else {
        clickedPiece = null
        changeOpacity('0')
        nPos.length = 0
    }
}

function pawn(x, start, end, sign){
    if (clickedPiece !== x.id){
        //Variables
        const pos = x.parentNode.id;
        const yPos = (pos[1]-1)
        const xPos = pos.charCodeAt(0)-65
        clickedPiece = x.id
        changeOpacity('0')
        nPos.length = 0

        //walk straight
        if (yPos == start){
            if (matrix1[yPos+(2*sign)]){ 
                nPos.push(matrix1[yPos+(1*sign)][xPos],matrix1[yPos+(2*sign)][xPos])
            }
        } else {
            if (matrix1[yPos+(1*sign)]){
                nPos.push(matrix1[yPos+(1*sign)][xPos])
            }
        }
        // attack
        if (matrix1[yPos+(1*sign)][xPos+1]){
            nPos.push(matrix1[yPos+(1*sign)][xPos+1])
        }
        if (matrix1[yPos+(1*sign)][xPos-1]){
            nPos.push(matrix1[yPos+(1*sign)][xPos-1])
        }

        //Check for obstructions/Opps
        const d = []
        for (let i = 0;i<nPos.length;i++){
            const x = document.getElementById(nPos[i])
            //Opps
            if (x.id == matrix1[yPos+(1*sign)][xPos-1]){ //check left
                if (x.childElementCount > 1){ //check if enemy
                    if (clickedPiece[0] == x.children[1].id[0]){
                        d.push(nPos[i])
                    }
                } else {
                    d.push(nPos[i])
                }
            }
            if (x.id == matrix1[yPos+(1*sign)][xPos+1]){ //check right
                if (x.childElementCount > 1){ //check if enemy
                    if (clickedPiece[0] == x.children[1].id[0]){
                        d.push(nPos[i])
                    }
                } else {
                    d.push(nPos[i])
                }
            }
            //Blockades
            if (x.id == matrix1[yPos+(1*sign)][xPos]){ //check up 1
                if (x.childElementCount > 1){
                    d.push(nPos[i])
                }
            }
            if (x.id == matrix1[yPos+(2*sign)][xPos]){ //check up 2
                if (x.childElementCount > 1){
                    d.push(nPos[i])
                }
            }
            if (yPos == start){
                if (x.id == matrix1[yPos+(1*sign)][xPos]){ //check up2
                    if (x.childElementCount > 1){
                        d.push(nPos[i])
                    }
                }
            }
        }
        for (let i =0;i<d.length;i++){
            nPos.splice(nPos.indexOf(d[i]),1)
        }
        changeOpacity('.3')
    } else { //clicked again
        clickedPiece = null
        changeOpacity('0')
        nPos.length = 0
    }
}

function bishop(x){
    if (clickedPiece !== x.id){
        //Variables
        const pos = x.parentNode.id;
        const yPos = (pos[1]-1)
        const xPos = pos.charCodeAt(0)-65
        clickedPiece = x.id
        changeOpacity('0')
        nPos.length = 0
        const rU = []
        const rD = []
        const lU = []
        const lD = []
        //Right
        for (let i = 1;i<(Math.abs(xPos-8));i++){
            if (matrix1[yPos+i]){//Up
                rU.push(matrix1[yPos+i][xPos+i])
            }
            if (matrix1[yPos-i]){ //Down
                rD.push(matrix1[yPos-i][xPos+i])
            }
        }
        //Left
        for (let i = 1;i<xPos+1;i++){
            if (matrix1[yPos+i]){ //Up
                lU.push(matrix1[yPos+i][xPos-i])
            }
            if (matrix1[yPos-i]){ //Down
                lD.push(matrix1[yPos-i][xPos-i])
            }
        }

        //Check for obstructions
        function a(h){
            for (let i = 0;i<h.length;i++){
                const position = document.getElementById(h[i])
                if (position.childElementCount > 1){ //check for obstruction
                    if (clickedPiece[0] !== position.children[1].id[0]){
                        console.log(h[i])
                        nPos.push(h[i])
                        i = h.length
                        return
                    } else {
                        i = h.length
                        return
                    }
                } else {
                    nPos.push(h[i])
                }
            }
        }

        a(rU)
        a(lU)
        a(rD)
        a(lD)
        changeOpacity('.3')
    } else { //clicked again
        clickedPiece = null
        changeOpacity('0')
        nPos.length = 0
    }
}

function rook(x){
    if (clickedPiece !== x.id){
        //Variables
        const pos = x.parentNode.id;
        const yPos = (pos[1]-1)
        const xPos = pos.charCodeAt(0)-65
        clickedPiece = x.id
        changeOpacity('0')
        nPos.length = 0
        const u = []
        const d = []
        const l = []
        const r = []
        //Right
        for (let i = 1;i<(Math.abs(xPos-8));i++){
            if (matrix1[yPos][xPos+i]){//Up
                r.push(matrix1[yPos][xPos+i])
            }
        }
        //Up
        for (let i = 1;i<(Math.abs(yPos-8));i++){
            if (matrix1[yPos+i]){//Up
                u.push(matrix1[yPos+i][xPos])
            }
        }
        //Left
        for (let i = 1;i<xPos+1;i++){
            if (matrix1[yPos][xPos-i]){
                l.push(matrix1[yPos][xPos-i])
            }
        }
        //down
        for (let i = 1;i<yPos+1;i++){
            if (matrix1[yPos-i]){
                d.push(matrix1[yPos-i][xPos])
            }
        }

        //Check for obstructions
        function a(h){
            for (let i = 0;i<h.length;i++){
                const position = document.getElementById(h[i])
                if (position.childElementCount > 1){ //check for obstruction
                    if (clickedPiece[0] !== position.children[1].id[0]){
                        nPos.push(h[i])
                        i = h.length
                        return
                    } else {
                        i = h.length
                        return
                    }
                } else {
                    nPos.push(h[i])
                }
            }
        }

        a(r)
        a(u)
        a(l)
        a(d)
        changeOpacity('.3')
    } else { //clicked again
        clickedPiece = null
        changeOpacity('0')
        nPos.length = 0
    }
}

function queen(x){
    if (clickedPiece !== x.id){
        //Variables
        const pos = x.parentNode.id;
        const yPos = (pos[1]-1)
        const xPos = pos.charCodeAt(0)-65
        clickedPiece = x.id
        changeOpacity('0')
        nPos.length = 0
        const u = []
        const d = []
        const l = []
        const r = []
        const rU = []
        const rD = []
        const lU = []
        const lD = []
        //Right
        for (let i = 1;i<(Math.abs(xPos-8));i++){
            if (matrix1[yPos][xPos+i]){//Up
                r.push(matrix1[yPos][xPos+i])
            }
            if (matrix1[yPos+i]){//Up
                rU.push(matrix1[yPos+i][xPos+i])
            }
            if (matrix1[yPos-i]){ //Down
                rD.push(matrix1[yPos-i][xPos+i])
            }
        }
        //Up
        for (let i = 1;i<(Math.abs(yPos-8));i++){
            if (matrix1[yPos+i]){//Up
                u.push(matrix1[yPos+i][xPos])
            }
        }
        //Left
        for (let i = 1;i<xPos+1;i++){
            if (matrix1[yPos][xPos-i]){
                l.push(matrix1[yPos][xPos-i])
            }
            if (matrix1[yPos+i]){ //Up
                lU.push(matrix1[yPos+i][xPos-i])
            }
            if (matrix1[yPos-i]){ //Down
                lD.push(matrix1[yPos-i][xPos-i])
            }
        }
        //down
        for (let i = 1;i<yPos+1;i++){
            if (matrix1[yPos-i]){
                d.push(matrix1[yPos-i][xPos])
            }
        }

        //Check for obstructions
        function a(h){
            for (let i = 0;i<h.length;i++){
                const position = document.getElementById(h[i])
                if (position.childElementCount > 1){ //check for obstruction
                    if (clickedPiece[0] !== position.children[1].id[0]){ //check color 
                        console.log(clickedPiece[0])
                        console.log(position.children[1].id[0])
                        nPos.push(h[i])
                        i = h.length
                        return
                    } else {
                        i = h.length
                        return
                    }
                } else {
                    nPos.push(h[i])
                }
            }
        }

        a(r)
        a(u)
        a(l)
        a(d)
        a(rU)
        a(lU)
        a(rD)
        a(lD)
        console.log(nPos)
        changeOpacity('.3')
    } else { //clicked again
        clickedPiece = null
        changeOpacity('0')
        nPos.length = 0
    }
}

function king(x){
    const unsafeSquares = []
    function uKnighst(x){
        const pos = x.parentNode.id;
        const yPos = (pos[1]-1)
        const xPos = pos.charCodeAt(0)-65
        const nPos = []
        //Functions
        function right(sign, x){
            if (x){
                if (matrix1[yPos][xPos+2]){ //check right 2
                    nPos.push(matrix1[yPos+2*(sign)][xPos+1],matrix1[yPos+1*(sign)][xPos+2]); //add 2 pos
                } else if (matrix1[yPos][xPos+1]){ //else check right 1
                    nPos.push(matrix1[yPos+2*(sign)][xPos+1]); //add 1 pos
                };
            } else{
                if (matrix1[yPos][xPos+2]){ //check right 2
                    nPos.push(matrix1[yPos+1*(sign)][xPos+2]); //add 2 pos
                };
            }
        }
        function left(sign, x){
            if (x){
                if (matrix1[yPos][xPos-2]){ //check left 2
                    nPos.push(matrix1[yPos+2*(sign)][xPos-1],matrix1[yPos+1*(sign)][xPos-2]); //add 2 pos
                } else if (matrix1[yPos][xPos-1]){ //else check right 1
                    nPos.push(matrix1[yPos+2*(sign)][xPos-1]); //add 1 pos
                };
            } else{
                if (matrix1[yPos][xPos-2]){ //check left 2
                    nPos.push(matrix1[yPos+1*(sign)][xPos-2]); //add 2 pos
                };
            }
        }
        
        //Actions
        //Avaliable Spaces
        if (matrix1[yPos+2]){ //check up 2
            right(1, true)
            left(1, true)
        } else if (matrix1[yPos+1]){ //check up 1
            right(1, false)
            left(1, false)
        };
        if (matrix1[yPos-2]){ //check down 2
            right(-1, true)
            left(-1, true)
        } else if (matrix1[yPos-1]){ //check down 1
            right(-1, false)
            left(-1, false)
        };
        unsafeSquares.push(...nPos)
    }
    function uQueen(x){
        const pos = x.parentNode.id;
        const yPos = (pos[1]-1)
        const xPos = pos.charCodeAt(0)-65
        const nPos = []
        const u = []
        const d = []
        const l = []
        const r = []
        const rU = []
        const rD = []
        const lU = []
        const lD = []
        //Right
        for (let i = 1;i<(Math.abs(xPos-8));i++){
            if (matrix1[yPos][xPos+i]){//Up
                r.push(matrix1[yPos][xPos+i])
            }
            if (matrix1[yPos+i]){//Up
                rU.push(matrix1[yPos+i][xPos+i])
            }
            if (matrix1[yPos-i]){ //Down
                rD.push(matrix1[yPos-i][xPos+i])
            }
        }
        //Up
        for (let i = 1;i<(Math.abs(yPos-8));i++){
            if (matrix1[yPos+i]){//Up
                u.push(matrix1[yPos+i][xPos])
            }
        }
        //Left
        for (let i = 1;i<xPos+1;i++){
            if (matrix1[yPos][xPos-i]){
                l.push(matrix1[yPos][xPos-i])
            }
            if (matrix1[yPos+i]){ //Up
                lU.push(matrix1[yPos+i][xPos-i])
            }
            if (matrix1[yPos-i]){ //Down
                lD.push(matrix1[yPos-i][xPos-i])
            }
        }
        //down
        for (let i = 1;i<yPos+1;i++){
            if (matrix1[yPos-i]){
                d.push(matrix1[yPos-i][xPos])
            }
        }
        function a(h){
            for (let i = 0;i<h.length;i++){
                const position = document.getElementById(h[i])
                if (position.childElementCount > 1){ //check for obstruction
                    if (clickedPiece[0] !== position.children[1].id[0]){
                        nPos.push(h[i])
                        i = h.length
                        return
                    } else {
                        i = h.length
                    }
                } else {
                    nPos.push(h[i])
                }
            }
        }

        a(r)
        a(u)
        a(l)
        a(d)
        a(rU)
        a(lU)
        a(rD)
        a(lD)
    }
    function uBishop(x){
        const pos = x.parentNode.id;
        const yPos = (pos[1]-1)
        const xPos = pos.charCodeAt(0)-65
        const nPos = []
        const rU = []
        const rD = []
        const lU = []
        const lD = []
        //Right
        for (let i = 1;i<(Math.abs(xPos-8));i++){
            if (matrix1[yPos+i]){//Up
                rU.push(matrix1[yPos+i][xPos+i])
            }
            if (matrix1[yPos-i]){ //Down
                rD.push(matrix1[yPos-i][xPos+i])
            }
        }
        //Left
        for (let i = 1;i<xPos+1;i++){
            if (matrix1[yPos+i]){ //Up
                lU.push(matrix1[yPos+i][xPos-i])
            }
            if (matrix1[yPos-i]){ //Down
                lD.push(matrix1[yPos-i][xPos-i])
            }
        }

        //Check for obstructions
        function a(h){
            for (let i = 0;i<h.length;i++){
                const position = document.getElementById(h[i])
                if (position.childElementCount > 1){ //check for obstruction
                    if (clickedPiece[0] !== position.children[1].id[0]){
                        nPos.push(h[i])
                        i = h.length
                        return
                    } else {
                        nPos.push(h[i])
                        i = h.length
                        return
                    }
                } else {
                    nPos.push(h[i])
                }
            }
        }

        a(rU)
        a(lU)
        a(rD)
        a(lD)
        unsafeSquares.push(...nPos)
    }
    function uRoot(x){
        const pos = x.parentNode.id;
        const yPos = (pos[1]-1)
        const xPos = pos.charCodeAt(0)-65
        const nPos = []
        const u = []
        const d = []
        const l = []
        const r = []
        //Right
        for (let i = 1;i<(Math.abs(xPos-8));i++){
            if (matrix1[yPos][xPos+i]){//Up
                r.push(matrix1[yPos][xPos+i])
            }
        }
        //Up
        for (let i = 1;i<(Math.abs(yPos-8));i++){
            if (matrix1[yPos+i]){//Up
                u.push(matrix1[yPos+i][xPos])
            }
        }
        //Left
        for (let i = 1;i<xPos+1;i++){
            if (matrix1[yPos][xPos-i]){
                l.push(matrix1[yPos][xPos-i])
            }
        }
        //down
        for (let i = 1;i<yPos+1;i++){
            if (matrix1[yPos-i]){
                d.push(matrix1[yPos-i][xPos])
            }
        }

        //Check for obstructions
        function a(h){
            for (let i = 0;i<h.length;i++){
                const position = document.getElementById(h[i])
                if (position.childElementCount > 1){ //check for obstruction
                    if (clickedPiece[0] !== position.children[1].id[0]){
                        nPos.push(h[i])
                        i = h.length
                        return
                    } else {
                        nPos.push(h[i])
                        i = h.length
                        return
                    }
                } else {
                    nPos.push(h[i])
                }
            }
        }

        a(r)
        a(u)
        a(l)
        a(d)
        unsafeSquares.push(...nPos)
    }
    function uPawn(x){
        const pos = x.parentNode.id;
        const yPos = (pos[1]-1)
        const xPos = pos.charCodeAt(0)-65
        const nPos = []
        if (matrix1[yPos+(1*sign)][xPos+1]){
            nPos.push(matrix1[yPos+(1*sign)][xPos+1])
        }
        if (matrix1[yPos+(1*sign)][xPos-1]){
            nPos.push(matrix1[yPos+(1*sign)][xPos-1])
        }
        unsafeSquares.push(...nPos)
    }
    
    for (let x in opps){
    }
}
//Actions
//Squares
for (let i = 0;i<matrix1.length;i++){
    for (let x = 0;x<matrix1[i].length;x++){
        const pos = document.getElementById(matrix1[i][x])
        pos.addEventListener('click',function(){move(matrix1[i][x])});
    };
};


for (let i = 0;i<pieces.length;i++){
    //get opps
    if (regColor.test(pieces[i].id)==null){
        opps.push(pieces[i].id)
    }
    //Knight
    if (h.test(pieces[i].id)){
        if (regColor.test(pieces[i].id)){
            pieces[i].addEventListener('click',function(){knight(pieces[i])});
        };
    };
    //Pawn
    if (p.test(pieces[i].id)){
        if (regColor.test(pieces[i].id)){
            if (color == 'White'){
                pieces[i].addEventListener('click',function(){pawn(pieces[i],1,6,1)});
            } else {
                pieces[i].addEventListener('click',function(){pawn(pieces[i],6,1,-1)});
            }
        };
    };
    //Bishop
    if (b.test(pieces[i].id)){
        if (regColor.test(pieces[i].id)){
            pieces[i].addEventListener('click',function(){bishop(pieces[i])});
        };
    };
    //Rook
    if (r.test(pieces[i].id)){
        if (regColor.test(pieces[i].id)){
            pieces[i].addEventListener('click',function(){rook(pieces[i])});
        };
    }
    //Queen
    if (q.test(pieces[i].id)){
        if (regColor.test(pieces[i].id)){
            pieces[i].addEventListener('click',function(){queen(pieces[i])});
        };
    }
}
