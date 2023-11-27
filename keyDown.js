function handleKeyDown(event) {
  // event.keyCode는 더 이상 권장되지 않습니다.
  // 대신 event.key 또는 event.code를 사용하세요.
  eraseRow();

  const pressedKey = event.key;
  if (isPopup === true) {
    if (pressedKey === 'Enter' || pressedKey === 'Return') {
      previous.innerHTML += '</br>' + fOfX.value + '</br>';
      funcContainer = fOfX.value;
      closePopup();
      rowCount += 2;
    }
  }
  else {
    if (/^\d$/.test(pressedKey)) {
      output.value += pressedKey;
      secret.value += pressedKey;
      previous.innerHTML += pressedKey;
      numCount++;

      if (numCount >= 50) {
        previous.innerHTML += "</br>";
        rowCount++;
        numCount = 0;
      }
      clear.innerHTML = 'C';
    }

    else if (pressedKey === 'Escape') {
      if (isPopup === true) {
        closePopup();
      }
      else {
        output.value = '';
        secret.value = '';

        if (clear.innerHTML === 'C') {
          if (previous.innerHTML !== '') {
            previous.innerHTML += "</br>------------------------------------------------------------------------------------------------------</br>";
            rowCount += 2;
          }
          clear.innerHTML = 'AC';
        }
      }
    }
    else if (pressedKey === '+') {
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

    else if (pressedKey === '-') {
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

    else if (pressedKey === '*') {
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

    else if (pressedKey === '/') {
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

    else if (pressedKey === '.') {
      output.value += '.';
      secret.value += '.';
      previous.innerHTML += '.';
    }

    else if (pressedKey === '%') {
      output.value *= 0.01;
      secret.value *= 0.01;
      previous.innerHTML += "</br>" + output.value;
      rowCount++;
    }

    else if (pressedKey === '_') {
      output.value *= -1;
      secret.value *= -1;
      previous.innerHTML += "</br>" + output.value;
      rowCount++;
    }

    else if (pressedKey === '(') {
      output.value += '(';
      secret.value += '(';
      previous.innerHTML += '(';
      isBracket = true;
    }

    else if (pressedKey === ')') {
      output.value += ')';
      secret.value += ')';
      previous.innerHTML += ')';
      isBracket = false;
    }

    else if (pressedKey === '|') {
      if (secret.value < 0) {
        output.value *= -1;
        secret.value *= -1;
        previous.innerHTML += "</br>" + output.value;
      }
    }

    else if (pressedKey === 'e') {
      output.value = 'e';
      secret.value = '2.7182818284';
      previous.innerHTML += "e"
    }

    else if (pressedKey === '!') {
      secret.value = factorial(secret.value);
      output.value = secret.value;
      previous.innerHTML += "</br>" + secret.value;
    }

    else if (pressedKey === 'i') {
      output.value = 'i';
      // secret.value = '3.1415926535';
      previous.innerHTML += "i"
    }


    else if (pressedKey === '^') {
      output.value += '^';
      secret.value += '**';
      previous.innerHTML += '^';
    }

    else if (pressedKey === '~') {
      cleanNote();
      rowCount = 0;
    }
    else if (pressedKey === 'f') {
      openPopup();
      isPopup = true;
    }
    else if (pressedKey === 'ArrowLeft') {
      calcToggled = false;
      extend();
    }
    else if (pressedKey === 'ArrowRight') {
      calcToggled = true;
      extend();
    }
    else if (pressedKey === 'ArrowDown') {
      output.value = Math.floor(output.value);
      secret.value = Math.floor(secret.value);
      previous.innerHTML += '</br>' + secret.value;
      rowCount++;
    }

    else if (pressedKey === 'ArrowUp') {
      output.value = Math.ceil(output.value);
      secret.value = Math.ceil(secret.value);
      previous.innerHTML += '</br>' + secret.value;
      rowCount++;
    }
    else if (pressedKey === 'Enter' || pressedKey === 'Return') {
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
  }

}

// window 객체에 키 다운 이벤트 리스너 추가
window.addEventListener('keydown', handleKeyDown);