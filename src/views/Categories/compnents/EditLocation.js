import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import baseURL from "../Service/Index";
import cookie from "react-cookies";
import swal from "sweetalert";

class EditLocation extends React.Component {
  state = {
    location: {
      name: "",
      locality: "",
      longitude: "",
      latitude: "",
      phone1: "",
      phone2: "",
      phone3: ""
    },
    redirect: false
  };

  changeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      location: {
        ...this.state.location,
        [name]: value
      }
    });
  };

  getLocation = e => {
    let token = cookie.load("token");
    let auth = {
      headers: {
        "x-auth-token": token
      }
    };
    const id = this.props.match.params.id;
    axios.get(baseURL + `admin/services/location/${id}`, auth).then(res => {
      let data = {
        ...res.data.location,
        phone1: res.data.location.phone[0],
        phone2: res.data.location.phone[1],
        phone3: res.data.location.phone[2]
      };
      this.setState({
        location: data
      });
    });
  };

  componentDidMount() {
    this.getLocation();
  }

  update = e => {
    e.preventDefault();
    const { location } = this.state;
    let token = cookie.load("token");
    let auth = {
      headers: {
        "x-auth-token": token
      }
    };

    const { phone1, phone2, phone3 } = this.state.location;
    if (isNaN(phone1)) {
      alert("Enter valid phone number");
      return false;
    }

    let data = {
      ...location,
      phone: [
        location.phone1 || "",
        location.phone2 || "",
        location.phone3 || ""
      ]
    };

    const id = this.props.match.params.id;
    axios
      .put(baseURL + `admin/services/location/${id}`, data, auth)
      .then(res => {
        if (res.status === 200) {
          swal("Location has been updated", "", "success")
          this.props.history.goBack();
        }
      });
  };

  render() {
    const { location } = this.state;
    const {
      name,
      locality,
      longitude,
      latitude,
      phone1,
      phone2,
      phone3
    } = location;
    return (
      <div className="col-5 card p-3" style={{ margin: "7em auto" }}>
        {/* <Button tag={Link} to={'/view'} color="secondary"  className="mb-2">Go Back</Button> */}

        <h3 className="mb-4">Edit Location</h3>
        <Form onSubmit={this.update}>
          <FormGroup>
            <Label for="name" hidden="hidden">
              name
            </Label>
            <Input
              type="text"
              onChange={this.changeHandler}
              value={name}
              name="name"
              placeholder="Name"
            />
          </FormGroup>

          <FormGroup>
            <Label for="Text" hidden="hidden">
              Text
            </Label>
            <Input
              type="text"
              onChange={this.changeHandler}
              value={locality}
              name="locality"
              placeholder="Locality"
            />
          </FormGroup>

          <FormGroup>
            <Label for="longitude" hidden="hidden">
              categoryName
            </Label>
            <Input
              type="text"
              onChange={this.changeHandler}
              value={longitude}
              name="longitude"
              placeholder="Longitude"
            />
          </FormGroup>
          <FormGroup>
            <Label for="latitude" hidden="hidden">
              Text
            </Label>
            <Input
              type="text"
              onChange={this.changeHandler}
              value={latitude}
              name="latitude"
              placeholder="Latitude"
            />
          </FormGroup>

          <FormGroup>
            <Label for="phone" hidden="hidden">
              Text
            </Label>
            <Input
              type="text"
              onChange={this.changeHandler}
              name="phone1"
              value={phone1 || ""}
              placeholder="Mobile Number"
            />
          </FormGroup>

          <FormGroup>
            <Input
              type="text"
              onChange={this.changeHandler}
              name="phone2"
              value={phone2 || ""}
              placeholder="Mobile Number(Optional)"
            />
          </FormGroup>

          <FormGroup>
            <Input
              type="text"
              onChange={this.changeHandler}
              name="phone3"
              value={phone3 || ""}
              placeholder="Mobile Number(Optional)"
            />
          </FormGroup>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </Form>
      </div>
    );
  }
}

export default EditLocation;