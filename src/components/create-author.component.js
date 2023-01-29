import React, { Component } from 'react';
import axios from 'axios';

export default class CreateAuthor extends Component {
  constructor(props) {
    super(props);

    this.onChangeAuthorname = this.onChangeAuthorname.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      authorname: ''
    }
  }

  onChangeAuthorname(e) {
    this.setState({
      authorname: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const author = {
      authorname: this.state.authorname
    }

    console.log(author);

    axios.post('https://sujata-book-list.onrender.com/authors/add', author)
      .then(res => console.log(res.data));

    this.setState({
      authorname: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Create New Author</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Authorname: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.authorname}
                onChange={this.onChangeAuthorname}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create Author" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
