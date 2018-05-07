/* eslint-disable no-use-before-define, func-names */
/* global React, ReactDOM */

function stream() {
  const mapFunctions = [];
  function createdStream(value) {
    mapFunctions.forEach((fn) => {
      fn(value);
    });
  }
  createdStream.map = function (mapFunction) {
    const newStream = stream();

    mapFunctions.push((value) => {
      newStream(mapFunction(value));
    });

    return newStream;
  };
  return createdStream;
}

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

const update = stream();
const view = createView(update);

const element = document.getElementById('app');

function updateModel(value) {
  model.value += value;
  return model;
}

function render(value) {
  ReactDOM.render(value, element);
}

update
  .map(updateModel)
  .map(view)
  .map(render);

ReactDOM.render(view(model), element);
