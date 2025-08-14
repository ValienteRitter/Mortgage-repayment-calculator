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
    monthly: monthlyRepayment,
    total: totalRepayment
  }

}


