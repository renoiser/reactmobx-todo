import React, { Component } from 'react';
import moment from 'moment';
import './index.css';

export default class Todo extends Component {
  static defaultProps = {
    evaluationTime: 5000
  };

  constructor() {
    super();
    this.state = {
      timestamp: '_',
      editMode: false
    };
  }

  componentDidMount() {
    this.setState({
      timestamp: moment(this.props.timestamp).fromNow()
    });
    this.evaluateTime();
  }

  evaluateTime() {
    this.timeStampInterval = setInterval(() => {
      this.setState({
        timestamp: moment(this.props.timestamp).fromNow()
      });
    }, this.props.evaluationTime);
  }

  componentWillUnmount() {
    clearInterval(this.timeStampInterval);
  }

  setEditMode(e) {
    e.stopPropagation();
    this.setState({
      editMode: true
    });
  }

  removeHandler = e => {
    e.stopPropagation();
    this.props.onRemove();
  };

  renameHandler = () => {
    let value = this.refs.renameInput.value;
    if (value !== '') {
      this.props.onRename(value);
      this.setState({
        editMode: false
      });
    }

    this.setState({
      editMode: false
    });
  };

  render() {
    return (
      <div className="todo animated fadeInUp list-group-item">
        {this.state.editMode && (
          <div className="todo__mode todo__mode--edit">
            <input
              ref="renameInput"
              type="text"
              defaultValue={this.props.title}
              className="form-control"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
            <button
              onClick={this.renameHandler}
              type="button"
              className="btn btn-success"
            >
              Save
            </button>
            <button
              onClick={() => this.setState({ editMode: false })}
              type="button"
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        )}

        {!this.state.editMode && (
          <div
            className="todo__mode todo__mode--read"
            onClick={this.props.onTitleClick}
          >
            <div className="todo__content">
              <i className="material-icons todo__icon">
                {this.props.completed ? 'done' : 'android'}
              </i>

              <strong className="todo__title">{this.props.title}</strong>
              <small className="todo__timestamp">
                ({this.state.timestamp})
              </small>
            </div>

            <div className="todo__controls">
              {!this.props.completed && (
                <i
                  onClick={e => this.setEditMode(e)}
                  className="material-icons"
                >
                  mode_edit
                </i>
              )}

              <i onClick={this.removeHandler} className="material-icons">
                delete
              </i>
            </div>
          </div>
        )}
      </div>
    );
  }
}
