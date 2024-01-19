//Initialize variables
const screenInput = document.querySelector("#screen-input");
const screenResult = document.querySelector("#screen-result");
const functionClear = document.querySelector("#function-clear");
const functionDelete = document.querySelector("#function-delete");
const keys = document.querySelectorAll(".key");
const numbersNode = document.querySelectorAll('.numbers');
const equalKey = document.querySelector("#equal");
const decimalKey = document.querySelector("#decimal");
const divideKey = document.querySelector("#divide");
const timesKey = document.querySelector("#times");
const minusKey = document.querySelector("#minus");
const plusKey = document.querySelector("#plus");

//operators array
const operators = [
    divideKey.value,
    timesKey.value,
    minusKey.value,
    plusKey.value
]

//numbers array
const newArray = Array.from(numbersNode);
const numbers = [];
newArray.forEach((val) => {
    numbers.push(val.value);
})

let input = [];

keys.forEach((key) => key.addEventListener("click", ()=>{

    let val = key.value;

    //prevent adding operators, equal and decimal into empty array
    if(input.length === 0) {
        if(operators.includes(val) || val === equalKey.value || val === decimalKey.value) {
            input = [];
        } else {
            input.push(val);
        }
    } else {
        //add current value into input array
        input.push(val);

        //edit array depends on the current value (number/decimal/operator/equal)
        if(input.length === 2){
            if(numbers.includes(input[1])) {
                input[0] = input[0] + input[1];
                input.pop();
            } else if (input[1] === decimalKey.value) {
                input[0] = input[0] + input[1];
                input.pop();
                decimalKey.disabled = true;
            } else if (operators.includes(input[1])){
                decimalKey.disabled = false;
            }
        } else if(input.length === 4) {
            if(numbers.includes(input[3])) {
                input[2] = input[2] + input[3];
                input.pop();
            } else if(input[3] === decimalKey.value){
                input[2] = input[2] + input[3];
                input.pop();
                decimalKey.disabled = true;
            } else if(operators.includes(input[3])) {
                input[0] = operate(input);
                input.splice(1, 2);
                decimalKey.disabled = false;
                screenResult.textContent = input[0];
            } else if(input[3] === equalKey.value){
                input[0] = operate(input);
                input.splice(1, 3);
                decimalKey.disabled = false;
                screenResult.textContent = input[0]; 
            }
        }
    }
    screenInput.textContent = input.join(" ");
}))

//remove all values in array
functionClear.addEventListener("click", () => {
    input.splice(0, input.length);
    screenInput.textContent = input.join(" ");
    screenResult.textContent = input;
})

//remove the last value in array
functionDelete.addEventListener("click", () => {

    const last = input[input.length-1];

    if(operators.includes(last)){
        input.pop();
        screenInput.textContent = input.join(" ");
    } else if (!operators.includes(last)) {
        const removedArray = last.split('');
        removedArray.splice(-1,1);
        input[input.length-1] = removedArray.join("");
        screenInput.textContent = input.join(" ");
    }
})

function add(a, b){
    return a + b
}

function subtract(a, b){
    return a - b
}

function multiply(a, b){
    return a * b
}

function divide(a, b){
    return a / b
}

function operate(array) {
    let num1, num2, result;
    num1 = Number(array[0]);
    num2 = Number(array[2]);

    switch (array[1]){
        case '+':
            result = add(num1, num2);
            break;
        case '-':
            result = subtract(num1, num2);
            break;
        case '*':
            result = multiply(num1, num2);
            break;
        case '/':
            result = divide(num1, num2);
            break;
        default:
            break;
    }
    return result.toString();
}