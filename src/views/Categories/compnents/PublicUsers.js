import React from "react";
import axios from "axios";
import { Table, Button } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import baseURL from "../Service/Index";
import cookie from "react-cookies";

class PublicUsers extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    let token = cookie.load("token");
    let auth = {
      headers: {
        "x-auth-token": token
      }
    };
    axios
      .get(baseURL + `admin/services/users`, auth)
      .then(res => {
        console.log(res.data);
        this.setState({
          users: res.data.users
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  render() {
    let token = cookie.load("token");
    if (token === undefined) {
      return <Redirect to="/login" />;
    }

    if (this.state.users !== null) {
      return (
        <div className="mt-5">
          <h3 className="mt-3 mb-3">Public Users</h3>
          <Table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Mobile</th>
                <th>Date Created</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((user, i) => {
                return (
                  <tr key={user._id}>
                    <th>{i + 1}</th>
                    <td>{user.mobile}</td>
                    <td>{new Date(user.createdAt).getDate() + "-" + new Date(user.createdAt).getMonth() + "-" + new Date(user.createdAt).getFullYear()}</td>
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

export default PublicUsers;
