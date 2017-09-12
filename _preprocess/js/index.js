import '../sass/main.scss';

function component() {
  var element = document.createElement('div');

  element.innerHTML = "Hello yeah!";

  return element;
}

document.body.appendChild(component());