let today = new Date().toISOString().slice(0, 10);
let todayDate = today.split("-");

document.getElementById("mydate").max = today;

let calculateBtn = document.getElementById("calculate-btn");

let result = document.getElementById("result");
let feedback = document.getElementsByClassName("invalid-feedback")[0];

function checkValidInput(mydate) {
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
    result.textContent = `You are ${age} years old`;
  } else if (opt === "MONTH") {
    result.textContent = `You are ${age} months old`;
  } else if (opt === "DAY") {
    result.textContent = `You are ${age} days old`;
  } else if (opt === "HOUR"){
    result.textContent = `You are ${age} hours old`;
  } else if (opt === "MINUTE") {
    result.textContent = `You are ${age} minutes old`;
  } else if (opt === "SECOND") {
    result.textContent = ` You are ${age} seconds old`;
  }
}

function calculateAgeInYears(mydate) {
  mydate.classList.remove("is-invalid")
  let dateOfBirth = mydate.value.split("-");
  let age = todayDate[0] - dateOfBirth[0];
  writeResult(age, "YEAR")
}

function calculateAgeInMonths(mydate) {
  mydate.classList.remove("is-invalid")
  let dateOfBirth = mydate.value.split("-");
  let age = (((todayDate[0] - dateOfBirth[0]) * 12) + (todayDate[1] - dateOfBirth[1]))
  writeResult(age, "MONTH")
}

function selectedOption(mydate) {
  let optIndex = document.getElementById("mySelect").selectedIndex;
  switch (optIndex) {
    case 0:
      calculateAgeInYears(mydate);
      break;
    case 1:
      calculateAgeInMonths(mydate);
      break;
    case 2:
      calculateAgeInDays(mydate);
      break;
    case 3:
      calculateAgeInHours(mydate);
      break;
    case 4:
      calculateAgeInMinutes(mydate);
      break;
    case 5:
      calculateAgeInSeconds(mydate);
      break;
  }
}

function calculate() {
  let mydate = document.getElementById("mydate");
  if (!checkValidInput(mydate)) {
    return;
  }
  selectedOption(mydate);
}

calculateBtn.addEventListener("click", calculate);
