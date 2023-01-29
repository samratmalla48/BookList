import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditBook extends Component {
  constructor(props) {
    super(props);

    this.onChangeAuthorname = this.onChangeAuthorname.bind(this);
    this.onChangeCategoryname = this.onChangeCategoryname.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeBookname = this.onChangeBookname.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      authorname: '',
      categoryname: '',
      description: '',
      bookname: '',
      duration: 0,
      date: new Date(),
      authors: [],
      categorys: [],
     
    }
  }

  componentDidMount() {
    axios.get('https://sujata-book-list.onrender.com/books/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          authorname: response.data.authorname,
          categoryname: response.data.categoryname,
          description: response.data.description,
         bookname: response.data.bookname,
          duration: response.data.duration,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('https://sujata-book-list.onrender.com/authors/',{headers: {'Access-Control-Allow-Origin': '*'}})
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            authors: response.data.map(author => author.authorname),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

      
    axios.get('https://sujata-book-list.onrender.com/categorys/',{headers: {'Access-Control-Allow-Origin': '*'}})
    .then(response => {
      if (response.data.length > 0) {
        this.setState({
          categorys: response.data.map(category => category.categoryname),
        })
      }
    })
    .catch((error) => {
      console.log(error);
    })


  }


  

  onChangeAuthorname(e) {
    this.setState({
      authorname: e.target.value
    })
  }
  onChangeCategoryname(e) {
    this.setState({
      categoryname: e.target.value
    })
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }
  onChangeBookname(e) {
    this.setState({
     bookname: e.target.value
    })
  }
  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const book = {
      authorname: this.state.authorname,
      categoryname: this.state.categoryname,
      description: this.state.description,
      bookname: this.state.bookname,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(book);

    axios.post('https://sujata-book-list.onrender.com/books/update/' + this.props.match.params.id, book)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Book Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Authorname: </label>
          <select ref="authorInput"
              required
              className="form-control"
              value={this.state.authorname}
              onChange={this.onChangeAuthorname}>
              {
                this.state.authors.map(function(author) {
                  return <option 
                    key={author}
                    value={author}>{author}
                    </option>;
                })
              }
          </select>
        </div>

        <div className="form-group"> 
<label>Categoryname: </label>
<select ref="categoryInput"
    required
    className="form-control"
    value={this.state.categoryname}
    onChange={this.onChangeCategoryname}>
    {
      this.state.categorys.map(function(category) {
        return <option 
          key={category}
          value={category}>{category}
          </option>;
      })
    }
</select>
</div>

<div className="form-group"> 
          <label>Bookname: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.bookname}
              onChange={this.onChangeBookname}
              />
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Price: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Publication Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Book Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
