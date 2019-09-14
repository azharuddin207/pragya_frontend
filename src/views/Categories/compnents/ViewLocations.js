import React from "react";
import axios from "axios";
import { Table, Button } from "reactstrap";
import baseURL from "../Service/Index";
import cookie from "react-cookies";
import { Redirect, Link } from "react-router-dom";
import swal from "sweetalert";

class ViewLocations extends React.Component {
  state = {
    locations: [],
    loading: true,
    categoryId: "",
    category: "",
    name: ""
  };

  handleDelete = _id => {
    let token = cookie.load("token");
    let auth = {
      headers: {
        "x-auth-token": token
      }
    };
    if (!_id) return;

    swal("Are you sure you want to delete location?", {
      buttons: {
        catch: { text: "No", value: false },
        defeat: { text: "Yes", value: true }
      }
    })
      .then(value => {
        if (value === true) {
          axios
            .delete(baseURL + `admin/services/location/${_id}`, auth)
            .then(res => {
              if (res.status === 200) {
                this.setState(prvState => ({
                  locations: prvState.locations.filter(l => l._id !== _id)
                }));
                swal("Location deleted", "", "success");
              }
            })
            .catch(err => swal("Something went wrong", "", "error"));
        }
      })
      .catch(err => swal("something went wrong", "", "error"));
  };

  componentDidMount() {
    let token = cookie.load("token");
    let auth = {
      headers: {
        "x-auth-token": token
      }
    };
    const categoryId = this.props.match.params.id;

    axios
      .post(
        baseURL + `admin/services/categorylocations`,
        {
          categoryId
        },
        auth
      )
      .then(res => {
        this.setState({
          locations: res.data.locations.locations,
          loading: false,
          categoryId,
          category: res.data.locations.name
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  render() {
    let token = cookie.load("token");
    console.log(token);
    if (token === undefined) {
      return <Redirect to="/login" />;
    }
    if (this.state.locations !== null) {
      return (
        <div className="mt-5">
          <h3 className="mb-4">
            <b>Category:</b> {this.state.category}
          </h3>
          <Button
            tag={Link}
            className="mb-4"
            to={`/addlocation/${this.state.categoryId}`}
            color="primary"
          >
            Add Location
          </Button>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Person Name</th>
                <th>Locality</th>
                <th>Longitude</th>
                <th>Latitude</th>
                <th>Mobile Number</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.locations.map((location, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{location.name}</td>
                    <td>{location.locality}</td>
                    <td>{location.longitude}</td>
                    <td>{location.latitude}</td>

                    <td>
                      {location.phone === null
                        ? ""
                        : location.phone.map(mobile => {
                            return (
                              <div>
                                {location.phone.length - 1 ===
                                location.phone.indexOf(mobile)
                                  ? mobile
                                  : mobile + "  "}
                              </div>
                            );
                          })}
                    </td>
                    <td>
                      <Button tag={Link} to={`/editlocation/${location._id}`}>
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button onClick={() => this.handleDelete(location._id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      );
    } else
      return (
        <div>
          <h1>No Record Found</h1>
        </div>
      );
  }
}
export default ViewLocations;
