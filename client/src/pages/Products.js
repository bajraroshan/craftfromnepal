import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CategoryMenu from "../components/CategoryMenu";
import ProductList from "../components/ProductList";
// import Cart from "../components/Cart";

const Products = () => {
  return (
    <>
      <Container className="pt-5">
        <Row>
          <Col xs="12" md="4" lg="3">
            <CategoryMenu />
          </Col>
          <Col xs="12" md="8" lg="9">
            <ProductList />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Products;
