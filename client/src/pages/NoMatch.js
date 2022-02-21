import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const NoMatch = () => {
  return (
    <Container className="py-5">
      <Row>
        <Col xs>
          <h1 className="py-5 text-center">404 Page Not Found</h1> 
        </Col>
      </Row>
    </Container>
  );
};

export default NoMatch;
