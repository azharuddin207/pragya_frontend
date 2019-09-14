import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import baseURL from "../../Categories/Service/Index";
import cookie from "react-cookies";
import swal from "sweetalert";

class ChangePassword extends React.Component {
  state = {
    email: this.props.location.pathname.split("/")[2],
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
    successmsg: "",
    errormsg: "",
    redirect: false,
    updated: false
  };

  changeHandler = e => {
    e.preventDefault();
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { oldpassword, newpassword, confirmpassword } = this.state;
    const re = new RegExp("^(?=.{6,})");
    const isOk = re.test(newpassword);
    console.log(this.props.location.pathname.split("/")[2]);
    if (!isOk) {
      return alert("weak password! Minimum six character is required");
    }
    if (newpassword !== confirmpassword) {
      alert("password do not match");
    } else {
      console.log(this.state);
      let token = cookie.load("token");
      let auth = {
        headers: {
          "x-auth-token": token
        }
      };
      const data = {
        email: this.props.location.pathname.split("/")[2],
        password: oldpassword,
        newpassword: newpassword
      };
      axios
        .post(baseURL + `admin/auth/changepassword`, data, auth)
        .then(res => {
          if (res.status === 200) {
            console.log(res);
            this.setState({
              successmsg: res.message,
              updated: true
            });
            swal("Password has been changed", "", "success");
            this.setState({ redirect: true });
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({
            errormsg: err.message,
            updated: false
          });
        });
    }
  };

  render() {
    console.log(this.props);
    const { history } = this.props;
    if (this.state.redirect) history.push("/login");
    let { oldpassword, newpassword, confirmpassword } = this.state;
    let { updated, successmsg, errormsg } = this.state;
    return (
      <div className="col-5 card p-5" style={{ margin: "10em auto" }}>
        <h3 className="mb-4">Change your password</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="examplePassword">Old Password</Label>
            <Input
              type="password"
              name="oldpassword"
              placeholder="Enter Old password"
              onChange={this.changeHandler}
              value={oldpassword}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">New Password</Label>
            <Input
              type="password"
              name="newpassword"
              placeholder="Enter new password"
              onChange={this.changeHandler}
              value={newpassword}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Confirm Password</Label>
            <Input
              type="password"
              name="confirmpassword"
              placeholder="confirm password"
              onChange={this.changeHandler}
              value={confirmpassword}
            />
          </FormGroup>
          <button className="btn btn-primary">Change Password</button>
        </Form>
        {updated ? (
          <p style={{ color: "green" }}>{successmsg}</p>
        ) : (
          <p style={{ color: "red" }}>{errormsg}</p>
        )}
      </div>
    );
  }
}

export default ChangePassword;
