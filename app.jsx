/* eslint-disable no-use-before-define, func-names */
/* global React, ReactDOM */

function createView(updateFn) {
  function increase(amount) {
    return function () {
      updateFn(amount);
    };
  }

  function view(m) {
    return (
      <div>
        <div>{m.label} is at {m.value}.</div>
        <button onClick={increase(1)}>+1</button>
        <button onClick={increase(-1)}>-1</button>
        <button onClick={increase(5)}>+5</button>
        <button onClick={increase(-5)}>-5</button>
      </div>);
  }
  return view;
}

const model = { label: 'The Counter', value: 0 };
const element = document.getElementById('app');
let view;

function update(value) {
  model.value += value;
  ReactDOM.render(view(model), element);
}

view = createView(update);
ReactDOM.render(view(model), element);
