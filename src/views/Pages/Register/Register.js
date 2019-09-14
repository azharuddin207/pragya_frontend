import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  FormGroup,
  Label,
  CustomInput
} from "reactstrap";
import axios from "axios";
import baseURL from "../../Categories/Service/Index";
import cookie from "react-cookies";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    redirect: false,
    role: "admin",
    redirect: false
  };

  changeHandler = e => {
    // console.log(e.target.value)
    e.preventDefault();
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  register = e => {
    e.preventDefault();

    let token = cookie.load("token");
    let auth = {
      headers: {
        "x-auth-token": token
      }
    };
    const { name, email, password, confirmpassword, role } = this.state;
    const data = {
      name,
      email,
      password,
      confirmpassword,
      role
    };
    const re = new RegExp("^(?=.{6,})");
    const isOk = re.test(password);

    console.log(isOk);

    if (!isOk) {
      return alert("weak password! Minimum six character is required");
    }
    if (password !== confirmpassword) {
      alert("password do not match");
    } else {
      axios
        .post(baseURL + `admin/auth/register`, data, auth)
        .then(res => {
          if (res.status === 200) {
            if (res.data.message === "success") {
              swal("New user created", "", "success");
              this.setState({ redirect: true });
            } else if (res.data.message === "user already registered.") {
              swal("User with this email, already exists", "", "success");
            } else if (res.data.message === "not authorized to create user") {
              swal("Oops!, you can't create a new user!");
            }
          } else {
            swal("Please try again", "", "warning");
          }
        })
        .catch(err => {
          swal("Something went wrong", "", "error");
        });
    }
  };

  render() {
    let { password, confirmpassword } = this.state;
    let token = cookie.load("token");
    if (token === undefined) {
      return <Redirect to="/login" />;
    }
    const { history } = this.props;
    if (this.state.redirect) history.push("/category");

    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function(c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    if (JSON.parse(jsonPayload).role === "admin")
      this.props.history.push("/viewCategory");

    let { redirect } = this.state;
    if (redirect) this.props.history.push("/viewCategory");
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.register}>
                    <h1>Create new admin</h1>
                    <p className="text-muted">Enter Details</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Name"
                        autoComplete="username"
                        name="name"
                        value={this.state.name}
                        onChange={this.changeHandler}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        name="email"
                        onChange={this.changeHandler}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        name="password"
                        placeholder="password"
                        onChange={this.changeHandler}
                        value={password}
                        onInput={this.validate}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        name="confirmpassword"
                        placeholder="confirm password"
                        onChange={this.changeHandler}
                        value={confirmpassword}
                        onInput={this.validate}
                      />
                    </InputGroup>

                    <div mb-2>
                      <input
                        onChange={this.changeHandler}
                        type="radio"
                        id="admin"
                        name="role"
                        value="admin"
                        label="Admin"
                        inline
                        checked
                        mb-2
                      />{" "}
                      Admin
                      <span className="mr-3"> </span>
                      <input
                        type="radio"
                        onChange={this.changeHandler}
                        id="super"
                        name="role"
                        value="super"
                        label="Super Admin"
                        inline
                        mb-2
                      />{" "}
                      Super Admin
                    </div>

                    <Button color="success" className="mt-4" block="block">
                      Create Account
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
