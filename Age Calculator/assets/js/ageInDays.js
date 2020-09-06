let month_obj = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

function calculateAgeInDays(mydate) {
  mydate.classList.remove("is-invalid");
  let dateOfBirth = mydate.value.split("-");
  let leapDays = 0;
  for (let i = parseInt(dateOfBirth[0]); i < parseInt(todayDate[0]); i++) {
    if (i % 4 == 0) {
      leapDays += 1;
    }
  }

  let daysInPreviousYears =
    (parseInt(todayDate[0]) - parseInt(dateOfBirth[0])) * 365 + leapDays;
  let daysInCurrentYear = 0;
  for (let i = parseInt(dateOfBirth[1]); i < parseInt(todayDate[1]); i++) {
    daysInCurrentYear += month_obj[i.toString()];
  }

  daysInCurrentYear -= parseInt(dateOfBirth[2]) - 1;
  daysInCurrentYear += parseInt(todayDate[2]);

  age = daysInCurrentYear + daysInPreviousYears;

  writeResult(age, "DAY");
}
