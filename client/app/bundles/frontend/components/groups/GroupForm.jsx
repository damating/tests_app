import React from 'react';

export default class GroupForm extends React.Component {

  sendGroup = (event) => {
    event.preventDefault();
    var name = this.refs.groupName.value;
    var description = this.refs.groupTextArea.value;
    $.ajax({
      url: '/groups',
      type: 'POST',
      data: { group: { name: name, description: description }},
      success: (group) => {
        this.props.sendGroup(group);
        this.refs.groupTextArea.value = '';
        this.refs.groupName.value = '';
      }
    });
  };

  render() {
    return (
      <div className="row">
        <form onSubmit={(e) => this.sendGroup(e)}>
          <div className="form-group">
            <label htmlFor="groupName">Nazwa</label>
            <input type="text" ref="groupName" className="form-control" id="groupName" placeholder="Nazwa"></input>
          </div>
          <div className="form-group">
            <label htmlFor="groupTextArea">Opis</label>
            <textarea ref="groupTextArea" className="form-control" id="groupTextArea" rows="3"></textarea>
          </div>
          <button type="submit" className="btn btn-success pull-right">Utwórz grupę</button>
        </form>
      </div>
    )
  }
};
