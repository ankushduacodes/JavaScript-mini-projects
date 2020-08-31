let today = new Date().toISOString().slice(0, 10);

document.getElementById("mydate").max = today;

calculateBtn = document.getElementById("calculate-btn")

result = document.getElementById("result")

function checkValidInput() {
  mydate = document.getElementById('mydate')
  if (mydate.value === "") {
    alert("Missing date")
    return false;
  }

  if (parseInt(mydate.value.split('-')[0]) < 1903) {
    alert('Oldest person alive was born on 1903-01-02, Please enter a valid date')
    return false;
  }

  if (parseInt(mydate.value.split('-')[0]) > today.split('-')[0]) {
    alert(`Today's date is ${today}, Please enter a valid date`)
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