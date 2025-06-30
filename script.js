const buttons = document.querySelector(".calculator-buttons");
const display = document.querySelector("#display");

const MAXLEN = 10;
const PRECISION = 3;

let resultState = false;

let holdingFunc = {
  func: (x) => x,
  inUse: false
};

function addNumber(numText) {
  if (resultState) {
    allClear();
  }
  if (numText === ".") {
    if (display.textContent.includes(".")) {
    } else if (display.textContent) {
      display.textContent += numText;
    } else {
      display.textContent = "0.";
    }
  } else if (display.textContent.length >= MAXLEN) {
  } else {
    display.textContent += numText;
  }
}

const operatorMap = {
  times: (x, y) => x * y,
  divide: (x, y) => {
    if (y !== 0) {
      return x / y;
    } else {
      return "undefined";
    }
  },
  plus: (x, y) => x + y,
  minus: (x, y) => x - y,
};

function addOperator(numText, operatorText) {
  resultState = false;
  if (operatorText === "ac") {
    allClear();
  } else if (operatorText === "del") {
    display.textContent = display.textContent.slice(0, -1);
  } else if (numText) {
    if (holdingFunc.inUse) {
      numText = evaluate(numText);
      resultState = false;
      if (numText === "undefined") {
        return;
      }
    }
    holdingFunc.func = (x) => operatorMap[operatorText](Number(numText), x);
    holdingFunc.inUse = true;
    display.textContent = "";
  }
}

function evaluate(numText) {
  const result = holdingFunc.func(Number(numText));
  holdingFunc.func = (x) => x;
  holdingFunc.inUse = false;
  if (result === "undefined") {
    display.textContent = result;
  } else {
    display.textContent = Math.round(10 ** PRECISION * result) / 10 ** PRECISION;
  }
  resultState = true;
  return display.textContent;
  
}

function allClear() {
  display.textContent = "";
  holdingFunc.func = (x) => x;
  holdingFunc.inUse = false;
  resultState = false;
}

buttons.addEventListener("click", (e) => {
  if (e.target.classList.contains("button")) {
    if (display.textContent === "undefined") {
      allClear();
    }
    if (e.target.classList.contains("number")) {
      addNumber(e.target.textContent);
    } else if (e.target.classList.contains("operator")) {
      addOperator(display.textContent, e.target.id);
    } else if (e.target.classList.contains("equal")) {
      evaluate(display.textContent);
    }
  }
});
