//QUANT & VALORES
///SUBSTITUIVEIS
const gasPrice = 5.89; //CHECKED
const etaPrice = 3.99;
var gasVol = 1000;
var etaVol = 1000;
///SEMPRE INICIA EM 0
var faturamento = 0;
var volume = 0;
///VALOR FIXO
let gasFixed = gasVol;
let etaFixed = etaVol;

//QUANTIDADE REAL DA BOMBA
const bombaGas = document.getElementById("quant-gas");
const bombaEta = document.getElementById("quant-eta");
geralBomba(bombaGas, bombaEta);

// ALTERAR VALOR/LITRO
const price = document.getElementById("v-litro");
price.value = gasPrice;
selectFuel();

// GET SUBMIT CLICK (PARA O EVENT LISTENER)
const submit = document.getElementById("compra");

/////////////////
//MAIN FUNCTION//
/////////////////
submit.addEventListener("click", function (event) {
  event.preventDefault();

  //CALC TOTAL
  var Fuel = form.select.value;
  var Liters = form.quant.value;
  Liters = ~~Liters;
  if (Liters < 1) return;
  var total = Fuel == "Gasolina" ? gasPrice * Liters : etaPrice * Liters;

  // QUANTIDADE BOMBA GAS/ETA
  if (Fuel == "Gasolina") {
    if (gasVol <= 0 || Liters > gasVol) return;
    gasVol -= Liters;
    bombaGas.textContent = gasVol;
    changeGasColor(gasVol);
  } else {
    if (etaVol <= 0 || Liters > etaVol) return;
    etaVol -= Liters;
    bombaEta.textContent = etaVol;
    changeEtaColor(etaVol);
  }

  // VOLUME E FATURAMENTO
  var newFat = document.getElementById("faturamento");
  faturamento += Number(total);
  newFat.textContent = faturamento.toFixed(2);

  volume += Liters;
  var newVol = document.getElementById("volume");
  newVol.textContent = volume;

  //EXIBIR COMPRA EXECUTADA
  const getp = document.getElementById("purchases");
  var linep = Fuel + " — " + Liters + "L" + " — " + "R$ " + total.toFixed(2);
  paragraph(getp, linep);

  //RESETAR CAMPOS QUANTIDADE/L E SUBMIT DO HTML
  form.quant.value = null;
  preview();
});

/////////////////
//PREVIEW VALUE//
/////////////////
function preview() {
  var input = document.getElementById("quant-litros").value;
  var FuelPreview = form.select.value;
  var totalPreview =
    FuelPreview == "Gasolina" ? gasPrice * input : etaPrice * input;
  var Vol = FuelPreview == "Gasolina" ? gasVol : etaVol;

  if (input <= 0) submit.value = "Confirmar";
  else if (input > Vol) submit.value = "Indisponível";
  else submit.value = "Confirmar" + " (R$ " + totalPreview.toFixed(2) + ")";
}

/////////////////
//ADD PARAGRAPH//
/////////////////
function paragraph(getp, linep) {
  if (getp.lastElementChild.textContent == "Nenhuma compra efetuada.")
    getp.lastElementChild.textContent = linep;
  else {
    const newp = document.createElement("p");
    newp.innerText = linep;
    getp.prepend(newp);
  }
}

///////////////
//VALOR-LITRO//
///////////////
function selectFuel() {
  const gasSelect = document.getElementById("option-1");
  gasSelect.onclick = function () {
    price.value = gasPrice;
  };

  const etaSelect = document.getElementById("option-2");
  etaSelect.onclick = function () {
    price.value = etaPrice;
  };
}

///////////////
//TOTAL BOMBA//
///////////////
function geralBomba(bombaGas, bombaEta) {
  bombaGas.textContent = gasVol;
  bombaEta.textContent = etaVol;
}

//////////////////
//COLOR GASOLINA//
//////////////////
function changeGasColor(gasVol) {
  if (gasVol > gasFixed * 0.5)
    document.querySelector("#quant-gas").style.color = "var(--green)";
  else if (gasVol <= gasFixed * 0.5 && gasVol > gasFixed * 0.1)
    document.querySelector("#quant-gas").style.color = "var(--orange)";
  else if (gasVol <= gasFixed * 0.1 && gasVol > 0)
    document.querySelector("#quant-gas").style.color = "var(--red)";
  else if (gasVol == 0)
    document.querySelector("#quant-gas").style.color = "var(--gray)";
}

////////////////
//COLOR ETANOL//
////////////////
function changeEtaColor(etaVol) {
  if (etaVol > etaFixed * 0.5)
    document.querySelector("#quant-eta").style.color = "var(--green)";
  else if (etaVol <= etaFixed * 0.5 && etaVol > etaFixed * 0.1)
    document.querySelector("#quant-eta").style.color = "var(--orange)";
  else if (etaVol <= etaFixed * 0.1 && etaVol > 0)
    document.querySelector("#quant-eta").style.color = "var(--red)";
  else if (etaVol == 0)
    document.querySelector("#quant-eta").style.color = "var(--gray)";
}

////////////////////
//IF RADIO CHECKED//
////////////////////
function undoValue() {
  form.quant.value = null;
  preview();
}