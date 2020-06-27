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
var start = document.querySelector('.ml-5 .start')
//setting the timer in the front card

var d = new Date();
var n = d.getTime();
function updatetimer(){
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
//var myvar = setInterval(updatetimer , 1000);


//setting the pause button

pause.addEventListener('click',function(){
    //    flip the grid
    innercard.style.transform = 'rotateY(180deg)';
    //    pause the timer
    clearInterval(myvar);
    //    disaple this button
    this.disabled = true;
    //    able the start button
    start.disabled = false;
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
    innercard.style.transform = 'rotateY(0)';
    this.disabled = true;
    pause.disabled = false;
     paused = true;
    
})

//creating grid function creategird(){
	var count = 0;
    //giving the inputs Is and Js
    var inputs = document.querySelectorAll('input');

    for(var j = 0; j < 81; j++){
        inputs[j].setAttribute('data-j' , Math.floor(j/9));    
    }
    for(var i = 0; i < 81; i++){
        inputs[i].setAttribute('data-i' , Math.floor(i%9))

    }

    var idol = [1,2,3,4,5,6,7,8,9];

    //creating full array
    let fullArray = Array(9).fill().map(() => Array(9).fill(0));
    
	for(var k = 0; k < inputs.length; k++){
		console.log(k);
		var cellJ = k - (k - (Math.floor(k%9)));
        var cellI = (k - (k%9))/9;
		// loop through the ith array
        for(var i = 0; i < 9; i++){
            if(idol.indexOf(fullArray[cellI][i]) != -1){
                idol[idol.indexOf(fullArray[cellI][i])] = ''  
            }  
        }
		console.log(idol);
		//	looping through jth array
		for(var j = 0; j < 9; j++){
            if(idol.indexOf(fullArray[j][cellJ]) != -1){
                idol[idol.indexOf(fullArray[j][cellJ])] = ''  
            }  
        }
				console.log(idol);

		//creating suare array
		var square = [];
		
		//choosing the square for the cell
		if(cellI >= 0 && cellI < 3){
            if(cellJ >= 0 && cellJ < 3){
                square.push(fullArray[0][0]);
                square.push(fullArray[1][0]);
                square.push(fullArray[2][0]);
                square.push(fullArray[0][1]);
                square.push(fullArray[1][1]);
                square.push(fullArray[2][1]);
                square.push(fullArray[0][2]);
                square.push(fullArray[1][2]);
                square.push(fullArray[2][2]);
                
            }else if(cellJ >= 3 && cellJ < 6){
                
                square.push(fullArray[0][3]);
                square.push(fullArray[1][3]);
                square.push(fullArray[2][3]);
                square.push(fullArray[0][4]);
                square.push(fullArray[1][4]);
                square.push(fullArray[2][4]);
                square.push(fullArray[0][5]);
                square.push(fullArray[1][5]);
                square.push(fullArray[2][5]);
                
            }else{
                
                
                square.push(fullArray[0][6]);
                square.push(fullArray[1][6]);
                square.push(fullArray[2][6]);
                square.push(fullArray[0][7]);
                square.push(fullArray[1][7]);
                square.push(fullArray[2][7]);
                square.push(fullArray[0][8]);
                square.push(fullArray[1][8]);
                square.push(fullArray[2][8]);
                
            }
            
        }
        else if(cellI >= 3 && cellI < 6){
            if(cellJ >= 0 && cellJ < 3){
                
                square.push(fullArray[3][0]);
                square.push(fullArray[4][0]);
                square.push(fullArray[5][0]);
                square.push(fullArray[3][1]);
                square.push(fullArray[4][1]);
                square.push(fullArray[5][1]);
                square.push(fullArray[3][2]);
                square.push(fullArray[4][2]);
                square.push(fullArray[5][2]);
                
            }else if(cellJ >= 3 && cellJ < 6){
                
                
                square.push(fullArray[3][3]);
                square.push(fullArray[4][3]);
                square.push(fullArray[5][3]);
                square.push(fullArray[3][4]);
                square.push(fullArray[4][4]);
                square.push(fullArray[5][4]);
                square.push(fullArray[3][5]);
                square.push(fullArray[4][5]);
                square.push(fullArray[5][5]);
                
            }else{
                
                
                square.push(fullArray[3][6]);
                square.push(fullArray[4][6]);
                square.push(fullArray[5][6]);
                square.push(fullArray[3][7]);
                square.push(fullArray[4][7]);
                square.push(fullArray[5][7]);
                square.push(fullArray[3][8]);
                square.push(fullArray[4][8]);
                square.push(fullArray[5][8]);
                
            }
            
        }
        else{
            if(cellJ >= 0 && cellJ < 3){
                
                square.push(fullArray[6][0]);
                square.push(fullArray[7][0]);
                square.push(fullArray[8][0]);
                square.push(fullArray[6][1]);
                square.push(fullArray[7][1]);
                square.push(fullArray[8][1]);
                square.push(fullArray[6][2]);
                square.push(fullArray[7][2]);
                square.push(fullArray[8][2]);
                
            }else if(cellJ >= 3 && cellJ < 6){
                
                
                square.push(fullArray[6][3]);
                square.push(fullArray[7][3]);
                square.push(fullArray[8][3]);
                square.push(fullArray[6][4]);
                square.push(fullArray[7][4]);
                square.push(fullArray[8][4]);
                square.push(fullArray[6][5]);
                square.push(fullArray[7][5]);
                square.push(fullArray[8][5]);
                
            }else{
                
                square.push(fullArray[6][6]);
                square.push(fullArray[7][6]);
                square.push(fullArray[8][6]);
                square.push(fullArray[6][7]);
                square.push(fullArray[7][7]);
                square.push(fullArray[8][7]);
                square.push(fullArray[6][8]);
                square.push(fullArray[7][8]);
                square.push(fullArray[8][8]);
                
            }
            
        }
		//looping through square
		for(var i = 0; i < 9; i++){
			if(idol.indexOf(square[i]) != -1){
				idol[idol.indexOf(square[i])] = ''
			}
		};
		console.log(idol);

		//clearing the idol from the ''s
		var idolx = [];
		for(var i = 0; i < 9; i++){
			if(idol[i] != ''){
				idolx.push(idol[i]);
			}
		}
		console.log(idolx);
		//get random item from the idol array
		var rand = Math.floor((Math.random() * idolx.length));	
		console.log(rand,idolx[rand]);
		
		fullArray[cellI][cellJ] = idolx[rand];
		idol = [1,2,3,4,5,6,7,8,9]
	}
	console.log(fullArray);
	
}
creategird();



