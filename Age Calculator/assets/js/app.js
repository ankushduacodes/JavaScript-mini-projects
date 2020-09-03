let today = new Date().toISOString().slice(0, 10);

document.getElementById("mydate").max = today;

calculateBtn = document.getElementById("calculate-btn");

result = document.getElementById("result");
feedback = document.getElementsByClassName("invalid-feedback")[0];

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
    parseInt(mydate.value.split("-")[0]) > today.split("-")[0] ||
    parseInt(mydate.value.split("-")[1]) > today.split("-")[1] ||
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

function showResult(age) {
  result.textContent = ` You are ${age} years old`;
}

function calculate() {
  if (!checkValidInput()) {
    return;
  }
  let dateOfBirth = document.getElementById("mydate").value.split("-");
  let todayDate = today.split("-");
  let age = todayDate[0] - dateOfBirth[0];
  showResult(age);
}

calculateBtn.addEventListener("click", calculate);
