import React from 'react';
import axios from 'axios';
import {Input, Label, Form, FormGroup} from 'reactstrap';
import baseURL from '../Service/Index';
import {Redirect} from 'react-router-dom';
import cookie from 'react-cookies';
import swal from 'sweetalert';

class AddLocation extends React.Component {

  state = {
    location: {
      name: '',
      locality: '',
      longitude: '',
      latitude: '',
      phone1: '',
      phone2: '',
      phone3: ''
    },
    redirect: false
  }

  changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(
      {
      location: {
        ...this.state.location,
        [name]: value,
      }
      
    })
  }  

  handleSubmit = (e) => {
    e.preventDefault();
    let token = cookie.load('token')
    let auth = {
      headers: {
        'x-auth-token': token
      }
    }

    const {phone1, phone2, phone3}=this.state.location
    if( isNaN(phone1) ){
      alert("Enter valid phone number") 
      return false
    }
    
    const categoryId = this.props.match.params.id;
    const data = this.state.location;
    axios.post(baseURL + `admin/services/location`, {
      data,
      categoryId
    }, auth).then(res => {
      if(res.status === 200){
          swal("Location has been added", "", "success")
          this.props.history.goBack();
        }
    }).catch(err => {
      swal("Something went wrong", "", "error")
    })
  }

  render() {
    let token = cookie.load('token')
    if(token === undefined ) {
      return <Redirect to='/login' />
    }

    return (<div className="col-5 card p-3" style={{margin: '7em auto'} }>

        <h3 className="mb-4">Add a new location</h3>
        <Form onSubmit={this.handleSubmit}>

        <FormGroup>
          <Label for="name" hidden="hidden">name</Label>
          <Input type="text" onChange={this.changeHandler} value={this.state.location.name} name="name" placeholder="Name"/>
        </FormGroup>

        <FormGroup>
          <Label for="Text" hidden="hidden">Text</Label>
          <Input type="text" onChange={this.changeHandler} value={this.state.location.locality} name="locality" placeholder="Locality"/>
        </FormGroup>

        <FormGroup>
          <Label for="longitude" hidden="hidden">categoryName</Label>
          <Input type="text" onChange={this.changeHandler} value={this.state.location.longitude} name="longitude" placeholder="Longitude"/>
        </FormGroup>
        <FormGroup>
          <Label for="latitude" hidden="hidden">Text</Label>
          <Input type="text" onChange={this.changeHandler} value={this.state.location.latitude} name="latitude" placeholder="Latitude"/>
        </FormGroup>

        <FormGroup>
          <Label for="phone" hidden="hidden">Text</Label>
          <Input type="text" onChange={this.changeHandler}  value={this.state.location.phone1} name="phone1" placeholder="Mobile Number"/>
        </FormGroup>

        <FormGroup>
          <Input type="text" onChange={this.changeHandler} value={this.state.location.phone2} name="phone2" placeholder="Mobile Number(Optional)"/>
        </FormGroup>

        <FormGroup>
          <Input type="text" onChange={this.changeHandler} value={this.state.location.phone3} name="phone3" placeholder="Mobile Number(Optional)"/>
        </FormGroup>

        <button type="submit" className="btn btn-primary">Submit</button>
      </Form>
    </div>)

  }

}

export default AddLocation;
