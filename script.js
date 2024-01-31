let screen = document.getElementById('display');
let btns = document.querySelectorAll('button');

let operation = '';
let clearScreen;

// Input keyboard functions
screen.addEventListener('keydown', (e) => {
  // Clear input after an invalid input inserted
  if (clearScreen) {
    screen.value = '';
    operation = '';
  }

  clearScreen = false;
  switch (e.key) {
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '0':
      operation += e.key;
      break;

    case '%':
      operation += '/100*';
      break;
    case '+':
      operation += '+';
      break;
    case '-':
      operation += '-';
      break;
    case '*':
      operation += '*';
      break;
    case '/':
      operation += '/';
      break;
    case '(':
      operation += '(';
      break;
    case ')':
      operation += ')';
      break;
    case 'Backspace': {
      operation = operation.slice(0, -1);
      break;
    }
    case 'Enter': {
      try {
        operation = eval(operation).toString();
        // Shrink down result if number is greater than 15 digits
        if (operation.length > 15) {
          operation = parseInt(operation).toExponential(10).toString();
        }
        screen.value = numberWithCommas(operation);
      } catch (err) {
        screen.value = 'error';
      }
      break;
    }
    case 'Shift':
      break;
    default:
      e.preventDefault();
      screen.value = '(invalid input)';
      clearScreen = true;
  }
});

// Button click functions
for (button of btns) {
  // Numbers
  if (button.classList.contains('number')) {
    button.addEventListener('click', (e) => {
      screen.value += e.target.value;
      operation += e.target.value;
    });
  }
  // Functions
  else if (button.classList.contains('function')) {
    button.addEventListener('click', (e) => {
      // Percentage
      if (e.target.value === '%') {
        screen.value += e.target.value;
        operation += '/100*';
      }
      // Power
      else if (e.target.value === '**') {
        screen.value += '^';
        operation += e.target.value;
      }
      // Other functions
      else {
        screen.value += e.target.innerText;
        operation += e.target.value;
      }
    });
  }
  // Clear screen
  else if (button.value === 'CE') {
    button.addEventListener('click', () => {
      screen.value = '';
      operation = '';
    });
  }
  // Delete character
  else if (button.value === 'delete') {
    button.addEventListener('click', () => {
      screen.value = screen.value.slice(0, -1);
      operation = operation.slice(0, -1);
    });
  }
  // Equal
  else if (button.value === '=') {
    button.addEventListener('click', () => {
      try {
        operation = eval(operation).toString();
        // Shrink down result if number is greater than 15 digits
        if (operation.length > 15) {
          operation = parseInt(operation).toExponential(10).toString();
        }
        screen.value = numberWithCommas(operation);
      } catch (err) {
        screen.value = 'error';
      }
    });
  }
}

// Formmat number with commas
function numberWithCommas(x) {
  let parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}
