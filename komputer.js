//Making the buttons work
document.getElementById("work-button").addEventListener("click", handleWorkButtonClick);
document.getElementById("bank-button").addEventListener("click", handleBankButtonClick);
document.getElementById("get-loan-button").addEventListener("click", handleGetLoanButtonClick);
document.getElementById("repay-loan").addEventListener("click", handleRepayLoanButtonClick);

// variables
var bankBalance = 0;
var payBalance = 0;
var loanBalance = 0;
var repayLoan = document.getElementById("repay-loan");

// function to update the display with norwagian currency format
function updateDisplay() {
  document.getElementById("bank-balance").innerHTML = 
  new Intl.NumberFormat('nb-NB',{style: 'currency',currency: 'NOK', currencyDisplay: 'symbol'}).format(bankBalance);
  document.getElementById("pay-balance").innerHTML = 
  new Intl.NumberFormat('nb-NB',{style: 'currency',currency: 'NOK', currencyDisplay: 'symbol'}).format(payBalance);
  document.getElementById("loan-balance").innerHTML = 
  new Intl.NumberFormat('nb-NB',{style: 'currency',currency: 'NOK', currencyDisplay: 'symbol'}).format(loanBalance);
}

//Display the repay loan button
if (loanBalance >0) {
  repayLoan.style.display="inline-block";
}else {
  repayLoan.style.display="none";
}


// Work button click
function handleWorkButtonClick() {
  // increase pay balance by 100
  payBalance += 100;
  // update the display
  updateDisplay();
}

// handle the bank button click
function handleBankButtonClick() {
  // Minus 10% of the pay balance beacuse of loan
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
    alert("Sorry, you cannot get the loan.");
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

//LAPTOP
const laptopsElement = document.getElementById("laptops");
const descriptionElement = document.getElementById("description");
const titleElement = document.getElementById("Laptoptitle");
const priceElement = document.getElementById("price");
const descriElement = document.getElementById("descri");
const buynowElement = document.getElementById("BuyNowButton")

const imageElement = document.getElementById("laptopImg")

//fetching api
let laptops = [];

fetch("https://hickory-quilled-actress.glitch.me/computers")
  .then(response => response.json())
  .then(data => laptops = data)
  .then(laptops => addLaptops(laptops))

const addLaptops = (laptops) => {
  laptops.forEach(x => addLaptop(x))
  descriptionElement.innerHTML=laptops[0].description;
  titleElement.innerHTML=laptops[0].title;
  descriElement.innerHTML=laptops[0].description;
  priceElement.innerHTML=laptops[0].price+ "NOK";
  const BASE_URL = "https://hickory-quilled-actress.glitch.me/";
  imageElement.src = BASE_URL+laptops[0].image

}

const addLaptop = (laptop) =>  {
  const laptopElement = document.createElement("option");
  laptopElement.value = laptop.id;
  laptopElement.appendChild(document.createTextNode(laptop.title));
  laptopsElement.appendChild(laptopElement);
}

//add eventlistner
select.addEventListener("change", () => {
  const selectedLaptop = laptops.find(x => x.id == selectedLaptop.value);

  //
  descriptionElement.innerHTML=selectedLaptop.description;
  titleElement.innerHTML=selectedLaptop.title;
  descriElement.innerHTML=selectedLaptop.description;
  priceElement.innerHTML=selectedLaptop.price;
  imageElement.src = selectedLaptop.img;
});

//Fetching image
//const image = "https://hickory-quilled-actress.glitch.me/assets/images/1.png";
//fetch (image)
  //.then(response => response.blob())
  //.then(imageBlob => {
    //const imageObjectURL = URL.createObjectURL(imageBlob);
    //imageElement.src = imageObjectURL;
  //});


// update the display on page load
updateDisplay();