console.log("Loaded!");
var memory = [];
var prevResult = undefined;
var numDisplay = "";
var decimal = false;

$(".btn").on('click', function() {
	var buttonVal = $(this).text();

	// Numbers
	if($(this).hasClass("num")) {
		if(!isNaN(prevResult)) {
			numDisplay = "";
			prevResult = undefined;
		}
		numDisplay += buttonVal;
		changeDisplay(numDisplay);
	}

	// Decimal
	if(buttonVal === ".") {
		if(!isNaN(prevResult)) {
			numDisplay = "";
			prevResult = undefined;
		}
		numDisplay += buttonVal;
		changeDisplay(numDisplay);
	}

	// '%'
	if(buttonVal === "%" ) { 
		numDisplay = numDisplay/100;
		changeDisplay(numDisplay);
	}

	// AC or CE
	if($(this).hasClass("clear")) {
		if(buttonVal === "AC") {
			memory = [];
			prevResult = undefined;
		}
		clearDisplay();
	}

	// Multiply, Divide, Plus, Minus
	if($(this).hasClass("op")) {
		var tempDisplay = numDisplay;
		memory.push(numDisplay);

		/*if(memory.length >= 3) {
			//evaluate
		}*/

		switch (buttonVal) {
		    case "x":
		        memory.push("x");
		        break;
		    case "-":
		        memory.push("-");
		        break;
		    case "÷":
		        memory.push("÷");
		        break;
		    case "+":
		        memory.push('+');
		        break;
		}
		clearDisplay();
		changeDisplay(tempDisplay);
	}

	// Equals
	if(buttonVal === "=" ) {
		evaluate();
	}

});

function evaluate() {
	memory.push(numDisplay);

	var result = 0;
	var num = 0;
	var op = undefined;

	for (var i = 0; i < memory.length; i++) {
		console.log(result);

		if(i % 2 == 0) {
			num = parseFloat(memory[i]);
			if(i == 0) {
				result = parseFloat(memory[i]);
			}
		} else {
			op = memory[i];
		}

		if(op && i > 1) {
			switch (op) {
		    case "x":
		        result *= num;
		        break;
		    case "-":
		        result -= num;
		        break;
		    case "÷":
		        result /= num;
		        break;
		    case "+":
		        result += num;
		        break;
			}
		}
	}
	console.log(result);
	changeDisplay(result);
	numDisplay = "" + result;
	prevResult = result;
	memory = [];
}

function changeDisplay(numDisplay) {
	$("#screen").html(numDisplay);
}

function clearDisplay() {
	numDisplay = "";
	$("#screen").html("0");
}