import React from 'react';

export default class QuestionOption extends React.Component {
  handleDeleteQuestionOption = (event) => {
    event.preventDefault();
    this.props.handleDeleteQuestionOption(this.props.arrayIndex);
  };

  handleChange = (event) => {
    event.preventDefault();
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.props.questionOption[name] = value;
    console.log('OPTION');
    console.log(name);
    console.log(value);
    this.props.handleUpdateQuestionOptions();
  };

  render() {
    console.log("RENDER");
    console.log(this.props.questionOption.is_correct);
    return (
      <div className="form-check col-md-offset-2">
        <label className="form-check-label">
          <input className="form-check-input"
                 type="checkbox"
                 name="is_correct"
                 checked={this.props.questionOption.is_correct}
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
