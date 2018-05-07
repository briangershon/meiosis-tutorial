/* eslint-disable no-use-before-define, func-names */
/* global React, ReactDOM */

const element = document.getElementById('app');
const model = { label: 'The Counter', value: 0 };

function view(m) {
  return (
    <div>
      <div>{m.label} is at {m.value}.</div>
      <button onClick={increase(1)}>+1</button>
      <button onClick={increase(-1)}>-1</button>
    </div>);
}

function update(value) {
  model.value += value;
  ReactDOM.render(view(model), element);
}

function increase(amount) {
  return function () {
    update(amount);
  };
}

ReactDOM.render(view(model), element);
