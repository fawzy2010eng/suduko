//highlit error cell in square or row or {column
function highlightErrorfocus(){
	//the whole inputs array
	var inputs = document.querySelectorAll('input');
	for(var i = 0; i < inputs.length; i++){
		inputs[i].addEventListener('focus',function(){
			var row = this.getAttribute('data-index')[0];
            var col = this.getAttribute('data-index')[1];
			var rowValues = [];
			var colValues =[];
			var squareValue = [];
			
			for(var j = 0; j < inputs.length; j++){
				if(inputs[j].getAttribute('data-index')[0] == row && inputs[j].value != ''){
					rowValues.push(inputs[j].value)	
				}
			}
			
			for(var k = 0; k < inputs.length; k++){
				if(inputs[k].getAttribute('data-index')[1] == col && inputs[k].value != ''){
					colValues.push(inputs[k].value)	
				}
			}
			
			var selectdSquare = getSquare(row,col);
			for(var r = 0; r < selectdSquare.length; r++){
				if(selectdSquare[r].value != ''){
					squareValue.push(selectdSquare[r].value);
					
				}
			}
			if(checkUnique(rowValues) && checkUnique(colValues) && checkUnique(squareValue)){
				this.style.backgroundColor = ''	
			}
			else{
				this.style.backgroundColor = 'red';
			}
		})
		
	}
}
highlightErrorfocus()

//highlit error cell in square or row or {column
function highlightErrorkeyup(){
	//the whole inputs array
	var inputs = document.querySelectorAll('input');
	for(var i = 0; i < inputs.length; i++){
		inputs[i].addEventListener('keyup',function(){
			var row = this.getAttribute('data-index')[0];
            var col = this.getAttribute('data-index')[1];
			var rowValues = [];
			var colValues =[];
			var squareValue = [];
			
			for(var j = 0; j < inputs.length; j++){
				if(inputs[j].getAttribute('data-index')[0] == row && inputs[j].value != ''){
					rowValues.push(inputs[j].value)	
				}
			}
			
			for(var k = 0; k < inputs.length; k++){
				if(inputs[k].getAttribute('data-index')[1] == col && inputs[k].value != ''){
					colValues.push(inputs[k].value)	
				}
			}
			
			var selectdSquare = getSquare(row,col);
			for(var r = 0; r < selectdSquare.length; r++){
				if(selectdSquare[r].value != ''){
					squareValue.push(selectdSquare[r].value);
					
				}
			}
			
			
			if(checkUnique(rowValues) == true && checkUnique(colValues) == true && checkUnique(squareValue == true)){
				this.style.backgroundColor = ''	
			}
			else{
				this.style.backgroundColor = 'red';
			}
		})
		
	}
}
highlightErrorkeyup()
