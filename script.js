let bill = document.querySelector(".input-section__bill");
let people = document.querySelector(".input-section__people");
let tipBtn = document.querySelectorAll(".input-section__tip--btn");
let tipInput = document.querySelector(".input-section__tip--input");
let reset = document.querySelector(".result-section__reset");
let tipAmountResult = document.getElementById("tip-amount-price");
let totalResult = document.getElementById("total-price");
let tipRate = 0; 
let tipAmount = 0; 
let total = 0;
let totalPerPerson = 0;
let tipPerPerson = 0;


function calculate() {
    tipAmount = (bill.value*tipRate/100).toFixed(2);
    tipAmountResult.innerText = `$${tipAmount}`;
    
    total = parseFloat(bill.value) + parseFloat(tipAmount);
    totalResult.innerText = `$${total}`;
}

tipInput.addEventListener("input", () => {
    tipRate = parseInt(tipInput.value);
    calculate();
})

tipBtn.forEach(el => {
    el.onclick = (event) => {
        tipRate = parseInt(event.target.textContent);
        calculate();
    }
})

people.addEventListener("input", () => {
    tipPerPerson = (tipAmount/people.value).toFixed(2);
    tipAmountResult.innerText = `$${tipPerPerson}`;

    total = parseFloat(bill.value) + parseFloat(tipAmount);
    totalPerPerson = (total/people.value).toFixed(2);
    totalResult.innerText = `$${totalPerPerson}`;
})

reset.addEventListener("click", () => {
    bill.value = "";
    people.value = "";
    tipInput.value = "";
    totalResult.innerText = "$0.00";
    tipAmountResult.innerText = "$0.00";
}) 