import React, { useState } from "react";
import { Card, Col, Row, Container, Form, Button } from "react-bootstrap";
const FORM_ENDPOINT =
  "https://public.herotofu.com/v1/ce1c9020-9383-11ec-bdf8-dd9c99f898ec";

const Contact = () => {
  const [status, setStatus] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();

    // Anything you need to inject dynamically
    const injectedData = {
      DYNAMIC_DATA_EXAMPLE: 123,
    };
    const inputs = e.target.elements;
    const data = {};

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].name) {
        data[inputs[i].name] = inputs[i].value;
      }
    }

    Object.assign(data, injectedData);

    fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        // It's likely a spam/bot request, so bypass it to validate via captcha
        if (response.status === 422) {
          Object.keys(injectedData).forEach((key) => {
            const el = document.createElement("input");
            el.type = "hidden";
            el.name = key;
            el.value = injectedData[key];

            e.target.appendChild(el);
          });

          e.target.submit();
          throw new Error("Please finish the captcha challenge");
        }

        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then(() => setStatus("We'll be in touch soon."))
      .catch((err) => setStatus(err.toString()));
  };

  if (status) {
    return (
      <Container className="py-5 my-5">
        <Row className="justify-content-md-center">
          <Col xs lg="4" className="text-center">
            <h2>Thank you!</h2>
            <p>{status}</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-md-center">
        <Col xs lg="4">
          <Card className="signin-box">
            <Card.Body>
              <Card.Title className="mb-3">Contact Us</Card.Title>
              <Form
                onSubmit={handleSubmit}
                action={FORM_ENDPOINT}
                method="POST"
                target="_blank"
              >
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Your Full Name"
                    name="name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Your Email"
                    name="email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="tel"
                    placeholder="Your Phone Number"
                    name="phone"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    placeholder="Your Message"
                    name="message"
                    rows={3}
                  />
                </Form.Group>
                <Button type="submit">Send a message</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
