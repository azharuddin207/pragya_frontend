import React from "react";
import Axios from "axios";
import { Table, Button } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import baseURL from "../Service/Index";
import cookie from "react-cookies";
import swal from "sweetalert";

class ViewAdmins extends React.Component {
  state = {
    admins: [],
    role: "",
    adminClone: []
  };

  handleDelete = _id => {
    let token = cookie.load("token");
    let auth = {
      headers: {
        "x-auth-token": token
      }
    };

    if (!_id) {
      return;
    }

    swal("Are you sure you want to delete user?", {
      buttons: {
        catch: { text: "No", value: false },
        defeat: { text: "Yes", value: true }
      }
    })
      .then(value => {
        if (value === true) {
          Axios.delete(baseURL + `admin/services/admins/${_id}`, auth)
            .then(res => {
              if (res.status === 200) {
                this.setState(prvState => ({
                  admins: prvState.admins.filter(admin => admin._id !== _id)
                }));
                swal("Admin deleted", "", "success");
              }
            })
            .catch(err => {
              swal("Something went wrong", "", "error");
            });
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

    this.setState({ role: JSON.parse(jsonPayload).role });

    if (JSON.parse(jsonPayload).role !== "super")
      this.props.history.push("/viewCategory");

    Axios.get(baseURL + `admin/services/admins`, auth)
      .then(res => {
        console.log(res.data);
        this.setState({
          admins: res.data.admins.filter(admin => res.data.user._id !== admin._id)
        });
        
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let token = cookie.load("token");
    if (token === undefined) {
      return <Redirect to="/login" />;
    }

    if (this.state.admins !== null) {
      return (
        <div className="mt-5">
          <Button
            tag={Link}
            to={"/Category"}
            color="secondary"
            className="mb-2"
          >
            Go Back
          </Button>
          {this.state.role === "super" ? (
            <Button
              tag={Link}
              to={"/Register"}
              className="btn btn-success float-right mb-1 mr-4"
              onClick={this.createAdmin}
            >
              Create New User
            </Button>
          ) : (
            <br />
          )}

          <h3 className="mt-3 mb-3">List of Admins</h3>
          <Table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.admins.map((admin, i) => {
                return (
                  <tr key={admin._id}>
                    <th>{i + 1}</th>
                    <td>{admin.name}</td>
                    <td>
                      <p>{admin.email}</p>
                    </td>
                    <td>{admin.role === "super" ? "Super Admin" : "Admin"}</td>
                    <td>{admin.createdAt === '' || admin.createdAt === undefined ||admin.createdAt === null ? '-' : new Date(admin.createdAt).getDate() + "-" + new Date(admin.createdAt).getMonth() + "-" + new Date(admin.createdAt).getFullYear()}</td>
                    <td>
                      <Button
                        className="btn btn-danger"
                        onClick={() => this.handleDelete(admin._id)}
                      >
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
    } else return <div>No Record Found</div>;
  }
}

export default ViewAdmins;
