import React from 'react';
import ReactCountdownClock from 'react-countdown-clock';
import Slider from 'react-slick';

export default class SolvingTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: { questions: [] },
      is_solving: true,
      points: 0,
      questions_number: 0
    };
  }

  componentWillMount() {
    $.ajax({
      type: 'GET',
      url: '/tests/' + this.props.match.params.testId + '/to_solve',
      dataType: 'JSON',
      success: (test) => {
        this.setState({test: test, questions_number: test['questions'].length});
      }
    });
  }

  calculateTest = () => {
    let test = JSON.stringify(this.state.test);
    $.ajax({
      type: 'POST',
      url: '/tests/' + this.props.match.params.testId + '/calculate',
      dataType: 'JSON',
      data: {
        test: test
      },
      success: (result) => {
        this.setState({is_solving: false, points: result["points"]});
      }
    });
  };

  handleChange = (event) => {
    var data = event.target.dataset;
    var checked = event.target.checked;

    let newTest = this.state.test;
    let newQuesionsOptionList = newTest.questions[data["questionIndex"]]["question_options"];

    newQuesionsOptionList[data["optionIndex"]]["is_correct"] = checked;
    newQuesionsOptionList.forEach(function (option) {
      if(!(Object.keys(option).indexOf('is_correct') > -1)) {
        option["is_correct"] = false; // if there is no is_correct attr then assign false
      }
    });
    this.setState({ test: newTest });
  };

  render() {
    var sliderSettings = {
      arrows: true
    }

    var questions = this.state.test.questions;
    var slider = null;
    if(questions.length > 0) {
      slider = (
        <div className='questionSlider'>
          <Slider {...sliderSettings}>
            {
              questions.map((question, index) => {
                return (
                  <div key={index}>
                    <div className="form-group">{question.text}</div>
                    {
                      question.question_options.map((option,i) => {
                        return (
                          <div key={i} className="form-check">
                            <label className="form-check-label">
                              <input key={i}
                                     data-question-index={index}
                                     data-option-index={i}
                                     type="checkbox"
                                     className="form-check-input"
                                     name="is_correct"
                                     onChange={(e) => this.handleChange(e)}>
                              </input>
                              {option.answer_text}
                            </label>
                          </div>
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </Slider>
        </div>
      );
    }

    if(this.state.is_solving) {
      return (
        <div>
          <div className="row form-group">
            <ReactCountdownClock seconds={60}
                         color="#000"
                         alpha={0.9}
                         size={100}
                         onComplete={() => this.calculateTest()} />
          </div>
          {slider}
          <div className="container">
            <button type="button" onClick={() => this.calculateTest()} className='btn btn-default pull-right'>Zakończ test</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          Twój wynik to: {this.state.points} / {this.state.questions_number}
        </div>
      );
    }
  }
};
