import React from 'react';
import ReactCountdownClock from 'react-countdown-clock';
import Slider from 'react-slick';

export default class SolvingTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: { questions: ['<div>TEST</div>'] }
    };
  }

  componentWillMount() {
    $.ajax({
      type: 'GET',
      url: '/tests/' + this.props.match.params.testId + '/to_solve',
      dataType: 'JSON',
      success: (test) => {
        this.setState({test: test});
      }
    });
  }

  calculateTest = () => {
    console.log("KONIEC TESTU!");
  };

  getDivs = () => {
    if(this.state.test.questions.length > 0) {
      return this.state.test.questions.map((question,i) => <div key={i}>{question.name}</div>)
    }
    return <div>TEST</div>
  };

  render() {
    var sliderSettings = {
      arrows: true
    }

    var questions = this.state.test.questions;
    if(questions.length > 0) {
      questions = questions.map((item,i) => <div key={i}>{item.name}</div>);
      // questions = this.state.test.questions.map((question,i) => <div key={i}>{question.name}</div>)
    }

    return (
      <div>
        <div>
          <ReactCountdownClock seconds={60}
                       color="#000"
                       alpha={0.9}
                       size={100}
                       onComplete={() => this.calculateTest()} />
        </div>
        <div className='questionSlider'>
          <Slider {...sliderSettings}>
            {questions}
          </Slider>
        </div>

        <p>{`Test id is: ${this.props.match.params.testId}`}</p>
      </div>
    );
  }
};
