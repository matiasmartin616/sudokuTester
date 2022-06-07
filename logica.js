function random(){
    var it = 0;
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            document.querySelector("#cell-"+it+"").value = randSobre();
            it++;
        }
    }
    
}

function tableroFuncional(){

    let tablero = newSolvedBoard();
    var it = 0;
    for(let elemDim1 of tablero){
        for(let elemDim2 of elemDim1){
            document.querySelector("#cell-"+it+"").value = elemDim2;
            it++;
        }
    }
    
}

//declaro sudoku
var sudoku = new Array(9);
var sudokuGuardado = false;
var nombreCelda = new Array(9);
function randSobre() {
    return parseInt(Math.random() * (9 - 1) + 1);
}

//guarda sudoku en el el array sudoku y pone las casillas en blanco.
function guardarSudoku(){
    let contador = 0;
    
    //Guardar sudoku en el array sudoku. 
    for (let fila = 0; fila < sudoku.length; fila++) {
        sudoku[fila] = new Array(9);
        nombreCelda[fila] = new Array(9);
        for (let col = 0; col < sudoku.length; col++) {
            let id = "cell-" + contador++;
            nombreCelda[fila][col] = "#" +id;
            sudoku[fila][col] = parseInt(document.getElementById(id).value);
            document.querySelector(nombreCelda[fila][col]).style.backgroundColor = "white";
        }    
    }
    return true;
}

function comprobarSudoku(){
    //guarda tablero
    sudokuGuardado = guardarSudoku();
    //comprueba fila
    var filaOk = comprobarFila();
    var colOk = comprobarCol();
    var sqrOk = comprobarCuadrado();
    
    if (filaOk && colOk && sqrOk){    
    document.getElementById('informacion').innerHTML = " El tablero esta bien ";
    }
    else{
        document.getElementById('informacion').innerHTML = " El tablero esta mal ";
    }
}

function comprobarFila(){
    let filasudoku = new Array(9);
    let filaOk = true;
    
    for (let fila = 0; fila < sudoku.length; fila++) {
        for (let col = 0; col < sudoku.length; col++) {
            //añade elementos solo si no se encuentran presentes.
            if(filasudoku.indexOf(sudoku[fila][col]) != -1){
                document.querySelector(nombreCelda[fila][col]).style.backgroundColor = "red";
            }
            else{
                //comprueba si la casilla es un numero
                if(isNaN(sudoku[fila][col]) || sudoku[fila][col] == null){
                    document.querySelector(nombreCelda[fila][col]).style.backgroundColor = "red";
                }
                else{
                    if(sudoku[fila].indexOf(sudoku[fila][col], col) != sudoku[fila].lastIndexOf(sudoku[fila][col])){
                        document.querySelector(nombreCelda[fila][col]).style.backgroundColor = "red";
                    } 
                    filasudoku.push(sudoku[fila][col]);
                }
            }
        }
        
        if(filasudoku.length <9){
            filaOk = false;
            document.getElementById('informacion').innerHTML = "    Los numeros marcados en rojo están repetidos en las filas. ";
            
        }
        filasudoku.length = 0;
    }
    return filaOk;
}

//compruebo la columna
function comprobarCol(){
    let colSudoku = new Array();
    let colSudokuName = new Array();
    let colSudokuFuera = new Array();
    var colOk = true;
    
    for (let fila = 0; fila < sudoku.length; fila++) {
        for (let col = 0; col < sudoku.length; col++) {
            //añade elementos solo si no se encuentran presentes.
            if(colSudoku.indexOf(sudoku[col][fila]) != -1){
                document.querySelector(nombreCelda[col][fila]).style.backgroundColor = "red";
                colSudokuFuera.push(sudoku[col][fila]);
            }
            else{
                //comprueba si la casilla es un numero
                if(isNaN(sudoku[col][fila]) || sudoku[col][fila] == null){
                    document.querySelector(nombreCelda[col][fila]).style.backgroundColor = "red";
                }
                else{
                    colSudoku.push(sudoku[col][fila]);    
                    colSudokuName.push(nombreCelda[col][fila]);
                }
            }
        }
        
        for (let i = 0; i < colSudoku.length; i++) {
            if (colSudokuFuera.indexOf(colSudoku[i])!= -1){
                document.querySelector(colSudokuName[i]).style.backgroundColor = "red";
            }
            
        }
        if(colSudoku.length <9){
            document.getElementById('informacion').innerHTML = "    Los numeros marcados en rojo están repetidos en las columnas. ";
            colOk = false;
        }

        colSudoku.length = 0;
        colSudokuName.length = 0;
        colSudokuFuera.length = 0;
    }
    return colOk;
}

//comprobar cuadrado
function comprobarCuadrado(){
    sqrOk = true;
    let sqrSudoku = new Array();
    let sqrSudokuFuera = new Array();
    let sqrSudokuName = new Array();
    
    for (let index = 1; index <= 3; index++) {
        for (let indexJ = 1; indexJ <= 3; indexJ++) {
            for (let fila = (index - 1) * 3; fila < (index * sudoku.length/3); fila++) {
                for (let col = ((indexJ - 1) * 3); col < (indexJ * sudoku.length / 3); col++) {

                    //añade elementos solo si no se encuentran presentes.
                    if (sqrSudoku.indexOf(sudoku[fila][col]) != -1) {
                        document.querySelector(nombreCelda[fila][col]).style.backgroundColor = "red";
                        sqrSudokuFuera.push(sudoku[fila][col]);
                        sqrOk = false;
                    }
                    else {
                        //comprueba si la casilla es un numero
                        if (isNaN(sudoku[fila][col]) || sudoku[fila][col] == null) {
                            document.querySelector(nombreCelda[fila][col]).style.backgroundColor = "red";
                        }
                        else {
                            sqrSudoku.push(sudoku[fila][col]);
                            sqrSudokuName.push(nombreCelda[fila][col]);
                        }
                    }
                }
            } 
                 
                for (let i = 0; i < sqrSudoku.length-1; i++) {
                    if (sqrSudokuFuera.indexOf(sqrSudoku[i])!= -1){
                        document.querySelector(sqrSudokuName[i]).style.backgroundColor = "red";
                    }
                }
                if(sqrSudoku.length <9){
                    document.getElementById('informacion').innerHTML = "    Los numeros marcados en rojo están repetidos en los cuadrados.";
                    sqrOk = false;
                }
        
                sqrSudoku.length = 0;
                sqrSudokuName.length = 0;
                sqrSudokuFuera.length = 0;
            } 
    }
    
    return sqrOk; 
}