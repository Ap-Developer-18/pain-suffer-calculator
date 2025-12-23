const disabilityInput = document.getElementById("disability-percentage");
const ageInput = document.getElementById("age-of-victim");
const accidentDateInput = document.getElementById("accident-date");
const currentDateInput = document.getElementById("current-date");
const hospitalDaysInput = document.getElementById("hospital-days");
const resultDisplay = document.getElementById("compensation-amount");
const detailDisability = document.getElementById("detail-disability");
const detailDisabilityAmount = document.getElementById(
  "detail-disability-amount"
);
const detailBeforeAge = document.getElementById("detail-before-age");
const detailAfterAge = document.getElementById("detail-after-age");
const detailPeriod = document.getElementById("detail-period");
const detailInterest = document.getElementById("detail-interest");
const detailFinal = document.getElementById("detail-final");
const toggleButton = document.getElementById("toggle-details");
const detailBox = document.getElementById("calculation-details");
const calculationForm = document.getElementById("pain-calculation-form");
const ifAgeAboveThirty = document.getElementById("if-age-above-thirty");

const totalAmmount = 180000;
const intrest = 0.02;
const hospitalPerDay = 360;
currentDateInput.value = new Date().toISOString().split("T")[0];

calculationForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const disability = Number(disabilityInput.value);
  const age = Number(ageInput.value);
  const accidentDate = new Date(accidentDateInput.value);
  const currentDate = new Date(currentDateInput.value);
  const hospitalDays = Number(hospitalDaysInput.value) || 0;

  const baseCompensation = (disability / 100) * totalAmmount;

  let afterAgeCompensation = baseCompensation;
  if (age > 30) {
    afterAgeCompensation = afterAgeCompensation * (1 - (age - 30) / 100); // jitni age 30 se jyada hogi utni hi % base compensation me se ghategi
    ifAgeAboveThirty.classList.remove("hidden");
    ifAgeAboveThirty.innerText = `Note: Since the age of the victim is above 30, the compensation amount has been reduced by ${
      age - 30
    }%.`;
  }

  const years = (currentDate - accidentDate) / (1000 * 60 * 60 * 24 * 365.25); // convert milliseconds to years

  const interest = afterAgeCompensation * intrest * years;
  const hospitalAmount = hospitalDays * hospitalPerDay;

  const finalAmount = Math.round(
    afterAgeCompensation + interest + hospitalAmount
  );

  resultDisplay.innerText = `₹ ${finalAmount.toLocaleString()}`;

  detailDisability.innerText = `${disability}%`;
  detailDisabilityAmount.innerText =
    `${disability}%` +
    ` * ` +
    `${totalAmmount.toLocaleString()} = ₹ ${baseCompensation}`;
  detailBeforeAge.innerText = baseCompensation;
  detailAfterAge.innerText = Math.round(afterAgeCompensation);
  detailPeriod.innerText = `${years.toFixed(2)} years`;
  detailInterest.innerText = `+ ₹ ${Math.round(interest)}`;
  detailFinal.innerText = `₹ ${finalAmount}`;
});

/* Toggle details */
toggleButton.addEventListener("click", () => {
  detailBox.classList.toggle("hidden");
  toggleButton.innerText = detailBox.classList.contains("hidden")
    ? "Show details"
    : "Hide details";
});
