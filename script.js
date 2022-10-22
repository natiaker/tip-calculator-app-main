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
    tipAmount = (billAmount*tipRate/100).toFixed(2);
    tipAmountResult.innerText = `$${tipAmount}`;
    
    total = parseFloat(bill.value) + parseFloat(tipAmount);
    totalResult.innerText = `$${total.toFixed(2)}`;

    reset.style.backgroundColor = "hsl(172, 67%, 45%)";
}

bill.addEventListener("input", () => { 
    billAmount = parseInt(bill.value);

    if(bill.value <= 0) {
        totalResult.innerText = "$0.00";
        tipAmountResult.innerText = "$0.00";
        document.getElementById("billError").style.display = "inline";
        bill.style.border = "2px solid #E17052";
    } else {
        document.getElementById("billError").style.display = "none";
        bill.style.border = "2px solid #26C2AE";
    }
    calculate();
})

tipInput.addEventListener("input", () => {
    if(bill.value > 0) {
        tipRate = parseInt(tipInput.value);
        if(tipRate <= 0) {
            totalResult.innerText = "$0.00";
            tipAmountResult.innerText = "$0.00";
            tipInput.style.border = "2px solid #E17052";
        } else {
            tipInput.style.border = "2px solid #26C2AE";
        }
        calculate();
    } 
})

tipBtn.forEach(el => {
    el.onclick = (event) => {
        if(bill.value > 0) {
            tipRate = parseInt(event.target.textContent);
            calculate();
        } else {
            totalResult.innerText = "$0.00";
            tipAmountResult.innerText = "$0.00";
        }
    }
})

people.addEventListener("input", () => {
    tipPerPerson = (tipAmount/people.value).toFixed(2);
    tipAmountResult.innerText = `$${tipPerPerson}`;

    total = parseFloat(bill.value) + parseFloat(tipAmount);
    totalPerPerson = (total/people.value).toFixed(2);
    totalResult.innerText = `$${totalPerPerson}`;

    if(people.value <= 0) {
        totalResult.innerText = "$0.00";
        tipAmountResult.innerText = "$0.00";
        document.getElementById("peopleError").style.display = "inline";
        people.style.border = "2px solid #E17052";
    } else {
        document.getElementById("peopleError").style.display = "none";
        people.style.border = "2px solid #26C2AE";
    }

})

reset.addEventListener("click", () => {
    bill.value = "";
    people.value = "";
    tipInput.value = "";
    bill.style.border = "2px solid hsla(185, 38%, 97%, 1)";
    people.style.border = "2px solid hsla(185, 38%, 97%, 1)";
    tipInput.style.border = "2px solid hsla(185, 38%, 97%, 1)";
    totalResult.innerText = "$0.00";
    tipAmountResult.innerText = "$0.00";
    reset.style.backgroundColor = "#0D686D";
    document.getElementById("peopleError").style.display = "none";
    document.getElementById("billError").style.display = "none";
}) 