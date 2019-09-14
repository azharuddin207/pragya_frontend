import React from "react";
import Axios from "axios";
import baseURL from "../../Categories/Service/Index";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import cookie from "react-cookies";
import swal from 'sweetalert';

class ResetPassword extends React.Component {
  state = {
    newpassword: "",
    confirmpassword: "",
    updated: false,
    email: "",
    message: "",
    errmsg: "",
    redirect: false
  };

  changeHandler = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    console.log("ji");
    this.setState({
      email: this.props.location.pathname.split("/")[2]
    });
    Axios.get(baseURL + `admin/auth/resetpassword`, {
      params: {
        email: this.props.location.pathname.split("/")[2]
      }
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.data);
      });
  }

  upadate = e => {
    e.preventDefault();
    const { newpassword, confirmpassword } = this.state;
    if (newpassword !== confirmpassword) {
      alert("password do not match");
    } else {
      Axios.post(baseURL + `admin/auth/resetpassword`, {
        password: this.state.newpassword,
        email: this.state.email
      })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.setState({
              upadated: true,
              message: res.data.message,
              password: ""
            });
            console.log(res.data.message);
            swal("Password has been changed", "", "success");
            setTimeout(() => this.setState({ redirect: true }), 2000);
          }
        })
        .catch(err => {
          console.log(err.data);
          this.setState({
            errmsg: err.message
          });
        });
    }
  };

  render() {
    console.log(this.state.email);
    let { newpassword, confirmpassword } = this.state;
    const { history } = this.props;
    const { message, errmsg, updated } = this.state;
    if (this.state.redirect) history.push("/login");
    return (
      <div
        className="card p-5 col-5"
        style={{
          margin: "10em auto"
        }}
      >
        <h3 className="mb-4"> Reset your password </h3>{" "}
        <Form onSubmit={this.upadate}>
          <FormGroup>
            <Input type="text" value={this.state.email} disabled />
          </FormGroup>{" "}
          <FormGroup>
            {" "}
            {/* <Label for="examplePassword">new Password</Label> */}{" "}
            <Input
              type="password"
              name="newpassword"
              placeholder="Enter new password"
              onChange={this.changeHandler}
              value={newpassword}
            />{" "}
          </FormGroup>{" "}
          <FormGroup>
            {" "}
            {/* <Label for="examplePassword">confirm Password</Label> */}{" "}
            <Input
              type="password"
              name="confirmpassword"
              placeholder="Confirm password"
              onChange={this.changeHandler}
              value={confirmpassword}
            />{" "}
          </FormGroup>{" "}
          <button type="submit" className="btn btn-primary" color="primary">
            {" "}
            Reset Password{" "}
          </button>{" "}
        </Form>{" "}
        {updated ? (
          <p
            style={{
              color: "green"
            }}
          >
            {" "}
            {message}{" "}
          </p>
        ) : (
          <p style={{ color: "red" }}>{errmsg}</p>
        )}
      </div>
    );
  }
}

export default ResetPassword;
