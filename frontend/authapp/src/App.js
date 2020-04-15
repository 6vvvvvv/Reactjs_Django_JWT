import React, { Component } from "react";
import Nav from "./components/Nav";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "",
      loggedIn: localStorage.getItem("token") ? true : false,
      username: "",
    };
  }

  // Get current user token
  componentDidMount() {
    if (this.state.loggedIn) {
      fetch("http://localhost:8000/jwt/currentuser/", {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          this.setState({ username: json.username });
        });
    }
  }

  handleLogin = (e, data) => {
    e.preventDefault();
    fetch("http://localhost:8000/jwt/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        localStorage.setItem("token", json.token);
        console.log(json);
        this.setState({
          loggedIn: true,
          display: "",
          username: json.username,
        });
      });
  };

  hhandleSignup = (e, data) => {
    e.preventDefault();
    fetch("http://localhost:8000/jwt/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    // https://stackoverflow.com/questions/38380462/syntaxerror-unexpected-token-o-in-json-at-position-1
      .then((res) => JSON.parse(JSON.stringify(res)))
      .then((json) => {
        localStorage.setItem("token", json.token);
        console.log(json);
        this.setState({
          loggedIn: true,
          display: "",
          username: json.username,
        });
      });
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.setState({ loggedIn: false, username: "" });
  };

  displayForm = (form) => {
    this.setState({
      display: form,
    });
  };

  render() {
    // conditional return view
    let form;
    switch (this.state.display) {
      case "login":
        form = <Login handleLogin={this.handleLogin} />;
        break;
      case "signup":
        form = <Signup hhandleSignup={this.hhandleSignup} />;
        break;
      default:
        form = null;
    }

    return (
      <div className="App">
        <Nav
          loggedIn={this.state.loggedIn}
          displayForm={this.displayForm}
          handleLogout={this.handleLogout}
        />
        {form}
        <h3>{this.state.loggedIn ? "You Have Logged In" : null}</h3>
      </div>
    );
  }
}

export default App;
