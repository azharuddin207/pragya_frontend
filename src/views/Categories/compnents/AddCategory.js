import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';
import baseURL from '../Service/Index';
import cookie from 'react-cookies';
import {Redirect, Link} from 'react-router-dom';
import swal from 'sweetalert';

class AddCategory extends React.Component {
  state = {
    name: '',
    summary: ''
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    const {history} = this.props;
    e.preventDefault();
    let token = cookie.load('token')
    let auth = {
      headers: {
        'x-auth-token': token
      }
    }
    const name = this.state.name;
    const summary = this.state.summary;
    const data = {
      name,
      summary
    };
    axios.post(baseURL + `admin/services/category`, data, auth).then(res => {
      swal("Category Added", "", "success")
      history.push("/category")
    }).catch(err => {
      swal("Something went wrong", "", "error")
    })
  }

  render() {
    let token = cookie.load('token')
    // console.log(token);
    if(token === undefined ) {
      return <Redirect to='/login' />
    }

    return (
      <div className="card col-lg-8 p-2" style={{margin: '10em auto'}}>
        {/* <Button tag={Link} to={'/category'} color="secondary"  className="mb-2">Go Back</Button> */}
         <React.Fragment>
      <h3 className="mb-4">Add a new category</h3>
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
           <Label for="name" hidden="hidden">name</Label>
           <Input type="text" required="required" name="name"
            placeholder="Category Name"
            onChange={this.onChange}
            value={this.state.name}/>
        </FormGroup>
        <FormGroup>
          <Label for="summary" hidden="hidden">Text</Label>
          <Input type="textarea"
              required="required"
              name="summary"
              id="summary"
              placeholder="summary"
              onChange={this.onChange}
              value={this.state.summary}/>
        </FormGroup>
        <button className="btn btn-primary">Add Category</button>
      </Form>
    </React.Fragment>
      </div>
   );
  }
}

export default AddCategory;
