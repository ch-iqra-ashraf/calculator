const displayResult = document.querySelector("#display");
const clearBtn = document.querySelector("#clear");
const operatorBtnList = document.querySelectorAll(".operator");
const digitBtnList = document.querySelectorAll(".digit");
const decimalBtn = document.querySelector("#decimal");
const equalBtn = document.querySelector("#equal");
const delBtn = document.querySelector("#delete");
const previewResult = document.querySelector("#preview");


displayResult.addEventListener("input", (e) => {
    console.log(e.target.value);

})
function updatePreview() {
    if (!isValidExpression(displayResult.value)) {
        previewResult.textContent = "";
        return;
    }

     try {
        let result = eval(displayResult.value);
        if (Number.isNaN(result) || !Number.isFinite(result)) {
            previewResult.textContent = "";
        } else {
            previewResult.textContent = result;
        }
    } catch (error) {
        previewResult.textContent = "";
    };
};

function appendDigit(value) {
    displayResult.value = `${displayResult.value}${value}`;
    updatePreview();
}; 

digitBtnList.forEach((digit) => {
    digit.addEventListener("click", () => {
        appendDigit(digit.textContent);
    });
});

function appendOperator(symbol) {
    let current = displayResult.value;
    if (current === "") return;
    if (/[+\-*/%]$/.test(current)) {
        displayResult.value = current.slice(0, -1) + symbol;
    } else {
        displayResult.value = current + symbol;
    }
    updatePreview();
}

operatorBtnList.forEach((operator) => {
    operator.addEventListener("click", () => {
        appendOperator(operator.textContent);
    });
});


function appendDecimal() {
    let current = displayResult.value;
    let chunks = current.split(/[+\-*/%]/);
    let lastChunk = chunks[chunks.length - 1];
    if (!lastChunk.includes(".")) {
        displayResult.value = `${current}.`;
        updatePreview(); // FIX: this call was missing
    }
}

decimalBtn.addEventListener("click", () => {
    appendDecimal();
});

function deleteLast() {
    displayResult.value = displayResult.value.slice(0, -1);
    updatePreview();
}

delBtn.addEventListener("click", () => {
    deleteLast();
});


function calculateResult() {
    if (!isValidExpression(displayResult.value)) {
        displayResult.value = "Error";
        previewResult.textContent = "";
        return;
    }
    try {
        let result = eval(displayResult.value);
        if (Number.isNaN(result) || !Number.isFinite(result)) {
            displayResult.value = "Error";
        } else {
            displayResult.value = result;
        }
    } catch (error) {
        displayResult.value = "Error";
    }
    previewResult.textContent = "";
}

equalBtn.addEventListener("click", () => {
    calculateResult();
});

function clearDisplay() {
    displayResult.value = "";
    previewResult.textContent = "";
}

clearBtn.addEventListener("click", () => {
    clearDisplay();
});

document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (/^[0-9]$/.test(key)) {
        e.preventDefault();
        appendDigit(key);
    } else if (["+", "-", "*", "/", "%"].includes(key)) {
        e.preventDefault();
        appendOperator(key);
    } else if (key === ".") {
        e.preventDefault();
        appendDecimal();
    } else if (key === "Enter" || key === "=") {
        e.preventDefault();
        calculateResult();
    } else if (key === "Backspace") {
        e.preventDefault();
        deleteLast();
    } else if (key === "Escape") {
        e.preventDefault();
        clearDisplay();
    }
});



// operatorBtnList.forEach((operator) => {
//     operator.addEventListener("click", () => {
//         let current = displayResult.value;
//         //     let chunks = displayResult.value.split(/[+\-*/%]/);
//         // let lastChunk = chunks[chunks.length - 1];
//         // if (!lastChunk.includes("/")("-")("+")) {
//         //     displayResult.value = `${current}${operator.textContent}`;
//         // } else {
//         //     displayResult.value = `${current}`
//         // }
//         displayResult.value = `${current}${operator.textContent}`;
//         updatePreview()
//     });
// });

// decimalBtn.addEventListener("click", () => {
//     let current = displayResult.value;
//     let chunks = displayResult.value.split(/[+\-*/%]/);
//     let lastChunk = chunks[chunks.length - 1];
//     // console.log(lastChunk,chunks);

//     if (lastChunk.includes(".") === false) {
//         displayResult.value = `${current}${decimalBtn.textContent}`;
//     } else {
//         return
//     }
// });

// delBtn.addEventListener("click", () => {
//     displayResult.value = displayResult.value.slice(0, -1);
//     updatePreview()
// });

// equalBtn.addEventListener("click", () => {
//     let result = eval(displayResult.value);
//     displayResult.value = result;
//     updatePreview()
// });

// clearBtn.addEventListener("click", () => {
//     displayResult.value = "";
// });



