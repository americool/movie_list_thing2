import React, { Component } from 'react';
import { Redirect } from 'react-router'
import axios from 'axios';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password:'',
      passwordConfirmation:'',
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
    const {email, password, passwordConfirmation} = this.state;
    axios.post('http://localhost:4000/users', {
      user: {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation
      }
    }).then((res) => {
      alert('Success! New Account Created!!!');
      this.setState({redirect:true})
    }).catch((error) => {
      const errorString = this.makeErrorString(error.response.data)
      alert(errorString);
    });
  }

  makeErrorString(obj) {
    let errorString = "Could not create User for the following reasons: \n";
    for (var key in obj) {
      errorString += key.charAt(0).toUpperCase() + key.slice(1) + ":\n"
      obj[key].forEach(function(error){
        errorString += "    - " + error.charAt(0).toUpperCase() + error.slice(1) + "\n";
      })
    }
    return errorString;
  }


  render() {
    if (this.state.redirect){
      return <Redirect to='/'/>;
    }
    return(
      <div>
        <p> SIGN UP </p>
        <form onSubmit={this.handleSubmit}>
          <label> Email:
          <input type="text" value={this.state.email} onChange={this.handleChange('email')} />
          </label><br/>
          <label> Password:
          <input type="text" value={this.state.password} onChange={this.handleChange('password')}/>
          </label><br/>
          <label> Password Confirmation:
          <input type="text" value={this.state.passwordConfirmation} onChange={this.handleChange('passwordConfirmation')} />
          </label><br/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default SignUp;
