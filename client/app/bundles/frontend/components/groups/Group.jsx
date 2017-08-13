import React from 'react';
import { Link } from 'react-router-dom'

export default class Group extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.state = {
      editable: false
    };
  }

  handleDelete = (id) => {
    $.ajax({
      url: `/groups/${id}`,
      type: 'DELETE',
      success: (response) => {
        this.props.deleteGroup(id);
      }
    });
  };

  handleEdit = () => {
    if(this.state.editable) {
      var name = this.refs.groupName.value;
      var description = this.refs.groupTextArea.value;
      var id = this.props.id;
      var group = {id: id, name: name, description: description};
      $.ajax({
        url: `/groups/${id}`,
        type: 'PUT',
        data: { group: group },
        success: () => {
          this.props.editGroup(group);
        }
      });
    }
    this.setState({ editable: !this.state.editable })
  };

  render() {
    var name = this.state.editable ? <input type='text' ref="groupName" className="form-control" defaultValue={this.props.name} /> : <h5 className="panel-title">{this.props.name}</h5>;
    var description = this.state.editable ? <textarea ref="groupTextArea" className="form-control" rows="3" defaultValue={this.props.description}></textarea> : <p className="m-b">{this.props.description}</p>

    return (
      <div className="col-md-4 m-b-lg">
        <div className="panel panel-default panel-profile m-b-0">
          <div className="panel-heading" style={{backgroundImage: "url(//cdn.shopify.com/s/files/1/0691/5403/t/139/assets/insta-3.jpg?12817922976150776315)"}}></div>
          <div className="panel-body text-center">
            {name}
            {description}
            <Link to={`/groups/${this.props.id}`} className='btn btn-success'>Odwiedź</Link>
            <button onClick={() => this.handleEdit()} className='btn btn-warning'>{this.state.editable ? 'Zapisz' : 'Edytuj'}</button>
            <button onClick={() => this.handleDelete(this.props.id)} className='btn btn-danger'>Usuń</button>
          </div>
        </div>
      </div>
    );
  }
};
