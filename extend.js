document.addEventListener('DOMContentLoaded', function () {

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      const buttonText = button.innerText;


      if (buttonText === 'e') {
        output.value = 'e';
        secret.value = '2.718281828459';
        previous.innerHTML += "e"
      }

      
    });
  });
});