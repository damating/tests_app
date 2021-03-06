import React from 'react';

export default class QuestionOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_correct: this.props.is_correct,
      answer_text: this.props.answer_text
    };
  }

  handleDeleteQuestionOption = (event) => {
    event.preventDefault();
    this.props.handleDeleteQuestionOption(this.props.arrayIndex);
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;    

    let returnObj = {};
    returnObj[name] = value;
    this.setState(returnObj);    

    this.props.handleUpdateQuestionOptions(name, value, this.props.arrayIndex);
  };

  render() {
    return (
      <div className="form-check col-md-offset-2">
        <label className="form-check-label">
          <input className="form-check-input"
                 type="checkbox"
                 name="is_correct"
                 checked={this.state.is_correct}
                 onChange={(e) => this.handleChange(e)}>
          </input>
          <input type="text"
                 name="answer_text"
                 className="form-control"
                 placeholder="Odpowiedź"
                 value={this.props.answer_text}
                 onChange={(e) => this.handleChange(e)}>
          </input>
        </label>
        <button onClick={(e) => this.handleDeleteQuestionOption(e)} className='btn btn-danger'>-</button>
      </div>
    );
  }
};
