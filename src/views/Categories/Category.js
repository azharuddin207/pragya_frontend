import React from 'react';
import ViewCategory from './compnents/ViewCategory';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap'
import cookie from 'react-cookies';
import {Redirect} from 'react-router-dom';

class Category extends React.Component {


  render() {
    let token = cookie.load('token')
    // console.log(token);
    if(token === undefined ) {
      return <Redirect to='/login' />
    }

    return (<div>
      {/* <Button tag={Link} className="mb-4" to="/AddCategory" color="primary">Add Category</Button> */}
      {/* <Button tag={Link} className="mb-4 float-right" to="/logout" color="danger">Logout</Button> */}
     
     <ViewCategory/>

    </div>)
  }
}

export default Category;
