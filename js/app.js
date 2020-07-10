'use strict'
//setting the navbar 
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
}


var flipcard = document.querySelector('.flip-card');
var innercard = document.querySelector('.flip-card-inner');
var timer = document.querySelector('.ml-5 .timer');
var pause = document.querySelector('.ml-5 .stop');
var start = document.querySelector('.ml-5 .start');

//giving index for the input
function indexingInputs(){
	var inputs = document.querySelectorAll('input');

	var rows = ['A' , 'B' , 'C' , 'D' , 'E' , 'F' , 'G' , 'H' , 'I'];
	for(var k = 0; k < inputs.length; k++){
		var column = (k)%9;
		var row = rows[(((k) - (k)%9) / 9)];
		inputs[k].setAttribute("data-index" , `${row}${column+1}`)
	}

}
indexingInputs();

var min = 0;
var sec = 0;
var miliSec = 0
var timer;

function callTimer() {
	sec++;
	if (sec === 60)  {
		sec = 0;
		min++;
	}
    if(sec < 10){sec = `0${sec}`};
	if(min > 10){
		document.querySelector('.ml-5 .timer').innerHTML = min + " : " + sec;
	}else{
		document.querySelector('.ml-5 .timer').innerHTML = '0' + min + " : " + sec;

	}
}

function starting() {
    timer = setInterval(callTimer, 1000);
}
starting();
function stoping() {
    clearInterval(timer);
}

function reset() {
    stop();
    min = 0;
    sec = 0;
    miliSec = 0;
    if(sec < 10){sec = `0${sec}`};
	document.querySelector('.ml-5 .timer').innerHTML = '0' + min + " : " + sec;
}


//adding features to pause button
pause.addEventListener('click',function(){
	//    flip the grid
    innercard.style.transform = 'rotateY(180deg)';
    //    pause the timer
	stoping();
    //    disaple this button
    this.disabled = true;
    //    able the start button
    start.disabled = false;
})


//ading features to start button
start.addEventListener('click',function(){
	starting();
	//flip the grid
    innercard.style.transform = 'rotateY(0)';
    //disable this card
	this.disabled = true;
	//enable pause button
	pause.disabled = false;

})


//creating the grid function
function createGrid(level){
	var puzzle = Object.entries(sudoku.generate(level)) ;
	return puzzle
}

function emptyGrid(){
	var inputs = document.querySelectorAll('input');
	for(var i = 0; i < inputs.length; i++){
		inputs[i].value = '';
		inputs[i].disabled = false
	}
}
//gettting the level of the game
var level = 'easy';

function getLevel(){
	var levels = document.querySelectorAll('.sidenav button');
	for(var i = 0; i < 3; i++){
		levels[i].addEventListener('click',function(){
			level = this.getAttribute('data-level');
			emptyGrid();
			fillingGrid(createGrid(level));
			reset();
			closeNav();
			if(pause.disabled){
				starting();
				//flip the grid
				innercard.style.transform = 'rotateY(0)';
				//disable this card
				start.disabled = true;
				//enable pause button
				pause.disabled = false;
			}
		})
	}
}
getLevel();

function rst(){
	var btn = document.querySelector('#rest');
	var inputs =document.querySelectorAll('input'); 
	btn.addEventListener('click',function(){
		for(var i = 0; i < inputs.length; i++){
			if(inputs[i].disabled == false){
				inputs[i].value = '';
			}
		}	
		reset();
		
		if(pause.disabled){
			starting();
			//flip the grid
			innercard.style.transform = 'rotateY(0)';
			//disable this card
			start.disabled = true;
			//enable pause button
			pause.disabled = false;
		}
		closeNav();	
	})
}
rst();	

//creating grid array
var puzzle = createGrid(level);

//filling the grid with the digits function
function fillingGrid(array){
	//calling ll the inputs
	var inputs = document.querySelectorAll('input');
	var inputArr =[]; 
	//adding the indexo of input into array
	for(var i = 0; i < inputs.length; i++){
		inputArr.push(inputs[i].getAttribute('data-index'))
	}
	
	for(var i = 0; i < puzzle.length; i++){
		inputs[inputArr.indexOf(array[i][0])].value = puzzle[i][1];
		inputs[inputArr.indexOf(array[i][0])].disabled = true;
        inputs[inputArr.indexOf(array[i][0])].style.color = 'red'
	}	
}

