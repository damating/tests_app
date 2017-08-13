import React from 'react';
import Question from '../questions/Question';

export default class TestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      name: '',
      description: '',
      duration_in_secs: '',
      start_date: '2017-07-20T13:45:00',
      end_date: '2017-07-21T13:45:00'
    };
  }

  componentWillMount() {
    this.addQuestion();
  }

  addQuestion = () => {
    const { questions } = this.state;

    this.setState({ questions: questions.concat({ text: "", question_options_attributes: [] }) });
  };

  deleteQuestion = (questionIndex) => {
    let newQuesionsList = this.state.questions;
    newQuesionsList.splice(questionIndex, 1);

    this.setState({ questions: newQuesionsList });
  };

  updateQuestion = (newValue, fieldName, questionIndex) => {
    let newQuesionsList = this.state.questions;
    newQuesionsList[questionIndex][fieldName] = fieldName === 'question_options_attributes' ? JSON.stringify(newValue) : newValue;

    this.setState({ questions: newQuesionsList });
  };

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: target.value
    });
  };

  sendTest = (event) => {
    event.preventDefault();
    const currentState = this.state;
    const questions = JSON.stringify(currentState.questions);

     $.ajax({
      url: '/tests',
      type: 'POST',
      dataType: 'JSON',
      data: {
        test: {
          group_id: this.props.groupId,
          name: currentState.name,
          description: currentState.description,
          duration_in_secs: currentState.duration_in_secs,
          start_date: currentState.start_date,
          end_date: currentState.end_date,
          questions_attributes: questions
        }
      },
      success: (test) => {
        this.props.sendTest(test);
      }
    });
  }

  render() {
    console.log(this.state.questions);
    let questions = this.state.questions.map((question, index) => <Question key={index}
                                                                            question={question}
                                                                            arrayIndex={index}
                                                                            handleUpdateQuestion={this.updateQuestion}
                                                                            handleDeleteQuestion={this.deleteQuestion} {...question} />);

    return (
      <div className="row form-group">
        <form onSubmit={(e) => this.sendTest(e)}>
          <div className="row form-group">
            <div className="form-group col-md-6">
              <label htmlFor="testName">Nazwa</label>
              <input name="name"
                     ref="name"
                     type="text"
                     value={this.state.name}
                     className="form-control"
                     placeholder="Nazwa"
                     onChange={(e) => this.handleInputChange(e)}>
              </input>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="testDurationTime">Czas trwania (w minutach)</label>
              <input name="duration_in_secs"
                     ref="duration_in_secs"
                     type="text"
                     value={this.state.duration_in_secs}
                     className="form-control"
                     placeholder="Czas trwania"
                     onChange={(e) => this.handleInputChange(e)}>
              </input>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="testTextArea">Opis</label>
            <textarea name="description"
                      ref="description"
                      value={this.state.description}
                      className="form-control"
                      rows="3"
                      onChange={(e) => this.handleInputChange(e)}>
            </textarea>
          </div>
          <div className="row form-group">
            <div className="form-group col-md-6">
              <label htmlFor="example-datetime-local-input" className="col-2 col-form-label">Data i czas rozpoczęcia</label>
              <div className="col-10">
                <input name="start_date"
                       ref="start_date"
                       type="datetime-local"
                       value={this.state.start_date}
                       className="form-control"
                       id="example-datetime-local-input"
                       onChange={(e) => this.handleInputChange(e)}>
                </input>
              </div>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="example-datetime-local-input" className="col-2 col-form-label">Data i czas zakończenia</label>
              <div className="col-10">
                <input name="end_date"
                       ref="end_date"
                       type="datetime-local"
                       value={this.state.end_date}
                       className="form-control"
                       id="example-datetime-local-input"
                       onChange={(e) => this.handleInputChange(e)}>
                </input>
              </div>
            </div>
          </div>

          {questions}
          <div className="row form-group">
            <button type="button" onClick={() => this.addQuestion()} className='btn btn-success'>Dodaj pytanie</button>
          </div>
          <button type="submit" className="btn btn-success pull-right">Zapisz</button>
        </form>
      </div>
    )
  }
};
