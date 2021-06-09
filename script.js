//VALORES MUTÁVEIS
const price = {
  gas: 5.89,
  eth: 3.99,
};

let vol = {
  gas: 1000,
  eth: 1000,
};

///FATURAMENTO E VOLUME INICIAL
let profit = 0, volume = 0;

///VOLUME FIXO
const gasDefined = vol.gas, ethDefined = vol.eth;

//QUANTIDADE REAL DA BOMBA
const gasPump = document.getElementById("quant-gas");
const ethPump = document.getElementById("quant-eta");
changePump(gasPump, ethPump);

//ALTERAR VALOR/LITRO
const checked = document.getElementById("valor-litro");
checked.value = price.gas;
selectFuel();

//QUANTIDADE DE VENDAS
const traded = document.getElementById("num-vendas");

//GET SUBMIT CLICK (PARA O EVENT LISTENER)
const submit = form.vendido;

////////////////////
//FUNÇÃO PRINCIPAL//
////////////////////
submit.addEventListener("click", function (event) {
  event.preventDefault();

  //CALC TOTAL
  let fuelType = form.select.value,
  Liters = ~~form.quant.value;
  if (Liters < 1) return;
  const total = fuelType == "Gasolina" ?
  price.gas * Liters : price.eth * Liters;

  //QUANTIDADE BOMBA GAS/ETH
  if (fuelType == "Gasolina") {
    if (vol.gas <= 0 || Liters > vol.gas) return;
    vol.gas -= Liters;
    gasPump.textContent = vol.gas;
    changeGasColor(vol.gas);
  } else {
    if (vol.eth <= 0 || Liters > vol.eth) return;
    vol.eth -= Liters;
    ethPump.textContent = vol.eth;
    changeEthColor(vol.eth);
  }

  //VOLUME E FATURAMENTO
  const recipes = document.getElementById("faturamento");
  profit += Number(total);
  recipes.textContent = profit.toFixed(2);

  volume += Liters;
  const newVol = document.getElementById("volume");
  newVol.textContent = volume;

  //EXIBIR COMPRA EXECUTADA
  const getp = document.getElementById("purchases");
  let linep = fuelType + " — " + Liters + "L"
  + " — "+ "R$ " + total.toFixed(2);
  paragraph(getp, linep);

  //RESETA INPUT QUANTIDADE/L E SUBMIT
  undoValue();
});

////////////////////////
//PRÉ-VIZUALIZAR PREÇO//
////////////////////////
function preview() {
  const input = ~~form.quant.value;
  const fuelTypePreview = form.select.value;
  let totalPreview = fuelTypePreview == "Gasolina" ?
  price.gas * input : price.eth * input;
  let Vol = fuelTypePreview == "Gasolina" ?
  vol.gas : vol.eth;

  if (input <= 0) submit.value = "Confirmar";
  else if (input > Vol) submit.value = "Indisponível";
  else submit.value = "Confirmar"
  + " (R$ " + totalPreview.toFixed(2) + ")";
}

//////////////////////////
//ADICIONA INFO DA VENDA//
//////////////////////////
function paragraph(getp, linep) {
  if (traded.textContent == 0)
    getp.lastElementChild.textContent = linep;
  else {
    const newp = document.createElement("p");
    newp.innerText = linep;
    getp.prepend(newp);
  }
  traded.textContent++;
}

///////////////////
//PREÇO POR LITRO//
///////////////////
function selectFuel() {
  const gasSelect = document.getElementById("option-1");
  gasSelect.onclick = function () {
    checked.value = price.gas;
  };

  const ethSelect = document.getElementById("option-2");
  ethSelect.onclick = function () {
    checked.value = price.eth;
  };
}

///////////////////////
//NOVO TOTAL DA BOMBA//
///////////////////////
function changePump(gasPump, ethPump) {
  gasPump.textContent = vol.gas;
  ethPump.textContent = vol.eth;
}

/////////////////
//RESETA INPUTS//
/////////////////
undoValue(); function undoValue() {
  form.quant.value = null;
  vol.gas > vol.eth ? form.quant.max = vol.gas
  : form.quant.max = vol.eth
  preview();
}

//////////////////
//COR QUANT. GAS//
//////////////////
function changeGasColor(Vgas) {
  if (Vgas > gasDefined * 0.5)
    document.querySelector("#quant-gas").style.color
    = "var(--green)";
  else if (Vgas <= gasDefined * 0.5 && Vgas > gasDefined * 0.1)
    document.querySelector("#quant-gas").style.color
    = "var(--orange)";
  else if (Vgas <= gasDefined * 0.1 && Vgas > 0)
    document.querySelector("#quant-gas").style.color
    = "var(--red)";
  else if (Vgas == 0)
    document.querySelector("#quant-gas").style.color
    = "var(--gray)";
}

//////////////////
//COR QUANT. ETH//
//////////////////
function changeEthColor(Veth) {
  if (Veth > ethDefined * 0.5)
    document.querySelector("#quant-eta").style.color
    = "var(--green)";
  else if (Veth <= ethDefined * 0.5 && Veth > ethDefined * 0.1)
    document.querySelector("#quant-eta").style.color
    = "var(--orange)";
  else if (Veth <= ethDefined * 0.1 && Veth > 0)
    document.querySelector("#quant-eta").style.color
    = "var(--red)";
  else if (Veth == 0)
    document.querySelector("#quant-eta").style.color
    = "var(--gray)";
}
