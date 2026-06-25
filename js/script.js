const displayResult = document.querySelector("#display");
const clearBtn = document.querySelector("#clear");
const operatorBtn = document.querySelectorAll(".operator");
const digitBtnList = document.querySelectorAll(".digit");
const decimalBtn = document.querySelector("#decimal");
const equalBtn = document.querySelector("#equal");
const delBtn = document.querySelector("#delete");

digitBtnList.forEach((digit) => {
    digit.addEventListener("click", () => {
        let current = displayResult.value;
        displayResult.value = `${current}${digit.textContent}`;
    });
});

operatorBtn.forEach((operator) => {
    operator.addEventListener("click", () => {
        let current = displayResult.value;
        displayResult.value = `${current}${operator.textContent}`;
    });
});

decimalBtn.addEventListener("click", () => {
    let current = displayResult.value;
    displayResult.value = `${current}${decimal.textContent}`;
});

delBtn.addEventListener("click", () => {
    displayResult.value = displayResult.value.slice(0, -1);
});

equalBtn.addEventListener("click", () => {
    let result = eval(displayResult.value);
    displayResult.value = result;
});

clearBtn.addEventListener("click", () => {
    displayResult.value = "";
});



