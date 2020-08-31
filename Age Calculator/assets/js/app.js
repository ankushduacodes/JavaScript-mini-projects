let today = new Date().toISOString().slice(0, 10);

document.getElementById("mydate").max = today;

result = document.getElementById("result")

function showResult(resultOutput) {
  result.textContent = resultOutput;
}

function calculate() {
  dateOfBirth = document.getElementById("mydate").value.split("-");
  todayDate = today
}
