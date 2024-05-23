let screen = document.getElementById('display');
let btns = document.querySelectorAll('button');

let operation = '';
let clearScreen;

// Button click functions
for (button of btns) {
  // Numbers
  if (button.classList.contains('number')) {
    button.addEventListener('click', (e) => {
      screen.innerText += e.target.value;
      operation += e.target.value;
    });
  }
  // Functions
  else if (button.classList.contains('function')) {
    button.addEventListener('click', (e) => {
      // Percentage
      if (e.target.value === '%') {
        screen.innerText += e.target.value;
        operation += '/100*';
      }
      // Power
      else if (e.target.value === '**') {
        screen.innerText += '^';
        operation += e.target.value;
      }
      // Other functions
      else {
        screen.innerText += e.target.innerText;
        operation += e.target.value;
      }
    });
  }
  // Clear screen
  else if (button.value === 'CE') {
    button.addEventListener('click', () => {
      screen.innerText = '';
      operation = '';
    });
  }
  // Delete character
  else if (button.value === 'delete') {
    button.addEventListener('click', () => {
      if (screen.innerText.length > 0) {
        screen.innerText = screen.innerText.slice(0, -1);
        operation = operation.slice(0, -1);
      } else screen.innerText = '';
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
        screen.innerText = numberWithCommas(operation);
      } catch (err) {
        screen.innerText = 'error';
      }
    });
  }
}

// Format number with commas
function numberWithCommas(x) {
  let parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}
