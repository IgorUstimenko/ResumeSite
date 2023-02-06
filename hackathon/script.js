// Инпуты
let areaInput = document.querySelector("#areaInput");
let floatsInput = document.querySelector("#floatsInput");
let panelAreaInput = document.querySelector("#panelAreaInput");
let ecoProcentInput = document.querySelector("#ecoProcentInput");
let yearEnergyInput = document.querySelector("#yearEnergyInput");
let yearUseInput = document.querySelector("#yearUseInput");
let countValueMax = document.querySelector(".count-value-max");
// Кнопка рассчитать
let countBtn = document.querySelector(".calc-btn");

//Модальное окно
let modalWrapper = document.querySelector(".modal-wrapper");

// Формула
countBtn.onclick = function () {
  if (
    areaInput.value == "" ||
    floatsInput.value == "" ||
    panelAreaInput.value == "" ||
    ecoProcentInput.value == "" ||
    yearEnergyInput.value == "" ||
    yearUseInput.value == ""
  ) {
    alert("Заполните все поля");
  } else {
    // Кол-во панелей
    let howWeNeed = (yearUseInput.value / yearEnergyInput.value) * ((ecoProcentInput.value / 100) * 95);
    // Сколько поместится на крышу
    let countOfSolaarPanelOnArea = areaInput.value / (floatsInput.value * panelAreaInput.value);
    modalWrapper.style.display = "block";

    let countNeedValue = document.querySelector(".count-need-value");
    let countCanValue = document.querySelector(".count-can-value");
    let countProcentValue = document.querySelector(".count-procent-value");
    let neddprocent = (countOfSolaarPanelOnArea * 100) / howWeNeed;
    let nedprocent2 = (neddprocent * ecoProcentInput.value) / 100;

    countNeedValue.innerText = Math.ceil(howWeNeed);
    countCanValue.innerText = Math.floor(countOfSolaarPanelOnArea);
    countProcentValue.innerText = ecoProcentInput.value + "%";
    countValueMax.innerHTML = Math.floor(nedprocent2) + "%";
  }
};

let closeBtn = document.querySelector(".modal-wrapper-close");
closeBtn.onclick = function () {
  modalWrapper.style.display = "none";
};
