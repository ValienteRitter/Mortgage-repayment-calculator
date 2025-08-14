const form = document.querySelector('form');
const amountInput = document.querySelector("#amount-input");
const termInput = document.querySelector("#term-input");
const interestInput = document.querySelector("#interest-input");
const calculateButton = document.querySelector(".calc-btn");
const radioButtons = document.querySelectorAll('input[type="radio"]');
const resultsContainer = document.querySelector(".results-container");

console.log(radioButtons);

function getMortgageType() {
  return document.querySelector('input[type="radio"]:checked').value;
}

document.addEventListener("input", () => {
  console.log(getMortgageType());
  console.log(getValues());
  console.log(calculateMortgage(getValues()));
  console.log(isValid());
});

function getValues() {
  return {
    'amount': Number(amountInput.value),
    'term': Number(termInput.value),
    'interest': Number(interestInput.value)
  };
}

function calculateMortgage({amount, term, interest}) {
  const monthlyInterest = interest / 12 / 100
  const totalPayments = term * 12
  let monthlyRepayment, totalRepayment

  switch(getMortgageType()) {
    case 'interest-only':
      monthlyRepayment = amount * monthlyInterest
      totalRepayment = (monthlyRepayment * term * 12) + amount
      break

    case 'repayment':
      monthlyRepayment = amount * (monthlyInterest * (Math.pow(monthlyInterest + 1, totalPayments)) / (Math.pow(monthlyInterest + 1, totalPayments) - 1))
      totalRepayment = monthlyRepayment * totalPayments
      break
  }

  return {
    monthly: monthlyRepayment.toFixed(2),
    total: totalRepayment.toFixed(2)
  }

}

function isValid() {
  return Array.from(document.querySelectorAll('input')).every((input) => input.checkValidity())
}

function highlight() {
  Array.from(document.querySelectorAll('input')).forEach(input => {
    if (input.checkValidity()) {
      input.style.borderColor = 'black'      
    }
    else {
      input.style.borderColor = 'red'
    }
  })
}

console.log(document.querySelectorAll('input'));

function displayResult({monthly, total}) {
  if(isValid()) {
    resultsContainer.innerHTML = `
      <h1>Your Results</h1>
      <p>Your results shown are shown below based on the information you provided. To adjust the results, edit the form and click 'calculate repayments' again</p>
      <div class="repayments">
          <div class="monthly">
              <p>Your monthly repayments</p>
              <span class="montly">$${monthly}</span>
          </div>
          <hr>
          <div class="total">
              <p>Total you'll repay over the term</p>
              <span class="total">$${total}</span>
          </div>
      </div>`
}}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  displayResult(calculateMortgage(getValues()))
})

calculateButton.addEventListener('mousedown', highlight)