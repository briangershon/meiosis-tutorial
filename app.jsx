/* eslint-disable no-use-before-define, func-names */
/* global React, ReactDOM */

function stream(initial) {
  const mapFunctions = [];
  function createdStream(value) {
    mapFunctions.forEach((fn) => {
      fn(value);
    });
  }
  createdStream.map = function (mapFunction) {
    let newInitial;
    if (initial !== undefined) {
      // call map with initial value
      newInitial = mapFunction(initial);
    }
    const newStream = stream(newInitial);

    mapFunctions.push((value) => {
      newStream(mapFunction(value));
    });

    return newStream;
  };
  return createdStream;
}

function scan(accumulator, initial, sourceStream) {
  const newStream = stream(initial);
  let accumulated = initial;

  sourceStream.map((value) => {
    accumulated = accumulator(accumulated, value);
    newStream(accumulated);
    return null;
  });

  return newStream;
}

function createView(updateFn) {
  function oper(obj) {
    return function () {
      updateFn(obj);
    };
  }

  function view(m, label) {
    return (
      <div>
        <div>{label} is at {m}.</div>
        <button onClick={oper({ oper: 'add', value: 1 })}>+1</button>
        <button onClick={oper({ oper: 'times', value: 2 })}>*2</button>
        <button onClick={oper({ oper: 'add', value: 5 })}>+5</button>
        <button onClick={oper({ oper: 'add', value: -5 })}>-5</button>
      </div>);
  }
  return view;
}

const update = stream();
const view = createView(update);

const models = scan((model, obj) => {
  if (obj.oper === 'add') {
    return model + obj.value;
  } else if (obj.oper === 'times') {
    return model * obj.value;
  }
  return model;
}, 0, update);

const element = document.getElementById('app');

function render(viewFromModel) {
  ReactDOM.render(viewFromModel, element);
}

models
  .map(value => view(value, 'The Counter'))
  .map(render);
