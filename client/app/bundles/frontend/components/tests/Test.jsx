import React from 'react';

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      test: {}
    };
  }

  componentWillMount() {
    $.ajax({
      type: 'GET',
      url: '/tests/' + this.props.match.params.testId,
      dataType: 'JSON',
      success: (test) => {
        this.setState({test: test});
      }
    });
  }

  render() {
    return (
      <div>
        WE ARE IN TEST
        <p>{`Test id is: ${this.props.match.params.testId}`}</p>
      </div>
    );
  }
};
