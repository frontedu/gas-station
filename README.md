# Filling station LSW II
2nd JavaScript project for Instituto Federal do Triângulo Mineiro.

## General infos
* [📐 Usage/Customizing](#Usage)
* [📃 Project proposal (pt-BR)](#project-proposal)
* [✒️ See the prototype on Figma](https://www.figma.com/file/zKg0S3bWPGTMGzunwCxTRb/)

## Usage
These are the values that can be changed at any time as you need them:

Fuel Type | Price (R$) | Volume (L)
--------- | ---------- | ----------
Gasoline  | 5.89       | 1000
Ethanol   | 3.99       | 1000

as you can see in ```script.js``` file:
```javascript
const price = {
  gas: 5.89,
  eth: 3.99,
};

let vol = {
  gas: 1000,
  eth: 1000,
};
```

You can also easily change the default colors in the ```style.css``` file:
```css
:root {
  --main: #adff00;
  --bg: #000;
  --light: #f2f2f7;
  --dark: #2e2e2e;
  --darkblack: #191919;
  --black: #121212;
  --green: #adff00;
  --orange: #ff9500;
  --red: #ff3b30;
  --gray: #c7c7cc;
  --darkblue: rgba(0, 240, 255, 0.1);
  --darkyellow: rgba(255, 245, 0, 0.1);
}
```

## Project proposal
### Atividade Avaliativa II
Esta é a proposta de segunda avaliação da disciplina de Linguagem de Script para WEB. Ela deve ser realizada individualmente. 

### Especificação da atividade
Desenvolver uma aplicação WEB para a visualização em tempo real da situação de uma bomba de combustível. Você vai desenvolver uma página WEB utilizando HTML5, CSS3 e JavaScript.

#### A página possui três seções bem definidas:
1. Visão geral da bomba: Apresenta a quantidade, em litros, disponível que aquela bomba opera. No exemplo, a Bomba opera com gasolina e etanol e iniciou o dia com ```1000L``` de cada tipo de combustível.
2. Compra: Serve para registrar as compras do dia em litros.
3. Resumo do dia: Mostra a relação das vendas realizadas no dia.

#### Para desenvolver o sistema, considere que na seção de Compra:
- O preço do etanol e gasolina já vão estar definidos por padrão. Portanto, não podem ser editáveis. No exemplo, a gasolina possui o valor por litro igual a ```R$ 5,89``` e o etanol ```R$ 3,99```.
- O campo quantidade em litros deve receber um valor numérico informando a quantidade de litros da compra.

#### Ao clicar no botão confirmar algumas ações devem ocorrer na tela:
- O valor dos litros da seção “Visão Geral da Bomba” devem ser atualizados.
- O valor contido em “Total” deve ser atualizado.
- Além disso, na seção “Resumo do dia” deve ser apresentada uma listagem com o resumo da compra da seguinte forma:
```
<nome combustível> - <quantidade em litros> - R$ <valor da compra>
```

#### Na seção Visão Geral da Bomba deve ser considerado que:
- Caso a bomba possua uma quantidade maior ou igual a ```500``` o valor do total de litros deve ser apresentado em verde; se a quantidade estiver entre ```100``` e ```500``` esse valor deve ser apresentado em laranja; se for menor que ```100``` deve ser apresentado em vermelho; e se for igual a ```0``` em cinza.
- Uma compra só pode ser realizada se a quantidade de litros pretendida for inferior ou igual à disponível, caso contrário, uma mensagem deve ser apresentada ao usuário:
```
Impossível concluir a venda por falta de combustível.
```