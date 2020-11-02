const buttons = document.querySelector('.buttons-container');
const clearBtn = document.getElementById('clear-btn');
const operatorBtns = document.querySelectorAll('.operator-btn');
let display = document.querySelector('.display');
let firstNumber;
let operator;
let secondNumber;
let answer;


const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
	if (b === 0) {
		return "error";
	} else if (a === 0) {
		return 0;
	} else {
		return a / b;
	}
};

function calculate(operator, num1, num2) {
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

function calculatorFunctions(e) {

	if (e.target.classList.contains('number-button')) {

		//remove operator button color indicator if displayed
		operatorBtns.forEach((btn) => {
			btn.classList.remove('is-depressed');
		});

		//display user input
		if (e.target.classList.contains('decimal') && display.value === '0' ||
			 e.target.classList.contains('decimal') && display.value === firstNumber) {
			display.value = '0' + e.target.textContent;
		} else if (display.value === '0' || display.value === firstNumber) {
			display.value = e.target.textContent;
		} else {
			display.value = display.value + e.target.textContent;
		}
	}

	//store first number & operator
	if (e.target.classList.contains('operator-btn')) {
		e.target.classList.add('is-depressed');
		firstNumber = display.value;
		operator = e.target.textContent;
	}

	//equal click...store second number and call calculate function
	if (e.target.classList.contains('equal')) {
		secondNumber = display.value;
		answer = calculate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
		display.value = answer.toFixed(2);
	}
}

function clear() {
	display.value = "0";
}

buttons.addEventListener('click', calculatorFunctions);
clearBtn.addEventListener('click', clear);

//Prevent persistent focus when buttons are clicked with mouse
buttons.addEventListener('mousedown', e => {
	e.preventDefault();
});