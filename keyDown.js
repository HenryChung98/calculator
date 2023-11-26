function handleKeyDown(event) {
  // event.keyCode는 더 이상 권장되지 않습니다.
  // 대신 event.key 또는 event.code를 사용하세요.
  const pressedKey = event.key;

  if (/^\d$/.test(pressedKey)) {
    output.value += pressedKey;
    secret.value += pressedKey;
    previous.innerHTML += pressedKey;
    clear.innerHTML = 'C';
  }

  else if (pressedKey === 'Escape') {
    output.value = '';
    secret.value = '';
    
    if (clear.innerHTML === 'C') {
      if (previous.innerHTML !== ''){
      previous.innerHTML += "</br>------------------------------------------------------</br>";
      rowCount += 2;
    }
      clear.innerHTML = 'AC';
    }
  }
  else if (pressedKey === '+'){
    output.value = '';
    secret.value += '+';
    previous.innerHTML += "</br>+</br>"
    rowCount += 2;
  }
  
  else if (pressedKey === '-'){
    output.value = '';
    secret.value += '-';
    previous.innerHTML += "</br>-</br>"
    rowCount += 2;
  }

  else if (pressedKey === '*'){
    output.value = '';
    secret.value += '*';
    previous.innerHTML += "</br>×</br>"
    rowCount += 2;
  }

  else if (pressedKey === '/'){
    output.value = '';
    secret.value += '/';
    previous.innerHTML += "</br>÷</br>"
    rowCount += 2;
  }

  else if (pressedKey === '.'){
    output.value += '.';
    secret.value += '.';
    previous.innerHTML += '.';
  }

  else if (pressedKey === '%'){
    output.value *= 0.01;
    secret.value *= 0.01;
    previous.innerHTML += "</br>" + output.value;
    rowCount++;
  }

  else if (pressedKey === '_'){
    output.value *= -1;
    secret.value *= -1;
    previous.innerHTML += "</br>" + output.value;
    rowCount++;
  }

  else if (pressedKey === 'Enter' || pressedKey === 'Return'){
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

  else if (pressedKey === '~'){
    cleanNote();
  }

  else if (pressedKey === 'ArrowLeft'){
    calcToggled = false;
    extend();
  }
  else if (pressedKey === 'ArrowRight'){
    calcToggled = true;
    extend();
  }
}

// window 객체에 키 다운 이벤트 리스너 추가
window.addEventListener('keydown', handleKeyDown);