//VALORES MUTÁVEIS
const price = {
  gas: 5.89,
  eth: 3.99,
};

let vol = {
  gas: 1000,
  eth: 1000,
};

///VOLUME FIXO
const fixed = {
  gas: vol.gas,
  eth: vol.eth,
}

///FATURAMENTO E VOLUME INICIAL
let profit = 0, volume = 0;

//QUANTIDADE DAS BOMBAS
const pump = {
  gas: document.getElementById("quant-gas"),
  eth: document.getElementById("quant-eta"),
}

////////////////////
//FUNÇÃO PRINCIPAL//
////////////////////
form.vendido.addEventListener("click", (event) => {
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
    pump.gas.textContent = vol.gas;
    changeGasColor(vol.gas);
  } else {
    if (vol.eth <= 0 || Liters > vol.eth) return;
    vol.eth -= Liters;
    pump.eth.textContent = vol.eth;
    changeEthColor(vol.eth);
  }

  //VOLUME E FATURAMENTO
  profit += Number(total);
  document.getElementById("faturamento").textContent =
  profit.toFixed(2);

  volume += Liters;
  document.getElementById("volume").textContent = volume;

  //EXIBIR COMPRA EXECUTADA
  let linep = fuelType + " — " + Liters + "L"
  + " — "+ "R$ " + total.toFixed(2);
  paragraph(linep);

  //RESETA INPUT QUANTIDADE/L E BOTÃO CONFIRMAR
  undoValue();
  
});

///////////////////
//PREÇO POR LITRO//
///////////////////
form.preco.value = price.gas;
selectFuel();
function selectFuel() {
  document.getElementById("option-1").onclick =
  () => form.preco.value = price.gas;
  document.getElementById("option-2").onclick =
  () => form.preco.value = price.eth;
}

///////////////////////
//NOVO TOTAL DA BOMBA//
///////////////////////
changePump(pump.gas, pump.eth);
function changePump(gas, eth) {
  gas.textContent = vol.gas;
  eth.textContent = vol.eth;
}

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

  if (input <= 0) form.vendido.value = "Confirmar";
  else if (input > Vol) form.vendido.value = "Indisponível";
  else form.vendido.value = "Confirmar"
  + " (R$ " + totalPreview.toFixed(2) + ")";
}

//////////////////////////
//ADICIONA INFO DA VENDA//
//////////////////////////
const traded = document.getElementById("quant-vendas");
function paragraph(linep) {
  if (traded.textContent == 0)
    document.getElementById("purchases")
    .lastElementChild.textContent = linep;
  else {
    const newp = document.createElement("p");
    newp.innerText = linep;
    document.getElementById("purchases").prepend(newp);
  }
  traded.textContent++;
}

/////////////////
//RESETA INPUTS//
/////////////////
undoValue();
function undoValue() {
  form.quant.value = null;
  vol.gas > vol.eth ? form.quant.max = vol.gas
  : form.quant.max = vol.eth
  preview();
}

//////////////////
//COR QUANT. GAS//
//////////////////
function changeGasColor(Vgas) {
  if (Vgas > fixed.gas * 0.5)
    document.querySelector("#quant-gas").style.color
    = "var(--green)";
  else if (Vgas <= fixed.gas * 0.5 && Vgas > fixed.gas * 0.1)
    document.querySelector("#quant-gas").style.color
    = "var(--orange)";
  else if (Vgas <= fixed.gas * 0.1 && Vgas > 0)
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
  if (Veth > fixed.eth * 0.5)
    document.querySelector("#quant-eta").style.color
    = "var(--green)";
  else if(Veth <= fixed.eth * 0.5 && Veth > fixed.eth * 0.1)
    document.querySelector("#quant-eta").style.color
    = "var(--orange)";
  else if (Veth <= fixed.eth * 0.1 && Veth > 0)
    document.querySelector("#quant-eta").style.color
    = "var(--red)";
  else if (Veth == 0)
    document.querySelector("#quant-eta").style.color
    = "var(--gray)";
}