//filling grid with puzzle for the first time
fillingGrid(puzzle)



//giving the input some features
// limiting the input with one digit
function validateInput(){
    var inputs = document.querySelectorAll('input');
	for(var i = 0; i < inputs.length; i++){
		inputs[i].addEventListener('keyup',function(){
            if(this.value.length >= 1){
                this.value = this.value[0]   
            }
        })
	}
}

validateInput();

//highlight the related cells when cell is focused
function highlighIndicate(){
	//the whole inputs array
	var inputs = document.querySelectorAll('input');
	for(var i = 0; i < inputs.length; i++){
        inputs[i].addEventListener('focus',function(){
            var row = this.getAttribute('data-index')[0];
            var col = this.getAttribute('data-index')[1];
            for(var j = 0; j < inputs.length; j++){
				//highlighing the row
                if(inputs[j].getAttribute('data-index')[0] == row){
                    inputs[j].style.backgroundColor = '#cfe3f3'
                }
				//hilighting the col
                if(inputs[j].getAttribute('data-index')[1] == col){
                    inputs[j].style.backgroundColor = '#cfe3f3'
                }
				//highligting the square
				var selectdSquare = getSquare(row,col);
				for(var i = 0; i < selectdSquare.length; i++){
						selectdSquare[i].style.backgroundColor = '#cfe3f3'
				}		
			}
        })
        inputs[i].addEventListener('blur',function(){
            var row = this.getAttribute('data-index')[0];
            var col = this.getAttribute('data-index')[1];
            for(var j = 0; j < inputs.length; j++){
                if(inputs[j].getAttribute('data-index')[0] == row){
                    inputs[j].style.backgroundColor = ''
                }
                if(inputs[j].getAttribute('data-index')[1] == col){
                    inputs[j].style.backgroundColor = ''
                }
				var selectdSquare = getSquare(row,col);
				for(var i = 0; i < selectdSquare.length; i++){
						selectdSquare[i].style.backgroundColor = ''
				}
            }
        })
        
	}
}

//getting the square of cell
function getSquare(row,col){
	var inputs = document.querySelectorAll('input');
	//the whole squares
	var squareB2 = [inputs[0],inputs[1],inputs[2],inputs[9],inputs[10],inputs[11],inputs[18],inputs[19],inputs[20]];
	var squareB5 = [inputs[3],inputs[4],inputs[5],inputs[12],inputs[13],inputs[14],inputs[21],inputs[22],inputs[23]];
	var squareB8 = [inputs[6],inputs[7],inputs[8],inputs[15],inputs[16],inputs[17],inputs[24],inputs[25],inputs[26]];
	var squareE2 = [inputs[27],inputs[28],inputs[29],inputs[36],inputs[37],inputs[38],inputs[45],inputs[46],inputs[47]];
	var squareE5 = [inputs[30],inputs[31],inputs[32],inputs[39],inputs[40],inputs[41],inputs[48],inputs[49],inputs[50]];
	var squareE8 = [inputs[33],inputs[34],inputs[35],inputs[42],inputs[43],inputs[44],inputs[51],inputs[52],inputs[53]];
	var squareH2 = [inputs[54],inputs[55],inputs[56],inputs[63],inputs[64],inputs[65],inputs[72],inputs[73],inputs[74]];
	var squareH5 = [inputs[57],inputs[58],inputs[59],inputs[66],inputs[67],inputs[68],inputs[75],inputs[76],inputs[77]];
	var squareH8 = [inputs[60],inputs[61],inputs[62],inputs[67],inputs[68],inputs[69],inputs[78],inputs[79],inputs[70]];
	
	var selectdSquare = [];
	if(row == 'A' || row == 'B' || row == 'C'){
					row = 'B'
				}else if(row == 'D' || row == 'E' || row == 'F'){
					row = 'E'
				}else{
					row = 'I'
				}
				if(col >= 1 && col <= 3){
					col = 2 
				}else if(col >= 4 && col <= 6){
					col = 5
				}else{
					col = 8
				}
				
				var squareName = row + col;
				switch (squareName){
					case 'B2':
						selectdSquare = squareB2;
						break;
					case 'B5':
						selectdSquare = squareB5;
						break;
					case 'B8':
						selectdSquare = squareB8;
						break;
					case 'E2':
						selectdSquare = squareE2;
						break;
					case 'E5':
						selectdSquare = squareE5;
						break;
					case 'E8':
						selectdSquare = squareE8;
						break;
					case 'H2':
						selectdSquare = squareH2;
						break;
					case 'H5':
						selectdSquare = squareH5;
						break;
					case 'H8':
						selectdSquare = squareH8;
						break;
				}
	return selectdSquare;
}

