import React, { Component } from "react";
import axios from "axios";
import baseURL from "../Service/Index";
import cookie from "react-cookies";
import { Table } from "reactstrap";
import { Redirect } from "react-router-dom";
// import { CSVLink } from "react-csv";

class OyoData extends Component {
  state = {
    data: [],
    csvdata: []
  };

  componentDidMount() {
    let token = cookie.load("token");
    let auth = {
      headers: {
        "x-auth-token": token
      }
    };
    axios
      .get(baseURL + `oyo`, auth)
      .then(res => {
        console.log(res.data);
        // let csvd = ;
        this.setState({
          data: res.data.data,
          csvdata: [
            ["Mobile Number", "Date and Time"],
            ["8791431819", "time"],
            ["7946137845", "itme2"]
          ]
        });
      })
      .catch(err => {
        console.log("ji");
      });
  }

  render() {
    let token = cookie.load("token");
    if (token === undefined) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="mt-4">
        <h4>OyoRooms Data</h4>
        {/* <CSVLink
            filename={"oyodata.csv"}
            className="btn btn-primary pt-2"
            data={this.state.csvdata}
          >
            Export
          </CSVLink> */}
        <div className="card">
          <Table responsive>
            <thead style={{ background: "#2F353A", color: "white" }}>
              <tr>
                <th>S.No</th>
                <th>Mobile Number</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((data, i) => {
                return (
                  <tr key={data._id}>
                    <th>{i + 1}</th>
                    <td>{data.mobile}</td>
                    <td>
                      <p>
                        {new Date(data.createdAt).getDate() +
                          "-" +
                          `${new Date(data.createdAt).getMonth() + 1}` +
                          "-" +
                          new Date(data.createdAt).getFullYear() +
                          ", " +
                          new Date(data.createdAt).getHours() +
                          ":" +
                          new Date(data.createdAt).getMinutes() +
                          ":" +
                          new Date(data.createdAt).getSeconds()}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default OyoData;
