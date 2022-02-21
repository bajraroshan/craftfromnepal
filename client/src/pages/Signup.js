import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import { Card, Col, Row, Container, Form, Button } from "react-bootstrap";

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
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
              <Card.Title className="mb-3">Create an Account</Card.Title>

              <Form onSubmit={handleFormSubmit}>

              <Form.Group className="mb-3">
                  <Form.Control
                    type="firstName"
                    placeholder="First Name"
                    name="firstName"
                    id="firstName"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="lastName"
                    placeholder="Last Name"
                    name="lastName"
                    id="lastName"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Your Email"
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

                <Button type="submit">Register</Button>

                <p className="mt-3">Have already an account? <Link to="/login">Login here</Link></p>
                </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
