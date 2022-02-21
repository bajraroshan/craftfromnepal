import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="p-5 mt-5" >
        <Container>
            <Row>
                <Col xs lg="12" className="text-center">
                    Copyright &copy; 2022. All rights reserved.
                </Col>
            </Row>
        </Container>
    </footer>
  );
}

export default Footer;