let today = new Date().toISOString().slice(0, 10);

document.getElementById("mydate").max = today;

let calculateBtn = document.getElementById("calculate-btn");

let result = document.getElementById("result");
let feedback = document.getElementsByClassName("invalid-feedback")[0];

function checkValidInput() {
  let mydate = document.getElementById("mydate");
  if (mydate.value === "") {
    if (!mydate.classList.contains("is-invalid")) {
      mydate.className += " is-invalid";
    }
    feedback.textContent = "Please enter a valid date";
    return false;
  }

  if (parseInt(mydate.value.split("-")[0]) < 1903) {
    if (!mydate.classList.contains("is-invalid")) {
      mydate.className += " is-invalid";
    }
    feedback.textContent = `Please enter a date between 1903-01-01 and ${today}`;
    return false;
  }

  if (
    parseInt(mydate.value.split("-")[0]) > today.split("-")[0] &&
    parseInt(mydate.value.split("-")[1]) > today.split("-")[1] &&
    parseInt(mydate.value.split("-")[2]) > today.split("-")[2]
  ) {
    if (!mydate.classList.contains("is-invalid")) {
      mydate.className += " is-invalid";
    }
    feedback.textContent = `Please enter a date between 1903-01-01 and ${today}`;
    return false;
  }

  return true;
}

function writeResult(age, opt) {
  if (opt === "YEAR"){
    result.textContent = ` You are ${age} years old`;
  } else if (opt === "MONTH") {

  } else if (opt === "DAY") {

  } else if (opt === "HOUR"){

  } else if (opt === "MINUTE") {

  } else if (opt === "SECOND") {

  }
}

function calculateAgeInYears() {
  if (!checkValidInput()) {
    return false;
  }
  let dateOfBirth = document.getElementById("mydate").value.split("-");
  let todayDate = today.split("-");
  let age = todayDate[0] - dateOfBirth[0];
  writeResult(age, "YEAR")
}


function selectedOption() {
  let optIndex = document.getElementById("mySelect").selectedIndex;
  switch (optIndex) {
    case 0:
      calculateAgeInYears();
      break;
    case 1:
      calculateAgeInMonths();
      break;
    case 2:
      calculateAgeInDays();
      break;
    case 3:
      calculateAgeInHours;
      break;
    case 4:
      calculateAgeInMinutes();
      break;
    case 5:
      calculateAgeInSeconds();
      break;
  }
}

function calculate() {
  selectedOption();
}

calculateBtn.addEventListener("click", calculate);
