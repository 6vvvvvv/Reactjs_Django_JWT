import React from "react";

const Nav = (props) => {
  const loggedOutNav = (
    <ul>
      <li onClick={() => props.displayForm("signup")}>Signup</li>
      <li onClick={() => props.displayForm("login")}>Login</li>
    </ul>
  );

  const loggedInNav = (
    <ul>
      <li onClick={props.handleLogout}>Logout</li>
    </ul>
  );
  return (
    <nav>
      <div className="nav-wrapper">
        {props.loggedIn ? loggedInNav : loggedOutNav}
      </div>
      ;
    </nav>
  );
};

export default Nav;
