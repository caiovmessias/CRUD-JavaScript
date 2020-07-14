window.addEventListener('load', start);

var names = [];
var inputName = null;
var button = null;
var inputNameValue = null;
var listNames = null;
var currentIndex = true;
var isEditing = false;

function start() {
  var form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);

  inputName = document.querySelector('#inputText');
  inputName.addEventListener('keyup', changeText);

  button = document.querySelector('a');
  button.addEventListener('click', buttonClick);

  listNames = document.querySelector('#listNames');

  //render();
}

function handleSubmit(event) {
  event.preventDefault();
}

function changeText(event) {
  if (event.key === 'Enter') {
    if (isEditing) {
      names[currentIndex] = event.target.value;
    } else {
      names.push(event.target.value);
    }

    isEditing = false;
    inputName.value = '';
    render();
  }
  inputNameValue = event.target.value;
}

function buttonClick(event) {
  if (isEditing) {
    names[currentIndex] = inputNameValue;
  } else {
    names.push(inputNameValue);
  }
  inputName.value = '';
  render();
}

function render() {
  function createButton(index) {
    function removeName() {
      names.splice(index, 1);
      render();
    }

    var i = document.createElement('i');
    i.textContent = 'delete_forever';
    i.classList.add('small');
    i.classList.add('material-icons');
    i.addEventListener('click', removeName);
    return i;
  }

  function createSpan(name, index) {
    function editName() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }

    var span = document.createElement('span');
    span.textContent = name;
    span.addEventListener('click', editName);
    return span;
  }

  listNames.innerHTML = '';

  var table = document.createElement('table');
  table.classList.add('highlight');

  var thead = document.createElement('thead');

  var tr = document.createElement('tr');

  var thDelete = document.createElement('th');
  thDelete.textContent = '';

  var thName = document.createElement('th');
  thName.textContent = 'Nomes Cadastrados';

  var tBody = document.createElement('tbody');
  for (var i = 0; i < names.length; i++) {
    var tr1 = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');

    var span = createSpan(names[i], i);
    var button = createButton(i);

    td1.appendChild(button);
    td2.appendChild(span);
    tr1.appendChild(td2);
    tr1.appendChild(td1);
    tBody.appendChild(tr1);
  }

  tr.appendChild(thName);
  tr.appendChild(thDelete);
  thead.appendChild(tr);
  table.appendChild(thead);
  table.appendChild(tBody);
  listNames.appendChild(table);
}
