import React, {Component} from 'react';
import { Redirect} from 'react-router-dom';
import cookie from 'react-cookies';
import swal from 'sweetalert';

class Logout extends Component {
  render() {
    cookie.remove('token')
    swal("Logout successfully", "", "success");
    return <Redirect to='/login' />
  }
}

export default Logout;
