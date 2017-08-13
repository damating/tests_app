import React from 'react';
import { Link } from 'react-router-dom'
import TestForm from '../tests/TestForm';

export default class GroupView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tests: [],
      formIsActive: false
    };
  }

  componentDidMount() {
    var groupId = this.props.match.params.groupId;

    $.ajax({
      type: 'GET',
      url: '/tests',
      data: { group_id: groupId },
      dataType: 'json',
      success: (tests) => {
        this.setState({ tests: tests })
      }
    });
  }

  addTest = (test) => {
    this.hideForm();
    const { tests } = this.state;

    this.setState({ tests: tests.concat(test) });
  };

  deleteTest = (id) => {
    $.ajax({
      url: `/tests/${id}`,
      type: 'DELETE',
      success: (response) => {
        var newTests = this.state.tests.filter((test) => {
          return test.id != id;
        });

        this.setState({ tests: newTests });
      }
    });
  };

  showForm = () => {
    this.setState({ formIsActive: true });
  };

  hideForm = () => {
    this.setState({ formIsActive: false });
  };

  render() {
    let tests_links = this.state.tests.map((test, index) =>
      <div key={index} className="form-group">
        <Link to={`/tests/${test.id}`} key={test.id} className="list-group-item">{test.name}</Link>
        <Link to={`/tests/${test.id}/solving`} className="btn btn-default">Rozwiąż test</Link>
        <button onClick={() => this.deleteTest(test.id)} className="btn btn-danger">Usuń test</button>
      </div>
    );

    return (
      <div className="container">
        {this.state.formIsActive ? (
          <TestForm groupId={this.props.match.params.groupId}
                    sendTest={this.addTest}
                    hideForm={this.hideForm} />
        ) : (
          <div className="row form-group">
            <button onClick={() => this.showForm()} className="btn btn-success pull-right">Dodaj test</button>
          </div>
        )}
        <div className="row list-group">
          {tests_links}
        </div>
      </div>
    );
  }
};