highlighIndicate();
function getError(){
	var values = getValues();
	var grid = getGrid();
	var duplicate = [];
	var errordCells = [];
	for(var i = 0; i < values.length; i++){
		duplicate = getduplicate(values[i]);
		if(duplicate.length > 0){
			for(var j = 0; j < values[i].length; j++){
				if(duplicate.indexOf(values[i][j]) != -1){
					errordCells.push(grid[i][j].getAttribute('data-index'))
				}else{
					grid[i][j].style.backgroundColor = ''
					if(grid[i][j].disabled == false){
						grid[i][j].style.color = 'black'
					}else{
						grid[i][j].style.color = 'red'
					}
				}		
			}
		}
		else{
			for(var j = 0; j < values[i].length; j++){
				grid[i][j].style.backgroundColor = ''
				if(grid[i][j].disabled){
					grid[i][j].style.color = 'red'
				}else{
					grid[i][j].style.color = 'black'
				}
			}
		}
	}
	var inputs = document.querySelectorAll('input');
	for(var i = 0; i < errordCells.length; i++){
		for(var j = 0; j < inputs.length; j++){
			if(inputs[j].getAttribute('data-index') == errordCells[i]){
				inputs[j].style.backgroundColor = 'red';
				inputs[j].style.color = 'yellow'
			}
		}
	}
	
	
}
function getGrid(){
	var inputs = document.querySelectorAll('input');
	var ROWA = [];
	var	ROWB = [];
	var	ROWC = [];
	var	ROWD = [];
	var	ROWE = [];
	var	ROWF = [];
	var	ROWG = [];
	var	ROWH = [];
	var	ROWI = [];
	var	COL1 = [];
	var	COL2 = [];
	var	COL3 = [];
	var	COL4 = [];
	var	COL5 = [];
	var	COL6 = [];
	var	COL7 = [];
	var	COL8 = [];
	var	COL9 = [];
		
	for(var i = 0; i < inputs.length; i++){
		var row = inputs[i].getAttribute('data-index')[0];
		var col = inputs[i].getAttribute('data-index')[1];
		switch(row){
			case 'A':
				ROWA.push(inputs[i]);
				break;
			case 'B':
				ROWB.push(inputs[i]);
				break;
			case 'C':
				ROWC.push(inputs[i]);
				break;
			case 'D':
				ROWD.push(inputs[i]);
				break;
			case 'E':
				ROWE.push(inputs[i]);
				break;
			case 'F':
				ROWF.push(inputs[i]);
				break;
			case 'G':
				ROWG.push(inputs[i]);
				break;
			case 'H':
				ROWH.push(inputs[i]);
				break;
			default:
				ROWI.push(inputs[i]);
		}
		switch(col){
			case '1':
				COL1.push(inputs[i]);
				break;
			case '2':
				COL2.push(inputs[i]);
				break;
			case '3':
				COL3.push(inputs[i]);
				break;
			case '4':
				COL4.push(inputs[i]);
				break;
			case '5':
				COL5.push(inputs[i]);
				break;
			case '6':
				COL6.push(inputs[i]);
				break;
			case '7':
				COL7.push(inputs[i]);
				break;
			case '8':
				COL8.push(inputs[i]);
				break;
			default:
				COL9.push(inputs[i]);
		}
	}
	var squareB2 = [inputs[0],inputs[1],inputs[2],inputs[9],inputs[10],inputs[11],inputs[18],inputs[19],inputs[20]];
	var squareB5 = [inputs[3],inputs[4],inputs[5],inputs[12],inputs[13],inputs[14],inputs[21],inputs[22],inputs[23]];
	var squareB8 = [inputs[6],inputs[7],inputs[8],inputs[15],inputs[16],inputs[17],inputs[24],inputs[25],inputs[26]];
	var squareE2 = [inputs[27],inputs[28],inputs[29],inputs[36],inputs[37],inputs[38],inputs[45],inputs[46],inputs[47]];
	var squareE5 = [inputs[30],inputs[31],inputs[32],inputs[39],inputs[40],inputs[41],inputs[48],inputs[49],inputs[50]];
	var squareE8 = [inputs[33],inputs[34],inputs[35],inputs[42],inputs[43],inputs[44],inputs[51],inputs[52],inputs[53]];
	var squareH2 = [inputs[54],inputs[55],inputs[56],inputs[63],inputs[64],inputs[65],inputs[72],inputs[73],inputs[74]];
	var squareH5 = [inputs[57],inputs[58],inputs[59],inputs[66],inputs[67],inputs[68],inputs[75],inputs[76],inputs[77]];
	var squareH8 = [inputs[60],inputs[61],inputs[62],inputs[69],inputs[70],inputs[71],inputs[78],inputs[79],inputs[80]];
	
	var bigArray = [ROWA,ROWB,ROWC,ROWD,ROWE,ROWF,ROWG,ROWH,ROWI,COL1,COL2,COL3,COL4,COL5,COL6,COL7,COL8,COL9,squareB2,squareB5,squareB8,squareE2,squareE5,squareE8,squareH2,squareH5,squareH8]
	
	return bigArray;
}
function getValues(){
	var inputs = document.querySelectorAll('input');
	var ROWA = [];
	var	ROWB = [];
	var	ROWC = [];
	var	ROWD = [];
	var	ROWE = [];
	var	ROWF = [];
	var	ROWG = [];
	var	ROWH = [];
	var	ROWI = [];
	var	COL1 = [];
	var	COL2 = [];
	var	COL3 = [];
	var	COL4 = [];
	var	COL5 = [];
	var	COL6 = [];
	var	COL7 = [];
	var	COL8 = [];
	var	COL9 = [];
		
	for(var i = 0; i < inputs.length; i++){
		var row = inputs[i].getAttribute('data-index')[0];
		var col = inputs[i].getAttribute('data-index')[1];
		switch(row){
			case 'A':
				ROWA.push(inputs[i].value);
				break;
			case 'B':
				ROWB.push(inputs[i].value);
				break;
			case 'C':
				ROWC.push(inputs[i].value);
				break;
			case 'D':
				ROWD.push(inputs[i].value);
				break;
			case 'E':
				ROWE.push(inputs[i].value);
				break;
			case 'F':
				ROWF.push(inputs[i].value);
				break;
			case 'G':
				ROWG.push(inputs[i].value);
				break;
			case 'H':
				ROWH.push(inputs[i].value);
				break;
			default:
				ROWI.push(inputs[i].value);
		}
		switch(col){
			case '1':
				COL1.push(inputs[i].value);
				break;
			case '2':
				COL2.push(inputs[i].value);
				break;
			case '3':
				COL3.push(inputs[i].value);
				break;
			case '4':
				COL4.push(inputs[i].value);
				break;
			case '5':
				COL5.push(inputs[i].value);
				break;
			case '6':
				COL6.push(inputs[i].value);
				break;
			case '7':
				COL7.push(inputs[i].value);
				break;
			case '8':
				COL8.push(inputs[i].value);
				break;
			default:
				COL9.push(inputs[i].value);
		}
	}
	var squareB2 = [inputs[0].value,inputs[1].value,inputs[2].value,inputs[9].value,inputs[10].value,inputs[11].value,inputs[18].value,inputs[19].value,inputs[20].value];
	var squareB5 = [inputs[3].value,inputs[4].value,inputs[5].value,inputs[12].value,inputs[13].value,inputs[14].value,inputs[21].value,inputs[22].value,inputs[23].value];
	var squareB8 = [inputs[6].value,inputs[7].value,inputs[8].value,inputs[15].value,inputs[16].value,inputs[17].value,inputs[24].value,inputs[25].value,inputs[26].value];
	var squareE2 = [inputs[27].value,inputs[28].value,inputs[29].value,inputs[36].value,inputs[37].value,inputs[38].value,inputs[45].value,inputs[46].value,inputs[47].value];
	var squareE5 = [inputs[30].value,inputs[31].value,inputs[32].value,inputs[39].value,inputs[40].value,inputs[41].value,inputs[48].value,inputs[49].value,inputs[50].value];
	var squareE8 = [inputs[33].value,inputs[34].value,inputs[35].value,inputs[42].value,inputs[43].value,inputs[44].value,inputs[51].value,inputs[52].value,inputs[53].value];
	var squareH2 = [inputs[54].value,inputs[55].value,inputs[56].value,inputs[63].value,inputs[64].value,inputs[65].value,inputs[72].value,inputs[73].value,inputs[74].value];
	var squareH5 = [inputs[57].value,inputs[58].value,inputs[59].value,inputs[66].value,inputs[67].value,inputs[68].value,inputs[75].value,inputs[76].value,inputs[77].value];
	var squareH8 = [inputs[60].value,inputs[61].value,inputs[62].value,inputs[69].value,inputs[70].value,inputs[71].value,inputs[78].value,inputs[79].value,inputs[80].value];
	
	var bigArray = [ROWA,ROWB,ROWC,ROWD,ROWE,ROWF,ROWG,ROWH,ROWI,COL1,COL2,COL3,COL4,COL5,COL6,COL7,COL8,COL9,squareB2,squareB5,squareB8,squareE2,squareE5,squareE8,squareH2,squareH5,squareH8]
	
	return bigArray;
}
var inputs = document.querySelectorAll('input');

