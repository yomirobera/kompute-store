document.getElementById("work-button").addEventListener("click", handleWorkButtonClick);
document.getElementById("bank-button").addEventListener("click", handleBankButtonClick);
document.getElementById("get-loan-button").addEventListener("click", handleGetLoanButtonClick);
document.getElementById("repay-loan-button").addEventListener("click", handleRepayLoanButtonClick);

// initialize variables for bank balance, pay balance, loan balance
var bankBalance = 0;
var payBalance = 0;
var loanBalance = 0;

// function to update the display of bank balance, pay balance, and loan balance
function updateDisplay() {
  document.getElementById("bank-balance").innerHTML = bankBalance;
  document.getElementById("pay-balance").innerHTML = payBalance;
  document.getElementById("loan-balance").innerHTML = loanBalance;
}

// handle the work button click
function handleWorkButtonClick() {
  // increase pay balance by 100
  payBalance += 100;
  // update the display
  updateDisplay();
}

// handle the bank button click
function handleBankButtonClick() {
  // deduct 10% of the pay balance for the outstanding loan (if there is one)
  if (loanBalance > 0) {
    loanBalance -= payBalance * 0.1;
    payBalance -= payBalance * 0.1;
  }
  // transfer the remaining pay balance to the bank balance
  bankBalance += payBalance;
  // reset the pay balance
  payBalance = 0;
  // update the display
  updateDisplay();
}

// handle the get loan button click
function handleGetLoanButtonClick() {
  // prompt the user for the loan amount
  var loanAmount = prompt("Enter loan amount:");
  // check if loan amount is more than double the bank balance or if there is already an outstanding loan
  if (loanAmount > bankBalance * 2 || loanBalance > 0) {
    alert("Loan request denied.");
  } else {
    // add the loan amount to the loan balance
    loanBalance += loanAmount;
  }
  // update the display
  updateDisplay();
}

// handle the repay loan button click
function handleRepayLoanButtonClick() {
  // transfer the full pay balance to the loan balance
  loanBalance -= payBalance;
  // transfer any remaining funds after paying off the loan to the bank balance
  bankBalance += Math.max(payBalance - loanBalance, 0);
  // reset the pay balance
  payBalance = 0;
  // update the display
  updateDisplay();
}

// update the display on page load
updateDisplay();
