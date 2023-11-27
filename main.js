let calcToggled = false;
let isBracket = false;
let isPopup = false;
let isRoot = false;
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
const fOfX = document.getElementById("fOfX");
const popup = document.getElementById('funcPopup');
const radDeg = document.getElementById('radBtn');
let funcContainer = '';

function openPopup() {
  popup.style.zIndex = '2';
  popup.style.animation = 'scaleIn 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
  popup.style.display = 'block';
}
function closePopup() {
  isPopup = false;
  popup.style.animation = 'scaleOut 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
  setTimeout(function () {
    popup.style.display = 'none';
  }, 200);
}

function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

function cleanNote() {
  previous.innerHTML = '';
  rowCount = 0;
}

function saveBtn() {
  previous.innerHTML += '</br>' + fOfX.value + '</br>';
  funcContainer = fOfX.value;
  closePopup();
  rowCount += 2;

}

function extend() {
  calcToggled = !calcToggled;
  extendedCalc.style.display = calcToggled ? 'block' : 'none';

  arrowImgLeft.style.display = calcToggled ? 'none' : 'block';

  arrowImgRight.style.display = calcToggled ? 'block' : 'none';
}


function eraseRow() {
  if (rowCount >= 20) {
    const lines = previous.innerHTML.split('<br>');

    // remove first, second lines
    lines.splice(0, 2);
    //unsplit 
    previous.innerHTML = lines.join('<br>');

    rowCount -= 2;
  }
}


