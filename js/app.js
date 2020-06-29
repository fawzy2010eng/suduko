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
	var conflicts = sudoku.getConflicts({ A1: 5, A2:5});
	console.log(conflicts)
})

//setting the start button

start.addEventListener('click',function(){
    
    //    get the time from the timer
    var spenttime = timer.innerHTML;
    var minute = parseInt(spenttime[0] + spenttime[1]);
    var sec = parseInt(spenttime[5] + spenttime[6]);
    var currenttime = (minute + sec) * 1000; 
    setInterval(function(){
        currenttime += 1000;
        if(currenttime < 60000){
            sec = Math.floor((currenttime % 60000)/1000);
            minute = Math.floor((currenttime - sec) / 60000)
        }else{
            sec = Math.floor(currenttime/1000);
        }
        if(minute < 10){minute = `0${minute}`};
        if(sec < 10){sec = `0${sec}`};
        timer.innerHTML = `${minute} : ${sec}`
    },1000)
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
		inputs[inputArr.indexOf(array[i][0])].style.backgroundColor = '#cbcbcb'
	}	
}

//filling grid with puzzle for the first time
fillingGrid(puzzle)


//solving the puzzle

//var solvedPuzzle = sudoku.solve(puzzle);
//console.log(solvedPuzzle)





