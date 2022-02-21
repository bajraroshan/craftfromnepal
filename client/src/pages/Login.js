import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import { Card, Col, Row, Container, Form, Button } from "react-bootstrap";

function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-md-center">
        <Col xs lg="4">
          <Card className="signin-box">
            <Card.Body>
              <Card.Title className="mb-3">Sign In</Card.Title>

              <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Username/Email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                  />
                </Form.Group>
                {error ? (
                  <div>
                    <p className="error-text">
                      The provided credentials are incorrect
                    </p>
                  </div>
                ) : null}
                <Button type="submit">Login</Button>

                <p className="mt-3">Don't have an account? <Link to="/signup">Register here</Link></p>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
