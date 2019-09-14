import React from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import baseURL from '../../Categories/Service/Index';
import cookie from 'react-cookies';
class ForgotPassword extends React.Component {

state={
    email:'',
    successmsg:'',
    send:false,
    errormsg:''
}


changeHandler = e => {
    e.preventDefault();
    const target=e.target
    const name=target.name
    const value=target.value
    this.setState({
        [name]:value
    })
}

sendEmail = (e) =>{
    e.preventDefault();
    let token = cookie.load('token');
    let auth = {
      headers: {
        'x-auth-token': token
      }
    }
    axios.post(baseURL+`admin/auth/forgetpassword`, {email:this.state.email} , auth).then(res=>{
        console.log(res);
        this.setState({
            successmsg:res.data.message,
          })
          setTimeout(() => this.setState({send: true}), 1000)
        }).catch(err=>{
            console.log(err);
            this.setState({
                errormsg:err.message,
                email:''
            })

        })
}



render() {
        let {successmsg, send, errormsg,email} = this.state
        return (
                <div className="col-5 card p-5" style={{margin: '8em auto'}}>
                <h3 className="col-12 mb-4">Reset your password</h3>
                <Form className="col-12" onSubmit={this.sendEmail}>
                      <FormGroup>
                                  <Input type="email"
                                  name="email"
                                  placeholder="Enter Your Email"
                                  required
                                  value={email}
                                  onChange={this.changeHandler}/>
                        </FormGroup>
                    <button type="submit" className="btn btn-primary" color="primary">Send Email</button>
                </Form>
                {send ? <p style={{color:'green'}}>{successmsg}</p> : <p style={{color:'red'}}>{errormsg}</p>  }
            </div>
        );
    }
}

export default ForgotPassword;
