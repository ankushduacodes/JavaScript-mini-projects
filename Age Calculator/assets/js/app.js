let today = new Date().toISOString().slice(0, 10);
let todayDate = today.split("-");

document.getElementById("mydate").max = today;

let calculateBtn = document.getElementById("calculate-btn");

let result = document.getElementById("result");
let feedback = document.getElementsByClassName("invalid-feedback")[0];

function checkValidInput(mydate) {
  if (mydate.value === "") {
    if (!mydate.classList.contains("is-invalid")) {
      mydate.classList.add("is-invalid");
    }
    feedback.textContent = "Please enter a valid date";
    return false;
  }

  if (parseInt(mydate.value.split("-")[0]) < 1903) {
    if (!mydate.classList.contains("is-invalid")) {
      mydate.classList.add("is-invalid");
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
      mydate.classList.add("is-invalid");
    }
    feedback.textContent = `Please enter a date between 1903-01-01 and ${today}`;
    return false;
  }

  return true;
}

function writeResult(age, opt) {
  switch (opt) {
    case "YEAR":
      result.textContent = `You are ${age} years old`;
      break;
    case "MONTH":
      result.textContent = `You are ${age} months old`;
      break;
    case "DAY":
      result.textContent = `You are ${age} days old`;
      break;
    case "HOUR":
      result.textContent = `You are ${age} hours old`;
      break;
    case "MINUTE":
      result.textContent = `You are ${age} minutes old`;
      break;
    case "SECOND":
      result.textContent = ` You are ${age} seconds old`;
      break;
  }
}

function calculateAgeInYears(mydate) {
  mydate.classList.remove("is-invalid");
  let dateOfBirth = mydate.value.split("-");
  let age = parseInt(todayDate[0]) - parseInt(dateOfBirth[0]);
  return age
}

function calculateAgeInMonths(mydate) {
  mydate.classList.remove("is-invalid");
  let dateOfBirth = mydate.value.split("-");
  let age =
    (todayDate[0] - dateOfBirth[0]) * 12 + (todayDate[1] - dateOfBirth[1]);
    if (parseInt(todayDate[2]) - parseInt(dateOfBirth[2]) < 0) {
      age -= 1;
    }
  return age;
}

function calculateAgeInHours(mydate) {
  mydate.classList.remove("is-invalid");
  age = calculateAgeInDays(mydate);
  age *= 24;
  return age;
}

function calculateAgeInMinutes(mydate) {
  mydate.classList.remove("is-invalid");
  age = calculateAgeInDays(mydate);
  age *= 24 * 60;
  return age;
}

function calculateAgeInSeconds(mydate) {
  mydate.classList.remove("is-invalid");
  age = calculateAgeInDays(mydate);
  age *= 24 * 60 * 60;
  return age;
}

function selectedOption(mydate) {
  let optIndex = document.getElementById("mySelect").selectedIndex;
  let age;
  switch (optIndex) {
    case 0:
      age = calculateAgeInYears(mydate);
      writeResult(age, "YEAR");
      break;
    case 1:
      age = calculateAgeInMonths(mydate);
      writeResult(age, "MONTH");
      break;
    case 2:
      age = calculateAgeInDays(mydate);
      writeResult(age, "DAY");
      break;
    case 3:
      age = calculateAgeInHours(mydate);
      writeResult(age, "HOUR");
      break;
    case 4:
      age = calculateAgeInMinutes(mydate);
      writeResult(age, "MINUTE");
      break;
    case 5:
      age = calculateAgeInSeconds(mydate);
      writeResult(age, "SECOND");
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
