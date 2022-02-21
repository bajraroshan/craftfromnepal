import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { pluralize } from "../utils/helpers";
import { useQuery } from "@apollo/client";

import { Container, Row, Col } from "react-bootstrap";

import Cart from "../components/Cart";
import { useStoreContext } from "../utils/GlobalState";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from "../utils/actions";
import { QUERY_PRODUCTS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import spinner from "../assets/spinner.gif";

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise("products", "get").then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...currentProduct, purchaseQuantity: 1 });
    }
  };


  return (
    <>
      {currentProduct && cart ? (
        <Container className="py-5">
          <Row>
            <Col xs="12" lg="6">
              <img
                src={`/images/${currentProduct.image}`}
                alt={currentProduct.name}
              />
            </Col>
            <Col xs="12" lg="6">
              <div className="product-details">
                <h2 className="hr">{currentProduct.name}</h2>
                <div className="product-detail-price hr">
                  ${currentProduct.price}{" "}
                </div>
                <div className="product-detail-desc hr">
                  {currentProduct.description}
                </div>
                
                  {currentProduct.quantity <= 0 ? (
                    <>
                    <div className="qty-stock hr">
                    <p style={{ color: "red" }}>Out Of Stock</p>
                    </div>
                    <div className="add-to-cart">
                    <button disabled onClick={addToCart}>Add to Cart</button>
                  </div>
                  </>
                  ) : (
                    <>
                    <div className="qty-stock hr">
                    <p style={{ color: "green" }}>
                      {currentProduct.quantity}{" "}
                      {pluralize("item", currentProduct.quantity)} in stock
                    </p>
                    </div>
                    <div className="add-to-cart">
                    <button onClick={addToCart}>Add to Cart</button>
                    </div>
                    </>
                  )}
                </div>

                
            </Col>
          </Row>
        </Container>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </>
  );
}

export default Detail;
