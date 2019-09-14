import React from "react";
import axios from "axios";
import { Table, Button } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import baseURL from "../Service/Index";
import cookie from "react-cookies";

class ViewCategory extends React.Component {
  state = {
    category: [],
    loading: true,
    status: "",
    categoryId: "",
    email: "",
    role: ""
  };

  toggle = _id => {
    let token = cookie.load("token");
    let auth = {
      headers: {
        "x-auth-token": token
      }
    };
    const categoryId = _id;
    axios
      .post(baseURL + `admin/services/hideCategory`, { categoryId }, auth)
      .then(res => {
        this.componentDidMount();
      })
      .catch(err => {});
  };

  componentDidMount() {
    let token = cookie.load("token");
    if (token === undefined) {
      return <Redirect to="/login" />;
    }
    let auth = {
      headers: {
        "x-auth-token": token
      }
    };
    axios
      .get(baseURL + `admin/services/category`, auth)
      .then(res => {
        this.setState({
          category: res.data.category,
          loading: false,
          email: res.data.email,
          role: res.data.role
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  createAdmin = () => {
    const { role } = this.state;
    return role === "admin" && role !== "super";
  };

  render() {
    // console.log(this.state.email)
    let token = cookie.load("token");
    if (token === undefined) {
      return <Redirect to="/login" />;
    }

    if (this.state.category !== null) {
      return (
        <div className="mt-5">
          <Button tag={Link} className="mb-4" to="/addcategory" color="primary">
            Add Category
          </Button>
          <Button
            tag={Link}
            className="float-right mb-2"
            to={`/changepassword/${this.state.email}`}
            color="primary"
          >
            Change Password
          </Button>

          <Table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Category</th>
                <th>Summary</th>
                <th>Date Created</th>
                <th>Status</th>
                <th />
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.category.map((category, i) => {
                return (
                  <tr key={category._id}>
                    <th>{i + 1}</th>
                    <td>{category.name}</td>
                    <td>
                      <p>{category.summary}</p>
                    </td>
                    <td>{category.createdAt.slice(0, 10)}</td>
                    <td>
                      {category.status === 0 ? (
                        <Button
                          className="btn btn-info"
                          onClick={() => this.toggle(category._id)}
                        >
                          Activate
                        </Button>
                      ) : (
                        <Button
                          onClick={() => this.toggle(category._id)}
                          className="btn btn-secondary"
                        >
                          Deactivate
                        </Button>
                      )}
                    </td>
                    <td />
                    <td>
                      <Button
                        tag={Link}
                        disabled={category.status === 0 ? true : false}
                        to={`/viewlocation/${category._id}`}
                        color="primary"
                      >
                        Locations
                      </Button>
                    </td>
                    <td>
                      <Button
                        tag={Link}
                        to={`/editcategory/${category._id}`}
                        disabled={category.status === 0 ? true : false}
                        outline="outline"
                        color="danger"
                      >
                        Edit
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

export default ViewCategory;