setInterval(getError,100)



function getduplicate(array){
	var obj = {};
    var count = 0;
    for(var i = 0; i < array.length; i++){
        for(var j = 0; j < array.length; j++){
            if(array[i] == array[j] & array[i] != ''){
                count++;
                obj[array[i]] = count
            }  
        }
        count = 0;
    }
    var arr = [];
    for(var item in obj){
		if(obj[item] > 1){
			arr.push(item)
		}
    }
    return arr
}


//celebrate when game is solve
function checkUnique(array){
    var obj = {};
    var count = 0;
    for(var i = 0; i < array.length; i++){
        for(var j = 0; j < array.length; j++){
            if(array[i] == array[j]){
                count++;
                obj[array[i]] = count
            }  
        }
        count = 0;
    }
    var bol = true;
    for(var item in obj){
      if(obj[item] != 1){
          bol = false;
          break;
      }
    }
	return bol	
}	
function checkSolved(){
	var inputs = document.querySelectorAll('input');
	for(var i = 0; i < inputs.length; i++){
		inputs[i].addEventListener('keyup',function(){
			var begin ={};
			for(var j = 0; j < inputs.length; j++){
				if(inputs[j].disabled){
					begin[inputs[j].getAttribute('data-index')] = inputs[j].value
				}
			}
			var solve = sudoku.solve(begin);
			var current = {};
			for(var j = 0; j < inputs.length; j++){
				current[inputs[j].getAttribute('data-index')] = inputs[j].value
			}
			var bol = true;
			for(var item in solve){
				if(solve[item] != current[item]){
					bol = false;
					break;
				}
			}
			if(bol == true){
				var card = document.querySelector('flip-card-back');
//				card.innerHTML = '<h1 style="color: #3199dc">congratulation</h1><img src="images/487-4876160_entertainment-fun-tictactoe-tic-tac-toe-svg-png.png">';
				//flip the grid
				innercard.style.transform = 'rotateY(180deg)';
				//pause the timer
				stoping();
				//disaple this button
				pause.disabled = true;
				//able the start button
				start.disabled = true;
			}
		})
	}
}
checkSolved();
