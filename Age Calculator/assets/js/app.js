let today = new Date().toISOString().slice(0, 10);

document.getElementById("mydate").max = today;

calculateBtn = document.getElementById("calculate-btn")

result = document.getElementById("result")

function checkValidInput() {
  if (document.getElementById('mydate').value === "") {
    alert("Missing date")
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
  dateOfBirth = document.getElementById("mydate").value.split("-");
  todayDate = today.split("-")
  age = todayDate[0] - dateOfBirth[0]
  showResult(age)
}

calculateBtn.addEventListener("click", calculate)