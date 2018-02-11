import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Todo from '../todo';

const TodoList = observer(
  class TodoList extends Component {
    addTodo = e => {
      e.preventDefault();
      let inputValue = this.refs.input.value || 'new todo';
      this.props.store.addTodo(inputValue);
      this.refs.input.value = '';
    };

    render() {
      let completedPercentage = Math.floor(
        this.props.store.completed.length / this.props.store.todos.length * 100
      );

      return (
        <div className="todo-list">
          <div>
            <form className="d-flex" onSubmit={e => this.addTodo(e)}>
              <input
                ref="input"
                type="text"
                className="form-control"
                id="exampleInputEmail1"
              />
              <button type="submit" className="btn btn-raised btn-primary">
                ADD TODO
              </button>
            </form>
          </div>
          <div className="todo-list__group todo-list__group--uncompleted">
            <div className="list-group">
              {this.props.store.uncompleted.map((todo, index) => (
                <Todo
                  key={index}
                  {...todo}
                  onTitleClick={() => this.props.store.toggleTodo(todo)}
                  onRename={value => this.props.store.renameTodo(todo, value)}
                  onRemove={() => this.props.store.removeTodo(todo)}
                />
              ))}
            </div>
          </div>

          {this.props.store.completed.length > 0 && (
            <div className="todo-list__group todo-list__group--completed">
              <div>
                <h4>
                  <strong>
                    Completed <small>({completedPercentage}%)</small>
                  </strong>
                </h4>

                <h6>
                  click on a completed element to revert |{' '}
                  <button
                    className="btn btn-danger"
                    onClick={this.props.store.removeAllCompleted}
                  >
                    remove all completed
                  </button>{' '}
                </h6>
                {this.props.store.completed.map((todo, index) => (
                  <Todo
                    key={index}
                    {...todo}
                    onTitleClick={() => this.props.store.toggleTodo(todo)}
                    onRemove={() => this.props.store.removeTodo(todo)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }
  }
);

export default TodoList;
