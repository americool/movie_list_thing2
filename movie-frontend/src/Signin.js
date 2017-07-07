import React, { Component } from 'react';
import { Redirect } from 'react-router'
// import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password:'',
      redirect: false,
  };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(key) {
    return function (e) {
      let state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    axios.post('http://localhost:4000/user_token', {
      auth: {
        email: email,
        password: password,
      }
    }).then((res) => {
      alert('Signed In!');
      localStorage.setItem('jwt', res.data.jwt);
      this.getUserInfo(res.data.jwt);
    }).catch((error) => {
      console.log(error)
      alert("Don't Have That Email/Password Combo...");
    });
  }

  getUserInfo(jwt){
    axios.post('http://localhost:4000/users/get_user', {
      payload: jwt
    }).then((res) => {
      localStorage.setItem('email', res.data.email);
      localStorage.setItem('userID', res.data.id)
      this.setState({redirect:true});
    }).catch((error)=> {
      console.log(error)
    })
  }

  render(){
    if (this.state.redirect){
      return <Redirect to='/'/>;
    }
    return(
      <div>
        <p> YO! </p>
        <form onSubmit={this.handleSubmit}>
          <label> Email:
          <input type="text" value={this.state.email} onChange={this.handleChange('email')} />
          </label><br/>
          <label> Password:
          <input type="text" value={this.state.password} onChange={this.handleChange('password')}/>
          </label><br/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default Signin;
