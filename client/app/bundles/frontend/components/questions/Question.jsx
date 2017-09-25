import React from 'react';
import QuestionOption from '../questions/QuestionOption';

export default class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question_options: this.props.question_options_attributes
    };
  }

  componentWillMount() {
    this.addOption();
  }

  addOption = () => {
    const { question_options } = this.state;

    this.setState({ question_options: question_options.concat({ answer_text: '', is_correct: false }) });
  };

  deleteQuestionOption = (questionOptionIndex) => {
    let newQuesionOptionsList = this.state.question_options;
    newQuesionOptionsList.splice(questionOptionIndex, 1);

    this.props.handleUpdateQuestion(newQuesionOptionsList, 'question_options_attributes', this.props.arrayIndex);
  };

  handleUpdateQuestionOptions = (name, value, questionOptionIndex) => {
    let newQuesionOptionsList = this.state.question_options;
    newQuesionOptionsList[questionOptionIndex][name] = value;

    this.props.handleUpdateQuestion(newQuesionOptionsList, 'question_options_attributes', this.props.arrayIndex);
  };

  handleInputChange = (event) => {
    event.preventDefault();
    const target = event.target;

    this.props.handleUpdateQuestion(target.value, target.name, this.props.arrayIndex);
  };

  handleDeleteQuestion = (event) => {
    event.preventDefault();
    this.props.handleDeleteQuestion(this.props.arrayIndex);
  };

  render() {
    let question_options = this.state.question_options.map((questionOption, index) => <QuestionOption key={index}
                                                                                          questionOption={questionOption}
                                                                                          arrayIndex={index}
                                                                                          handleDeleteQuestionOption={this.deleteQuestionOption}
                                                                                          handleUpdateQuestionOptions={this.handleUpdateQuestionOptions} {...questionOption} />);
    return (
      <div className="row">
        <div className="form-group col-md-offset-1">
          <label htmlFor="questionName">Pytanie</label>
          <div className="form-group">
            <div className="col-md-10">
              <input type="text"
                     name="text"
                     className="form-control"
                     placeholder="Pytanie"
                     value={this.props.text}
                     onChange={(e) => this.handleInputChange(e)}>
              </input>
            </div>
            <button onClick={(e) => this.handleDeleteQuestion(e)} className='btn btn-danger'>Usuń pytanie</button>
          </div>
        </div>
        {question_options}
        <button type="button" onClick={() => this.addOption()} className='btn btn-info col-md-offset-2'>+</button>
      </div>
    );
  }
};
