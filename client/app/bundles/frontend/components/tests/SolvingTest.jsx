import React from 'react';

export default class SolvingTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: {}
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

  render() {
    console.log(this.state.test);
    return (
      <div>
        WE ARE IN SOLVING
        <p>{`Test id is: ${this.props.match.params.testId}`}</p>
      </div>
    );
  }
};
