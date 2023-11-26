let calcToggled = false;
let isBracket = false;
let numCount = 0;
let rowCount = 0;
const buttons = document.querySelectorAll('td');
const output = document.getElementById('output');
const clear = document.getElementById('clearBtn');
const secret = document.getElementById('secret');
const previous = document.getElementById('previous');
const extendedCalc = document.getElementById('extendedCalc');
const arrowImgLeft = document.querySelector('.arrowImg.left');
const arrowImgRight = document.querySelector('.arrowImg.right');


function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

function cleanNote(){
  previous.innerHTML = '';
  rowCount = 0;
}


function extend(){
  calcToggled = !calcToggled;
  extendedCalc.style.display = calcToggled ? 'block' : 'none';

  arrowImgLeft.style.display = calcToggled ? 'none' : 'block';
  
  arrowImgRight.style.display = calcToggled ? 'block' : 'none';
}


function eraseRow(){
  if (rowCount >= 20){
    const lines = previous.innerHTML.split('<br>');

    // remove first, second lines
    lines.splice(0, 2);
    //unsplit 
    previous.innerHTML = lines.join('<br>');

    rowCount -= 2;
  }
}


document.addEventListener('DOMContentLoaded', function () {
  eraseRow();
  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      const buttonText = button.innerText;


      if (buttonText === 'AC') {
        output.value = '';
        secret.value = '';
        clear.innerHTML = 'AC';
      }

      else if (buttonText === 'C') {
        output.value = '';
        secret.value = '';
        clear.innerHTML = 'AC';
        if (previous.innerHTML !== ''){
        previous.innerHTML += "</br>------------------------------------------------------------------------------------------------------</br>";
        rowCount += 2;
      }
      }
      // 0~9 buttons
      else if (/^\d$/.test(buttonText)) {
        output.value += buttonText;
        secret.value += buttonText;
        previous.innerHTML += buttonText;
        numCount++;

        if (numCount >= 50){
          previous.innerHTML += "</br>";
          rowCount++;
          numCount = 0;
        }
        clear.innerHTML = 'C';
      }

      else if (buttonText === '+/-'){
        output.value *= -1;
        secret.value *= -1;
        previous.innerHTML += "</br>" + output.value;
        rowCount++;
      }

      else if (buttonText === '%'){
        output.value *= 0.01;
        secret.value *= 0.01;
        previous.innerHTML += "</br>" + output.value;
        rowCount++;
      }

      else if (buttonText === '+'){
        if (isBracket === true) {
          output.value += '+';
          previous.innerHTML += "+";
        }
        else{
          output.value = '';
          previous.innerHTML += "</br>+</br>"
          rowCount += 2;
        }
        secret.value += '+';
      }

      else if (buttonText === '-'){
        if (isBracket === true) {
          output.value += '-';
          previous.innerHTML += "-";
        }
        else{
          output.value = '';
          previous.innerHTML += "</br>-</br>"
          rowCount += 2;
        }
        secret.value += '-';
      }

      else if (buttonText === '×'){
        if (isBracket === true) {
          output.value += '×';
          previous.innerHTML += "×";
        }
        else{
          output.value = '';
          previous.innerHTML += "</br>×</br>"
          rowCount += 2;
        }
        secret.value += '*';
      }

      else if (buttonText === '÷'){
        if (isBracket === true) {
          output.value += '÷';
          previous.innerHTML += "÷";
        }
        else{
          output.value = '';
          previous.innerHTML += "</br>÷</br>"
          rowCount += 2;
        }
        secret.value += '/';
      }

      else if (buttonText === '.'){
        output.value += '.';
        secret.value += '.';
        previous.innerHTML += '.';
      }

      else if (buttonText === '=') {
        try {
          output.value = eval(secret.value);
          secret.value = output.value;
          previous.innerHTML += "</br>" + output.value;
          rowCount++;
        } catch (error) {
          secret.value = 'Error';
          output.value = 'Error';
          previous.innerHTML += '</br>Error</br>';
          rowCount += 2;
        }
      }

// ------------------------------extend------------------------------ //

      if (buttonText === '|x|'){
        if (secret.value < 0){
          output.value *= -1;
          secret.value *= -1;
          previous.innerHTML += "</br>" + output.value;
        }
      }

      else if (buttonText === 'x^2'){
        output.value = '';
        secret.value **= 2;
        previous.innerHTML += "^2"
      }

      else if (buttonText === 'x^y'){

      }

      else if (buttonText === 'f(x)'){

      }
      

// -------------might be possible make for keyDown as well...-------------//

      else if (buttonText === 'x!'){
        secret.value = factorial(secret.value);
        output.value = secret.value;
        previous.innerHTML += "</br>" + secret.value;
      }

      else if (buttonText === 'π'){
        output.value = 'π';
        secret.value = '3.1415926535';
        previous.innerHTML += "π"
      }

      else if (buttonText === 'e') {
        output.value = 'e';
        secret.value = '2.7182818284';
        previous.innerHTML += "e"
      }

      else if (buttonText === '('){
        output.value += '(';
        secret.value += '(';
        previous.innerHTML += '(';
        isBracket = true;
      }

      else if (buttonText === ')'){
        output.value += ')';
        secret.value += ')';
        previous.innerHTML += ')';
        isBracket = false;
      }

    });
  });
});