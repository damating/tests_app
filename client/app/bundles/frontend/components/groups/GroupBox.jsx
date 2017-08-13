import React from 'react';
import GroupForm from '../groups/GroupForm';
import Group from '../groups/Group';

export default class GroupBox extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.state = {
      groups: []
    };
  }

  componentDidMount() {
    $.getJSON('/groups.json', (response) => { this.setState({ groups: response }) });
  }

  addGroup = (group) => {
    const { groups } = this.state;
    this.setState({ groups: groups.concat(group) });
  };

  deleteGroup = (id) => {
    var newGroups = this.state.groups.filter((group) => {
      return group.id != id;
    });

    this.setState({ groups: newGroups });
  };

  editGroup = (group) => {
    var groups = this.state.groups.filter((g) => { return g.id != group.id });
    groups.unshift(group);

    this.setState({groups: groups});
  };

  render() {
    let groups = this.state.groups.map(group => <Group key={group.id}
                                                       deleteGroup={this.deleteGroup}
                                                       editGroup={this.editGroup} {...group} />);

    return (
      <div>
        <GroupForm sendGroup={this.addGroup} />
        <br />
        <div className="row">
          {groups}
        </div>
      </div>
    )
  }
};