document.addEventListener('DOMContentLoaded', function () {

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      const buttonText = button.innerText;
      eraseRow();

      if (buttonText === 'AC') {
        output.value = '';
        secret.value = '';
        clear.innerHTML = 'AC';
      }

      else if (buttonText === 'C') {
        output.value = '';
        secret.value = '';
        clear.innerHTML = 'AC';
        if (previous.innerHTML !== '') {
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

        if (numCount >= 50) {
          previous.innerHTML += "</br>";
          rowCount++;
          numCount = 0;
        }
        clear.innerHTML = 'C';
      }

      else if (buttonText === '+/-') {
        output.value *= -1;
        secret.value *= -1;
        previous.innerHTML += "</br>" + output.value;
        rowCount++;
      }

      else if (buttonText === '%') {
        output.value *= 0.01;
        secret.value *= 0.01;
        previous.innerHTML += "</br>" + output.value;
        rowCount++;
      }

      else if (buttonText === '+') {
        if (isBracket === true) {
          output.value += '+';
          previous.innerHTML += "+";
        }
        else {
          output.value = '';
          previous.innerHTML += "</br>+</br>"
          rowCount += 2;
        }
        secret.value += '+';
      }

      else if (buttonText === '-') {
        if (isBracket === true) {
          output.value += '-';
          previous.innerHTML += "-";
        }
        else {
          output.value = '';
          previous.innerHTML += "</br>-</br>"
          rowCount += 2;
        }
        secret.value += '-';
      }

      else if (buttonText === '×') {
        if (isBracket === true) {
          output.value += '×';
          previous.innerHTML += "×";
        }
        else {
          output.value = '';
          previous.innerHTML += "</br>×</br>"
          rowCount += 2;
        }
        secret.value += '*';
      }

      else if (buttonText === '÷') {
        if (isBracket === true) {
          output.value += '÷';
          previous.innerHTML += "÷";
        }
        else {
          output.value = '';
          previous.innerHTML += "</br>÷</br>"
          rowCount += 2;
        }
        secret.value += '/';
      }

      else if (buttonText === '.') {
        output.value += '.';
        secret.value += '.';
        previous.innerHTML += '.';
      }

      else if (buttonText === '=') {
        if (isRoot === true) {
          output.value += ')';
          secret.value += ')';
          previous.innerHTML += ')';
          isRoot = false;
        }
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

      if (buttonText === '|x|') {
        if (secret.value < 0) {
          output.value *= -1;
          secret.value *= -1;
          previous.innerHTML += "</br>" + output.value;
          rowCount++;
        }
      }

      else if (buttonText === 'x^2') {
        output.value **= 2;
        secret.value **= 2;
        previous.innerHTML += "^2</br>" + output.value;
        rowCount++;
      }

      else if (buttonText === 'x^y') {
        output.value += '^';
        secret.value += '**';
        previous.innerHTML += '^';
      }

      else if (buttonText === 'f(x)') {
        openPopup();
        isPopup = true;
      }


      else if (buttonText === 'x!') {
        secret.value = factorial(secret.value);
        output.value = secret.value;
        previous.innerHTML += "</br>" + secret.value;
      }

      else if (buttonText === 'π') {
        output.value = 'π';
        secret.value = '3.1415926535';
        previous.innerHTML += "</br>π"
        rowCount++;
      }

      else if (buttonText === 'e') {
        output.value = 'e';
        secret.value = '2.7182818284';
        previous.innerHTML += "</br>e"
        rowCount++;
      }

      else if (buttonText === '(') {
        output.value += '(';
        secret.value += '(';
        previous.innerHTML += '(';
        isBracket = true;
      }

      else if (buttonText === ')') {
        output.value += ')';
        secret.value += ')';
        previous.innerHTML += ')';
        isBracket = false;
      }

      else if (buttonText === '⌊x⌋') {
        secret.value = Math.floor(secret.value);
        output.value = secret.value;
        previous.innerHTML += '</br>' + secret.value;
        rowCount++;
      }

      else if (buttonText === '⌈x⌉') {
        secret.value = Math.ceil(secret.value);
        output.value = secret.value;
        previous.innerHTML += '</br>' + secret.value;
        rowCount++;
      }

      else if (buttonText === '1/x') {
        output.value = 1 / output.value;
        secret.value = 1 / secret.value;
        previous.innerHTML += '</br>' + secret.value;
        rowCount++;
      }

      else if (buttonText === 'sin') {
        secret.value = Math.sin(secret.value);
        output.value = secret.value;
        previous.innerHTML += '</br>' + secret.value;
        rowCount++;
      }

      else if (buttonText === 'sin^-1') {
        secret.value = Math.asin(secret.value);
        output.value = secret.value;
        previous.innerHTML += '</br>' + secret.value;
        rowCount++;
      }

      else if (buttonText === 'cos') {
        secret.value = Math.cos(secret.value);
        output.value = secret.value;
        previous.innerHTML += '</br>' + secret.value;
        rowCount++;
      }

      else if (buttonText === 'cos^-1') {
        secret.value = Math.acos(secret.value);
        output.value = secret.value;
        previous.innerHTML += '</br>' + secret.value;
        rowCount++;
      }

      else if (buttonText === 'tan') {
        secret.value = Math.tan(secret.value);
        output.value = secret.value;
        previous.innerHTML += '</br>' + secret.value;
        rowCount++;
      }

      else if (buttonText === 'tan^-1') {
        secret.value = Math.atan(secret.value);
        output.value = secret.value;
        previous.innerHTML += '</br>' + secret.value;
        rowCount++;
      }

      else if (buttonText === 'ln') {
        secret.value = Math.log(secret.value);
        output.value = secret.value;
        previous.innerHTML += '</br>' + secret.value;
        rowCount++;
      }

      else if (buttonText === 'log') {
        secret.value = Math.log(secret.value) / 10;
        output.value = secret.value;
        previous.innerHTML += '</br>' + secret.value;
        rowCount++;
      }

      else if (buttonText === '2√x') {
        output.value = Math.sqrt(output.value);
        secret.value = Math.sqrt(secret.value);
        previous.innerHTML += '</br>' + secret.value;
        rowCount++;
      }

      else if (buttonText === 'y√x') {
        isRoot = true;
        output.value = '';
        secret.value += '**(1/';
        previous.innerHTML += '</br>' + secret.value;
        rowCount++;
      }

      else if (buttonText === '10^x'){
        secret.value = 10 ** secret.value;
        output.value = secret.value;
        previous.innerHTML += '</br>' + secret.value;
        rowCount++;
      }

      else if (buttonText === 'Rad'){
        secret.value *= (Math.PI / 180);
        output.value = secret.value;
        previous.innerHTML += '</br>'+ secret.value;
        radDeg.innerHTML = 'Deg';
      }

      else if (buttonText === 'Deg'){
        secret.value *= (180 / Math.PI);
        output.value = secret.value;
        previous.innerHTML += '</br>'+ secret.value;
        radDeg.innerHTML = 'Rad';
      }
    });
  });
});
