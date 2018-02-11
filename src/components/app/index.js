import React, { Component } from 'react';
import TodoStore from '../../store';
import TodoList from '../todolist';
import './index.css';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <h1>REACTMOBX TODO</h1>
        <div className="App__header">
          <small>
            React + Mobx + LocalStorage + Material Bootstrap |{' '}
            <a href="https://renoiser.github.io/">author</a>
          </small>{' '}
          <br />
          <small>
            Fill the input and press <strong>Add Todo</strong> to start. Click
            on the <strong>todo title</strong> to mark it as{' '}
            <strong>'completed'</strong>.
          </small>
        </div>

        <TodoList store={new TodoStore()} />
      </div>
    );
  }
}

export default App;
