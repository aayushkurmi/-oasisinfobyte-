const display = document.getElementById('display');
let currentInput = '0';
let firstOperand = null;
let operator = null;
let shouldResetDisplay = false;

const updateDisplay = () => {
    display.textContent = currentInput;
};

const clear = () => {
    currentInput = '0';
    firstOperand = null;
    operator = null;
    shouldResetDisplay = false;
    updateDisplay();
};

const deleteLast = () => {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
};

const appendNumber = (number) => {
    if (currentInput === '0' || shouldResetDisplay) {
        currentInput = number;
        shouldResetDisplay = false;
    } else {
        currentInput += number;
    }
    updateDisplay();
};

const appendOperator = (nextOperator) => {
    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
    } else if (operator) {
        const result = operate(firstOperand, parseFloat(currentInput), operator);
        currentInput = `${result}`;
        firstOperand = result;
    }
    operator = nextOperator;
    shouldResetDisplay = true;
};

const calculate = () => {
    if (operator && firstOperand !== null) {
        currentInput = `${operate(firstOperand, parseFloat(currentInput), operator)}`;
        firstOperand = null;
        operator = null;
        shouldResetDisplay = true;
        updateDisplay();
    }
};

const operate = (a, b, operator) => {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        default:
            return b;
    }
};

document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => appendNumber(button.dataset.number));
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => appendOperator(button.dataset.operator));
});

document.getElementById('clear').addEventListener('click', clear);
document.getElementById('delete').addEventListener('click', deleteLast);
document.getElementById('equals').addEventListener('click', calculate);

updateDisplay();
