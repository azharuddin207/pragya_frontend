import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import baseURL from "../Service/Index";
import cookie from "react-cookies";
import { Redirect, Link } from "react-router-dom";

class EditCategory extends React.Component {
  state = {
    name: "",
    summary: "",
    loading: true,
    redirect: false
  };

  getCategory = () => {
    let token = cookie.load("token");
    let auth = {
      headers: {
        "x-auth-token": token
      }
    };
    const id = this.props.match.params.id;
    axios.get(baseURL + `admin/services/category/${id}`, auth).then(res => {
      this.setState({ name: res.data.name, summary: res.data.summary });
    });
  };

  componentDidMount() {
    this.getCategory();
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  update = e => {
    e.preventDefault();
    const category = {
      name: this.state.name,
      summary: this.state.summary
    };
    let token = cookie.load("token");
    let auth = {
      headers: {
        "x-auth-token": token
      }
    };
    const id = this.props.match.params.id;
    axios
      .put(baseURL + `admin/services/category/${id}`, category, auth)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            redirect: true
          });
        }
      });
  };

  render() {
    let token = cookie.load("token");
    if (token === undefined) {
      return <Redirect to="/login" />;
    }
    let redirect = this.state.redirect;
    if (redirect) this.props.history.push("/viewCategory");
    return (
      <div className="mt-5">
        <Button tag={Link} to={"/Category"} color="secondary" className="mb-2">
          Go Back
        </Button>

        <h3 className="mb-4">Edit this category</h3>
        <Form onSubmit={this.update}>
          <FormGroup>
            <Label for="name" hidden="hidden">
              name
            </Label>
            <Input
              type="text"
              required="required"
              name="name"
              id="name"
              placeholder="Category Name"
              onChange={this.onChange}
              value={this.state.name}
            />
          </FormGroup>
          <FormGroup>
            <Label for="summary" hidden="hidden">
              Text
            </Label>
            <Input
              type="textarea"
              rows="7"
              required="required"
              name="summary"
              id="summary"
              placeholder="summary"
              onChange={this.onChange}
              value={this.state.summary}
            />
          </FormGroup>
          <button className="btn btn-primary">Edit Category</button>
        </Form>
      </div>
    );
  }
}

export default EditCategory;
