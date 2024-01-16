const previousKeys = document.querySelector("#previous-keys");
const currentKey = document.querySelector("#current-key");
const keys = document.querySelectorAll(".key");
const equalKey = document.querySelector("#equal");
const decimalKey = document.querySelector("#decimal");
const divideKey = document.querySelector("#divide");
const timesKey = document.querySelector("#times");
const minusKey = document.querySelector("#minus");
const plusKey = document.querySelector("#plus");

const nonNumbers = [
    equalKey.textContent,
    decimalKey.textContent,
    divideKey.textContent,
    timesKey.textContent,
    minusKey.textContent,
    plusKey.textContent
]

let input = [];
console.log(input.length);

//first input is nonNumbers -> don't push into array
//first input is numbers -> push into array
//second input is nonNumbers -> push into array = array[1]
//second input is numbers -> combine with first input = array[0]
//["5"] -> ["5", "1"] -> ["51", "1"] -> ["51"]
//["5"] -> ["5", "1"] -> ["51", "1"] -> ["51"]
//["num1", "operator", "num2"]
keys.forEach((key)=>key.addEventListener("click", ()=>{
    input.push(key.textContent);
    if(input.length >= 0 && input.length <= 1){
        if(nonNumbers.includes(input[0])){
            input = [];
        } 
    } else if (input.length > 1 && input.length <= 2) {
        if(!nonNumbers.includes(input[1])) {
            input[0] = input[0] + input[1];
            input.pop();
        }
    } else if (input.length > 3 && input.length <= 4) {
        if(!nonNumbers.includes(input[3])) {
            input[2] = input[2] + input[3];
            input.pop();
        } else if (nonNumbers.includes(input[3])){
            input[0] = operate(input);
            input.splice(1,2);
        }
    } 
    console.log(input);
    previousKeys.textContent = input.join(" ");
}))

equalKey.addEventListener("click", () => {
    console.log(input);
    currentKey.textContent = operate(input);
})

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(array) {
    let num1 = parseInt(array[0]);
    let num2 = parseInt(array[2]);
    let result;

    switch (array[1]){
        case plusKey.textContent:
            result = add(num1, num2);
            break;
        case minusKey.textContent:
            result = subtract(num1, num2);
            break;
        case timesKey.textContent:
            result = multiply(num1, num2);
            break;
        case divideKey.textContent:
            result = divide(num1, num2);
            break;
        default:
            break;
    }
    return result;
}
