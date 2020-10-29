const buttons = document.querySelector('.buttons-container');
const clearBtn = document.getElementById('clear-btn');
const operatorBtns = document.querySelectorAll('.operator-btn');
let display = document.querySelector('.display');
let storeFirstNum;
let storeOperator;
let storeSecondNum;
let answer;


const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
	if (b === 0) {
		return "Error";
	} else if (a === 0) {
		return 0;
	} else {
		return a / b;
	}
};

function operate(operator, num1, num2) {
	switch (operator) {
		case "+":
			return add(num1, num2);
			break;
		case "−":
			return subtract(num1, num2);
			break;
		case "×":
			return multiply(num1, num2);
			break;
		case "÷":
			return divide(num1, num2);
			break;
	}
};

buttons.addEventListener('click', updateDisplay);
clearBtn.addEventListener('click', clear);





function updateDisplay(e) {

	//grab numbers
	if (e.target.classList.contains('number-button')) {

		//remove operator button color indicator if displayed
		operatorBtns.forEach((btn) => {
			btn.classList.remove('is-depressed');
		});
		//display numbers
		if (display.value === '0' || display.value === storeFirstNum) {
			display.value = e.target.textContent;
		} else {
			display.value = display.value + e.target.textContent;
		}
	}

	//store operator and first number
	if (e.target.classList.contains('operator-btn')) {
		e.target.classList.add('is-depressed');
		storeFirstNum = display.value;
		//				storeFirstNum = parseInt(display.value);
		storeOperator = e.target.textContent;
	}


	//equal click...
	if (e.target.classList.contains('equal')) {
		storeSecondNum = display.value;

		answer = operate(storeOperator, parseFloat(storeFirstNum), parseFloat(storeSecondNum));
		display.value = answer;
	}
}


function clear() {
	display.value = "0";
}

//Prevent persistent focus when buttons are clicked with mouse
buttons.addEventListener('mousedown', e => {
	e.preventDefault();
});
