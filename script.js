let bill = document.querySelector(".input-section__bill");
let people = document.querySelector(".input-section__people");
let wrapper = document.querySelector(".input-section__tip");
let tipBtn = document.querySelectorAll(".input-section__tip--btn");
let tipInput = document.querySelector(".input-section__tip--input");
let reset = document.querySelector(".result-section__reset");
let tipAmountResult = document.getElementById("tip-amount-price");
let totalResult = document.getElementById("total-price");
let peopleError = document.getElementById("peopleError");
let billError = document.getElementById("billError");
let tipRate = 0; 
let total = 0;

function calculate_total(bill, tip, n) {
    return (n===0) ? n : bill * (1 + tip/100) / n;
}

function calculate_tip(bill, tip, n) {
    return (n===0) ? n : bill * tip/100 / n;
}

function getInputValue(input) {
    let res = parseInt(input.value);
    if (!res) res = 0;
    return res;
}

function error_message(input, inputError = null) {
    if(input.value <= 0) {
       if(inputError != null) inputError.style.display = "inline";
        input.style.border = "2px solid #E17052";
        return false;
    } else {
        if(inputError != null) inputError.style.display = "none";
        input.style.border = "2px solid #26C2AE";
        return true;
    }
}

function calculate() {
    let billValue = getInputValue(bill);
    let tipValue = getInputValue(tipInput);
    let peopleValue = getInputValue(people);

    if (isButton) { 
        tipValue = tipRate; 
    } else { prevButton.style.backgroundColor = "#00474B"; }

    let tip = calculate_tip(billValue, tipValue, peopleValue);
    let total = calculate_total(billValue, tipValue, peopleValue);
    tipAmountResult.innerText = `$${tip.toFixed(2)}`;
    totalResult.innerText = `$${total.toFixed(2)}`;
}

function eventListenerFunc(element, elementError) {
    element.addEventListener("input", () => { 
        if (error_message(element, elementError) ) { 
            reset.style.backgroundColor = "#26C2AE";
            reset.style.cursor = "pointer";
            reset.disabled = false;
            calculate(); 
        } else {
            totalResult.innerText = "$0.00";
            tipAmountResult.innerText = "$0.00";  
        }
    })
}

eventListenerFunc(bill, billError);
eventListenerFunc(tipInput);
eventListenerFunc(people, peopleError);

// tipBtn.forEach(el => {
//     el.onclick = (event) => {
//         tipRate = parseInt(event.target.textContent);
//         tipInput.value = tipRate;

//         reset.style.backgroundColor = "#26C2AE";
//         reset.style.cursor = "pointer";
//         reset.disabled = false;
//     }
// })

let isButton = null;
let prevButton = null;
wrapper.addEventListener('click', (e) => {
  isButton = e.target.nodeName === 'BUTTON'; 
  if (!isButton) return;

  e.target.style.backgroundColor = "#26C2AE";

  tipRate = parseInt(e.target.textContent);
  calculate();

  reset.style.backgroundColor = "#26C2AE";
  reset.style.cursor = "pointer";
  reset.disabled = false;

  if(prevButton !== null) {
    prevButton.style.backgroundColor = "#00474B";  
  }
  prevButton = e.target;
});

reset.addEventListener("click", () => {
    let inputs = [bill, people, tipInput];
    for(let input of inputs) {
        input.value = "";
        input.style.border = "2px solid hsla(185, 38%, 97%, 1)";
    }
    
    prevButton.style.backgroundColor = "#00474B"; 
    reset.disabled = true;
    reset.style.cursor = "unset";
    reset.style.backgroundColor = "#0D686D";
    totalResult.innerText = "$0.00";
    tipAmountResult.innerText = "$0.00";  
    billError.style.display = "none";
    peopleError.style.display = "none";
}) 
