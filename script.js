"use strict";

// define selectors
const display = document.querySelector(".display-text");

const buttonsAll = document.querySelectorAll(".button");
const buttonsNum = document.querySelectorAll(".button-num");
const buttonsOp = document.querySelectorAll(".button-operator");

const buttonClear = document.querySelector(".button-clear");
const buttonNeg = document.querySelector(".button-negative");
const buttonEqual = document.querySelector(".button-equals");
const buttonDec = document.querySelector(".button-point");

const seven = document.querySelector(".button-7");
const eight = document.querySelector(".button-8");
const nine = document.querySelector(".button-9");
const add = document.querySelector(".button-plus");
const four = document.querySelector(".button-4");
const five = document.querySelector(".button-5");
const six = document.querySelector(".button-6");
const minus = document.querySelector(".button-minus");
const one = document.querySelector(".button-1");
const two = document.querySelector(".button-2");
const three = document.querySelector(".button-3");
const multiply = document.querySelector(".button-times");
const zero = document.querySelector(".button-0");
const decimal = document.querySelector(".button-point");
const clear = document.querySelector(".button-clear");
const divide = document.querySelector(".button-divide");

// new state condition
let displayInput = "";

// Visual for pushing buttons
for (let i = 0; i < buttonsAll.length; i++) {
  buttonsAll[i].addEventListener("mousedown", function() {
    buttonsAll[i].classList.add("pressed");
  });
  buttonsAll[i].addEventListener("mouseup", function() {
    buttonsAll[i].classList.remove("pressed");
  });
}
// reset after calculation
for (let i = 0; i < buttonsAll.length; i++) {
  buttonsAll[i].addEventListener("click", function() {
    if (displayInput[0] === "=") {
      displayInput = "";
      display.innerHTML = "0";
    }
  });
}


// Storing num inputs
for (let i = 0; i < buttonsNum.length; i++) {
  buttonsNum[i].addEventListener("click", function() {
    if (display.innerHTML === "0") { // if current number = 0, replace 0 with number
      displayInput = event.target.innerHTML; // store input in variable
      display.innerHTML = displayInput; // display variable
    } else { // if number already input, concat number
      displayInput += event.target.innerHTML; // concat input
      display.innerHTML = displayInput; // display input
    }
  });
}

// storing operator inputs
for (let i = 0; i < buttonsOp.length; i++) {
  buttonsOp[i].addEventListener("click", function() {
    // include only one operator at a time
    if (displayInput.includes("+") || displayInput.includes("- ") || displayInput.includes("x") || displayInput.includes("/")) return;

    displayInput = displayInput + " " + event.target.innerHTML + " ";
    display.innerHTML = displayInput;
  });
}

// clear press
buttonClear.addEventListener("click", function() {
  displayInput = "";
  display.innerHTML = "0";
});

// negative press
buttonNeg.addEventListener("click", function() {
  if (displayInput.length === 0) {
    displayInput = "-";
    display.innerHTML = displayInput;
  }
  if (displayInput[displayInput.length - 1] === " ") {
    displayInput += "-";
    display.innerHTML = displayInput;
  }
});

// decimal point button
buttonDec.addEventListener("click", function() {
  const arr = displayInput.split(" "); // array to check for decimals
  // if no inputs yet, 0.xxxx
  if (arr[0] === "") { 
    displayInput += "0.";
    display.innerHTML = displayInput;
  }
  // check first number input for decimals
  if (arr.length === 1) {
    if (arr[0].includes(".") === false) {
      displayInput += ".";
      display.innerHTML = displayInput;
    }
  }
  // if no second input, 0.xxx
  if (arr.length === 3) {
    if (arr[2] === "") {
      displayInput += "0.";
      display.innerHTML = displayInput;
    }
    // check second input for decimals
    if (!arr[2].includes(".")) {
      displayInput += ".";
      display.innerHTML = displayInput;
    }
  }
});

// equals press calculation
buttonEqual.addEventListener("click", function() {
  let arr = displayInput.split(" ");
  const total1 = Number(arr[0]); // convert 1st input to number
  const total2 = Number(arr[2]); // convert 2nd input to number
  const operator = arr[1]; // create variable to check operator
  // convert string operators to functional operations
  if (operator === "+") {
    displayInput = `= ${total1 + total2}`;
    display.innerHTML = displayInput;
  }
  if (operator === "-") {
    displayInput = `= ${total1 - total2}`;
    display.innerHTML = displayInput;
  }
  if (operator === "x") {
    displayInput = `= ${total1 * total2}`;
    display.innerHTML = displayInput;
  }
  if (operator === "/") {
    displayInput = `= ${total1 / total2}`;
    display.innerHTML = displayInput;
  }
});
