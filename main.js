let calcToggled = false;
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
function cleanNote(){
  previous.innerHTML = '';
}
function extend(){
  calcToggled = !calcToggled;
  extendedCalc.style.display = calcToggled ? 'block' : 'none';

  arrowImgLeft.style.display = calcToggled ? 'none' : 'block';
  
  arrowImgRight.style.display = calcToggled ? 'block' : 'none';
}


document.addEventListener('DOMContentLoaded', function () {

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
        previous.innerHTML += "</br>------------------------------------------------------</br>";
        rowCount += 2;
      }
      }
      // 0~9 buttons
      else if (/^\d$/.test(buttonText)) {
        output.value += buttonText;
        secret.value += buttonText;
        previous.innerHTML += buttonText;
        numCount++;
        if (numCount >= 36){
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
        output.value = '';
        secret.value += '+';
        previous.innerHTML += "</br>+</br>"
        rowCount += 2;
      }

      else if (buttonText === '-'){
        output.value = '';
        secret.value += '-';
        previous.innerHTML += "</br>-</br>"
        rowCount += 2;
      }

      else if (buttonText === '×'){
        output.value = '';
        secret.value += '*';
        previous.innerHTML += "</br>×</br>"
        rowCount += 2;
      }

      else if (buttonText === '÷'){
        output.value = '';
        secret.value += '/';
        previous.innerHTML += "</br>÷</br>"
        rowCount += 2;
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
          rowCount += 2;
        } catch (error) {
          secret.value = 'Error';
          output.value = 'Error';
          previous.innerHTML += '</br>Error</br>';
        }
      }

      else {
        secret.value += buttonText;
        output.value += buttonText;
        clear.innerHTML = 'C';
      }
    });
  });
});