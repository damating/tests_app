import PropTypes from 'prop-types';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Test from '../components/Test';

export default class App extends React.Component {
  // static propTypes = {
  //   name: PropTypes.string.isRequired, // this is passed from the Rails view
  // };

  /**
   * @param props - Comes from your rails view.
   * @param _railsContext - Comes from React on Rails
   */
  // constructor(props, _railsContext) {
  //   super(props);

  //   // How to set initial state in ES6 class syntax
  //   // https://facebook.github.io/react/docs/reusable-components.html#es6-classes
  //   this.state = { name: this.props.name };
  // }

  // updateName = (name) => {
  //   this.setState({ name });
  // };

  render() {
    return (
      <Router>
        <Route exact path="/" component={Test}/>
      </Router>
    );
  }
}
