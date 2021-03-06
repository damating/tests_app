import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import GroupBox from '../components/groups/GroupBox';
import GroupView from '../components/groups/GroupView';
import Test from '../components/tests/Test';
import SolvingTest from '../components/tests/SolvingTest';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-default navbar-fixed-top">
            <ul className="nav navbar-nav">
              <li className="active">
                <Link to='/'>Grupy</Link>
              </li>
            </ul>
          </nav>

          <Route exact path="/" component={GroupBox}/>
          <Route exact component={GroupView} path='/groups/:groupId' />
          <Route component={SolvingTest} path='/groups/:groupId/tests/:testId' />
        </div>
      </Router>
    );
  }
}
