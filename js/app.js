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
var pause = document.querySelector('.ml-5 .pause');
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

//setting the timer in the front card
var d = new Date();
var n = d.getTime();
function updateTimer(){
    var currenttime = new Date().getTime() - n ;
    var minute = 0;
    var sec = 0;
    if(currenttime > 60000){
        sec = Math.floor((currenttime % 60000)/1000);
        minute = Math.floor((currenttime - sec) / 60000) 
    }else{
        sec = Math.floor(currenttime/1000);
    }
    if(minute < 10){minute = `0${minute}`};
    if(sec < 10){sec = `0${sec}`};
    timer.innerHTML = `${minute} : ${sec}`
}
    
//var myvar = setInterval(updateTimer , 1000);


//setting the pause button

pause.addEventListener('click',function(){
//    //    flip the grid
//    innercard.style.transform = 'rotateY(180deg)';
//    //    pause the timer
//    clearInterval(myvar);
//    //    disaple this button
//    this.disabled = true;
//    //    able the start button
//    start.disabled = false;
	var solvedPuzzle = sudoku.solve(puzzle);
			console.log(solvedPuzzle);
})

//setting the start button
function startTimer(){
	//    get the time from the timer
    var spenttime = timer.innerHTML;
    var minute = parseInt(spenttime[0] + spenttime[1]);
    var sec = parseInt(spenttime[5] + spenttime[6]);
    var currenttime = (minute + sec) * 1000; 
    currenttime += 1000;
		if(currenttime > 60000){
			sec = Math.floor((currenttime % 60000)/1000);
			minute = Math.floor((currenttime - sec) / 60000) 
		}else{
			sec = Math.floor(currenttime/1000);
		}
		if(minute < 10){minute = `0${minute}`};
		if(sec < 10){sec = `0${sec}`};
		timer.innerHTML = `${minute} : ${sec}`
}
start.addEventListener('click',function(){
    
    setInterval(startTimer,1000)
	//flip the grid
    innercard.style.transform = 'rotateY(0)';
    //disable this card
	this.disabled = true;
	//enable pause button
//    pause.disabled = false;
})

//creating the grid function
function createGrid(level){
	var puzzle = Object.entries(sudoku.generate(level)) ;
	return puzzle
}

//creating grid array
var puzzle = createGrid("easy");

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

//getting the the square
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
	if(row == 'A' || row == 'B' || row == 'c'){
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

//highlit error cell in square or row or column
function highlightErrow(){
	//the whole inputs array
	var inputs = document.querySelectorAll('input');
	for(var i = 0; i < inputs.length; i++){
        inputs[i].addEventListener('keyup',function(){
//			var estimate = parseInt(this.value); 
//            var row = this.getAttribute('data-index')[0];
//			var col = this.getAttribute('data-index')[1];
//            for(var j = 0; j < inputs.length; j++){
//				//highlighing the row
//                if(inputs[j].getAttribute('data-index')[0] == row && inputs[j].value == estimate){
////                    this.style.textDecoration = 'underline';
//					this.style.borderColor = 'red';
//					this.style.borderWidth = '5px'
//                }
//				//hilighting the col
//                if(inputs[j].getAttribute('data-index')[1] == col && inputs[j].value == estimate){
//                    this.style.borderColor = 'red';
//					this.style.borderWidth = '5px'
//                }
//				
//				//highligting the square
//				var selectdSquare = getSquare(row,col);
//				for(var i = 0; i < selectdSquare.length; i++){
//					selectdSquare[i].style.backgroundColor = '#cfe3f3'
//				}		
//			}
//			console.log(sudoku.getConflicts({ A1: 9, A8:1}))
			var solvedPuzzle = sudoku.solve(puzzle);
			console.log(solvedPuzzle);
        })        
	}
} 

highlightErrow()









