// ***NORMAL MODE***
// function answer(e) {
//   let num1 = document.querySelector("#num-one").value;
//   let num2 = document.querySelector("#num-two").value;
//   let addAnswer = Number(num1) + Number(num2);
//   let subtractAnswer = Number(num1) - Number(num2);
//   let multiplyAnswer = Number(num1) * Number(num2);
//   let divideAnswer = Number(num1) / Number(num2);
//   if (e.target.matches("#add")) {
//     document.querySelector("#answer").value = addAnswer;
//   } else if (e.target.matches("#subtract")) {
//     document.querySelector("#answer").value = subtractAnswer;
//   } else if (e.target.matches("#multiply")) {
//     document.querySelector("#answer").value = multiplyAnswer;
//   } else if (e.target.matches("#divide")) {
//     document.querySelector("#answer").value = divideAnswer;
//   }
// }

// document.querySelectorAll("button").forEach((item) => {
//   item.addEventListener("click", answer);
// });

// ***EPIC MODE***
const erase = document.querySelector("#erase");
const input = document.querySelector("#num-input");
const ops = document.getElementsByClassName("ops");
const equals = document.querySelector("#equals");
const num = document.getElementsByClassName("number");
const period = document.getElementById("decimal");

let currentNum = ""; //to store clicked number
let operator = null; //initial value of the operator
let calculation = []; //array to store the numbers and operators
let previousNum = ""; //to store the last calculated result

// update numbers
const updateNum = (e) => {
  if (operator === "" && previousNum !== "") {
    previousNum = "";
  }
  const numText = e.target.innerText;
  if (currentNum === "" && numText === ".") {
    currentNum = "0";
    input.innerHTML = currentNum;
  } else if (numText === "." && currentNum.includes(".")) {
    numText = null;
  } else {
    currentNum += numText;
    input.innerHTML = currentNum;
    console.log(currentNum);
  }
};

// operator function
const selectOperator = (e) => {
  if (previousNum !== "") {
    calculation.push(previousNum);
    if (calculation[calculation.length - 1] !== ("+" || "-" || "*" || "/")) {
      operator = e.target.innerText;
      calculation.push(operator);
    }
    previousNum = "";
  }
  if (currentNum !== "") {
    calculation.push(currentNum);
    if (calculation[calculation.length - 1] !== ("+" || "-" || "*" || "/")) {
      operator = e.target.innerText;
      calculation.push(operator);
    }
  }
  currentNum = "";
  // console.log(operator);
  // console.log(calculation);
};

// calculation
const getResult = (e) => {
  if (currentNum !== "") {
    calculation.push(currentNum);
  }
  // console.log(e.target.innerText);

  const result = eval(calculation.join("")).toString();
  // currentNum = result;
  input.innerHTML = result;
  previousNum = result;
  currentNum = "";
  calculation = [];
  operator = null;
  // console.log(typeof result);
};

// event listener to operator and number buttons
for (let i = 0; i < num.length; i++) {
  num[i].addEventListener("click", updateNum);
}
for (i = 0; i < ops.length; i++) {
  ops[i].addEventListener("click", selectOperator);
}

equals.addEventListener("click", getResult);

// erase function
erase.onclick = () => {
  input.innerHTML = "0";
  currentNum = "";
  pendingNum = "";
  calculation = [];
  previousNum = "";
};
