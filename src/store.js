import { extendObservable, action, useStrict, autorun } from 'mobx';
import uuid from 'uuid/v1';

export class TodoModel {
  constructor(title = 'new todo', completed = false) {
    this.id = uuid();
    this.title = title;
    this.completed = completed;
    this.timestamp = new Date();
  }
}

useStrict();

export default class TodoStore {
  id = 'todoStore';
  localStorage = null;

  constructor(initialState = []) {
    extendObservable(this, {
      todos: initialState,

      get completed() {
        return this.todos.filter(t => t.completed);
      },

      get uncompleted() {
        return this.todos.filter(t => !t.completed);
      },

      loadFromLocal: action('LOAD FROM LOCALSTORAGE', () => {
        let dataFromLocalStorage = JSON.parse(
          this.localStorage.getItem(this.id)
        );
        this.todos = dataFromLocalStorage;
      }),

      addTodo: action('ADD TODO', title => {
        this.todos = [...this.todos, new TodoModel(title)];
      }),

      removeTodo: action('REMOVE TODO', todoToRemove => {
        this.todos.splice(this.todos.indexOf(todoToRemove), 1);
      }),

      removeAllCompleted: action('REMOVE ALL COMPLETED', () => {
        this.todos = this.uncompleted;
      }),

      renameTodo: action('RENAME TODO', (todoToRename, newTitle) => {
        this.todos = this.todos.map(
          todo =>
            todo.id === todoToRename.id
              ? { ...todoToRename, title: newTitle }
              : todo
        );
      }),

      toggleTodo: action('TOGGLE TODO', todoToUpdate => {
        this.todos = this.todos.map(
          todo =>
            todo.id === todoToUpdate.id
              ? { ...todoToUpdate, completed: !todoToUpdate.completed }
              : todo
        );
      })
    });

    this.setUpLocalStorage();

    // use autorun to sync the localStorage
    autorun(() => {
      if (this.localStorage != null) {
        this.localStorage.setItem(this.id, JSON.stringify(this.todos.peek()));
      }
    });
  }

  setUpLocalStorage() {
    if (window.localStorage) {
      if (window.localStorage[this.id] == null) {
        this.localStorage = window.localStorage;
        this.localStorage.setItem(this.id, JSON.stringify(this.todos.peek()));
      } else {
        this.localStorage = window.localStorage;
        this.loadFromLocal();
      }
    } else {
      alert('Your Browser does not support LocalStorage!');
    }
  }
}
