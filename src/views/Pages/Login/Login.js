import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';
import swal from 'sweetalert';

// import ForgotPassword from '../Register/ForgotPassword'
// import {Redirect} from 'react-router-dom'
// import { CookiesProvider } from 'react-cookie';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import baseURL from '../../Categories/Service/Index';
// "x-auth-token": token
// userId: cookie.load('userId')

class Login extends Component {

  state = {
    email: "",
    password: "",
    redirect: false,
    data: '',
    message: undefined
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handlechange = (e) => {
    // console.log(e.target.value)
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
      message: undefined
    });
  }

  login = (e) => {
    const {history} = this.props;
    e.preventDefault();
    const expires = new Date()
    expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14)
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    axios.post(baseURL + `admin/auth/login`, user).then(({data}) => {
      this.setState({message: data.message})
     if(this.state.message === 'invalid email or password') { 
        swal("Please check your credentials", "", "warning");
      }
      if (data && data.token) {
        cookie.save('token', data.token, {
          path: '/',
          expires
        });                  
        history.push("/Category")
        window.location.reload();
      }
    })
    .catch(err => {
      swal("Something went wrong", "", "error")
    })
  }

  render() {
    return (<div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="6">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form onSubmit={this.login}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="email" placeholder="Email" autoComplete="username" name="email"
                       onChange={this.handlechange} value={this.state.email}/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" autoComplete="current-password" name="password" onChange={this.handlechange} password={this.state.password}/>
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" type="submit" disabled={!this.validateForm()} className="px-4">Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        {/* <Button color="link" className="px-0" to={'/forgotPassword'}>Forgot password?</Button>
                       */}
                       <Link to={'/ForgotPassword'}>Forgot Password?</Link>
                      </Col>
                      {
                        this.state.message && <p style={{
                              color: "red",
                              display: "block"
                            }}>{this.state.message}</p>
                      }
                    </Row>
                  </Form>
                </CardBody>
              </Card>

            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>);
  }
}

export default Login;
