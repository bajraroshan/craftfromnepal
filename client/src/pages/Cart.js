import React from "react";
import { Container } from "react-bootstrap";

import Cart from "../components/Cart";

const CartPage = () => {
  return (
    <>
      <Container className="py-5">
        <Cart />
      </Container>
    </>
  );
};

export default CartPage;