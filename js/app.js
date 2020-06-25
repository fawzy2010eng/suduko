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
var myvar = setInterval(updatetimer , 1000);

//setting the flip card of the timer
flipcard.addEventListener('mouseover',function(){
    
    
})

flipcard.addEventListener('mouseout',function(){
//    innercard.style.transform = 'rotateY(0)';
    
})
var paused = false;

//setting the pause button

pause.addEventListener('click',function(){
//    get the time from the timer
    var currenttime = timer.innerHTML;
    var minute = parseInt(currenttime[0]+currenttime[1]);
    var sec = parseInt(currenttime[6]+currenttime[7]);
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