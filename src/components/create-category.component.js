import React, { Component } from 'react';
import axios from 'axios';

export default class CreateCategory extends Component {
  constructor(props) {
    super(props);

    this.onChangeCategoryname = this.onChangeCategoryname.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      categoryname: ''
    }
  }

  onChangeCategoryname(e) {
    this.setState({
      categoryname: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const category = {
      categoryname: this.state.categoryname
    }

    console.log(category);

    axios.post('https://sujata-book-list.onrender.com/categorys/add', category)
      .then(res => console.log(res.data));

    this.setState({
      categoryname: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Create New Category</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Categoryname: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.categoryname}
                onChange={this.onChangeCategoryname}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create Category" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
