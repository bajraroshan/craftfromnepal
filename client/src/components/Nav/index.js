import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

import logo from "../../assets/craftnepal.png";

function Navigation() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <>
          <Nav.Item>
            <Nav.Link href="/" onClick={() => Auth.logout()}>
              Logout
            </Nav.Link>
          </Nav.Item>
        </>
      );
    } else {
      return (
        <>
          <Nav.Item>
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/signup" className="nav-link">
              Signup
            </Link>
          </Nav.Item>
        </>
      );
    }
  }

  return (
    <header>
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
            <Navbar>
              <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse
                  id="basic-navbar-nav"
                  className="justify-content-end"
                >
                  <Nav>
                    <Nav.Item>
                      <Link to="/" className="nav-link">
                        Home
                      </Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Link to="/products" className="nav-link">
                        Products
                      </Link>
                    </Nav.Item>
                    {showNavigation()}

                    <Nav.Item>
                      <Link to="/cart" className="nav-link">
                        Cart
                      </Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Link to="/contact" className="nav-link">
                        Contact
                      </Link>
                    </Nav.Item>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navigation;
