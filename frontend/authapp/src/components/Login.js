import React, { Component } from 'react'
import "./Style.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s3"></div>
          <div className="col s6 m6">
            <div className="card-content pink-text session">
              <form onSubmit={(e) => this.props.handleLogin(e, this.state)}>
                <div className="center-align title">
                  <h4>Login</h4>
                </div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <div className="center-align submitButton">
                  <button
                    className="btn waves-effect waves-light"
                    type="submit"
                    name="action"
                    onClick={(e) => {
                      this.props.handleLogin(e, this.state);
                      console.log(e);
                    }}
                  >
                    Submit
                    <i className="material-icons right">send</i>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col s3"></div>
        </div>
      </div>
    );
  }
}

export default Login;
