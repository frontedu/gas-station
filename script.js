//VALORES MUTÁVEIS
const 
  //PREÇO (REAIS)
  gasPrice = 5.89, //GAS
  ethPrice = 3.99; //ETA
let 
  //VOLUME DISPONÍVEL (LITROS)
  gasVol = 1000, //GAS
  ethVol = 1000; //ETA

///FATURAMENTO E VOLUME INICIAL
let profit = 0, volume = 0;

///VOLUME FIXO
const gasFixed = gasVol, ethFixed = ethVol;

//QUANTIDADE REAL DA BOMBA
const gasPump = document.getElementById("quant-gas");
const ethPump = document.getElementById("quant-eta");
changePump(gasPump, ethPump);

//ALTERAR VALOR/LITRO
const price = document.getElementById("valor-litro");
price.value = gasPrice;
selectFuel();

//GET SUBMIT CLICK (PARA O EVENT LISTENER)
const submit = form.vendido;

////////////////////
//FUNÇÃO PRINCIPAL//
////////////////////
submit.addEventListener("click", function (event) {
  event.preventDefault();

  //CALC TOTAL
  let fuelType = form.select.value;
  let Liters = ~~form.quant.value;
  if (Liters < 1) return;
  const total = fuelType == "Gasolina" ?
  gasPrice * Liters : ethPrice * Liters;

  //QUANTIDADE BOMBA GAS/ETH
  if (fuelType == "Gasolina") {
    if (gasVol <= 0 || Liters > gasVol) return;
    gasVol -= Liters;
    gasPump.textContent = gasVol;
    changeGasColor(gasVol);
  } else {
    if (ethVol <= 0 || Liters > ethVol) return;
    ethVol -= Liters;
    ethPump.textContent = ethVol;
    changeEthColor(ethVol);
  }

  //VOLUME E FATURAMENTO
  const newBilling = document.getElementById("faturamento");
  profit += Number(total);
  newBilling.textContent = profit.toFixed(2);

  volume += Liters;
  const newVol = document.getElementById("volume");
  newVol.textContent = volume;

  //EXIBIR COMPRA EXECUTADA
  const getp = document.getElementById("purchases");
  let linep =
    fuelType + " — " + Liters + "L" + " — " + "R$ " + total.toFixed(2);
  paragraph(getp, linep);

  //RESETA INPUT QUANTIDADE/L E SUBMIT
  form.quant.value = null;
  preview();
});

////////////////////////
//PRÉ-VIZUALIZAR PREÇO//
////////////////////////
function preview() {
  const input = ~~form.quant.value;
  const fuelTypePreview = form.select.value;
  let totalPreview = fuelTypePreview == "Gasolina" ?
  gasPrice * input : ethPrice * input;
  let Vol = fuelTypePreview == "Gasolina" ?
  gasVol : ethVol;

  if (input <= 0) submit.value = "Confirmar";
  else if (input > Vol) submit.value = "Indisponível";
  else submit.value = "Confirmar" + " (R$ " + totalPreview.toFixed(2) + ")";
}

//////////////////////////
//ADICIONA INFO DA VENDA//
//////////////////////////
const dotVerify = /\.$/;
function paragraph(getp, linep) {
  if (dotVerify.test(getp.lastElementChild.textContent) == true)
    getp.lastElementChild.textContent = linep;
  else {
    const newp = document.createElement("p");
    newp.innerText = linep;
    getp.prepend(newp);
  }
}

///////////////////
//PREÇO POR LITRO//
///////////////////
function selectFuel() {
  const gasSelect = document.getElementById("option-1");
  gasSelect.onclick = function () {
    price.value = gasPrice;
  };

  const ethSelect = document.getElementById("option-2");
  ethSelect.onclick = function () {
    price.value = ethPrice;
  };
}

///////////////////////
//NOVO TOTAL DA BOMBA//
///////////////////////
function changePump(gasPump, ethPump) {
  gasPump.textContent = gasVol;
  ethPump.textContent = ethVol;
}

//////////////////
//COR QUANT. GAS//
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

//////////////////
//COR QUANT. ETH//
//////////////////
function changeEthColor(ethVol) {
  if (ethVol > ethFixed * 0.5)
    document.querySelector("#quant-eta").style.color = "var(--green)";
  else if (ethVol <= ethFixed * 0.5 && ethVol > ethFixed * 0.1)
    document.querySelector("#quant-eta").style.color = "var(--orange)";
  else if (ethVol <= ethFixed * 0.1 && ethVol > 0)
    document.querySelector("#quant-eta").style.color = "var(--red)";
  else if (ethVol == 0)
    document.querySelector("#quant-eta").style.color = "var(--gray)";
}

/////////////////
//RESETA INPUTS//
/////////////////
function undoValue() {
  form.quant.value = null;
  preview();
}
