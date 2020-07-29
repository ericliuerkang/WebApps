// NOTE: 
// This is the starter file for a blog post "How to build a calculator". You can follow the lesson at https://zellwk.com/blog/calculator-part-1

// # START EDITING YOUR JAVASCRIPT HERE
// ===============

const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = calculator.querySelector('.calculator__display');

keys.addEventListener('click', e => {
	if (e.target.matches('button')){
		const key = e.target;
		const action = key.dataset.action;
	    const keyContent = key.textContent;
	    const displayedNum = display.textContent;
	    const previousKeyType = calculator.dataset.previousKeyType;
	    //If any key is pressed, pressed keys are released
	    Array.from(key.parentNode.children)
	      .forEach(k => k.classList.remove('is-depressed'));
		//Number key pressed if no action
		if (!action){
			if (displayedNum === "0" || previousKeyType === 'operator') {
				display.textContent = keyContent;
			}
			else {
				//String concatenation, not numerical addition
				display.textContent += keyContent;
			}
  			calculator.dataset.previousKey = 'number';
		}
		if (
			action === 'add' ||
			action === 'subtract' ||
			action === 'multiply' ||
			action === 'divide'
		) {
			calculator.dataset.firstValue = displayedNum;
			calculator.dataset.operator = action;
			key.classList.add('isPressed');
      		calculator.dataset.previousKeyType = 'operator';
		}
		if (action === 'decimal') {
			if (!displayedNum.includes('.')) {
				display.textContent += '.';
			}
			if (previousKeyType === 'operator') {
				display.textContent = '0.';
			}
  			calculator.dataset.previousKeyType = 'decimal';
		}

		if (action === 'clear') {
			display.textContent = '0';
			calculator.dataset.previousKeyType = '';
			calculator.dataset.firstValue = '';
			calculator.dataset.operator = '';
  			calculator.dataset.previousKeyType = 'clear';
		}

		if (action === 'calculate') {
			const firstValue = calculator.dataset.firstValue;
			const operator = calculator.dataset.operator;
			const secondValue = displayedNum;
			const calculate = (n1, operator, n2) => {
			  var result = '';
			  
			  if (operator === 'add') {
			    result = parseFloat(n1) + parseFloat(n2);
			  } else if (operator === 'subtract') {
			    result = parseFloat(n1) - parseFloat(n2);
			  } else if (operator === 'multiply') {
			    result = parseFloat(n1) * parseFloat(n2);
			  } else if (operator === 'divide') {
			    result = parseFloat(n1) / parseFloat(n2);
			  }
			  return result
			}
			display.textContent = calculate(firstValue, operator, secondValue);
  			calculator.dataset.previousKeyType = 'calculate';
		}
	}
});