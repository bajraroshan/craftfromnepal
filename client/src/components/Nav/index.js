import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import logo from "../../assets/craftnepal.png";

import { QUERY_CATEGORIES } from "../../utils/queries";

function Nav() {
  function showCategories() {}

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul class="navbar-nav mr-auto">
          <li className="mx-1">
            <Link to="/orderHistory">Order History</Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul class="navbar-nav mr-auto">
          <li className="mx-1">
            <Link to="/signup">Signup</Link>
          </li>
          <li className="mx-1">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-sm-3 col-lg-2">
            <h1>
              <Link to="/">
                <img src={logo} alt="Craft from Nepal" />
              </Link>
            </h1>
          </div>
          <div className="col-sm-9 col-lg-10">
            <nav className="navbar">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                {showNavigation()}
              </div>
            </nav>
            
          </div>
        </div>
      </div>
    </header>
  );
}

export default Nav;
