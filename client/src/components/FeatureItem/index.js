import React from "react";
import { Link } from "react-router-dom";

import { Col } from "react-bootstrap";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function FeatureItem(item) {
  const [state, dispatch] = useStoreContext();

  const { image, name, _id, price, quantity } = item;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <Col xs md="4" lg="3">
      <div className="card single-product">
      <Link to={`/products/${_id}`}>
        <img alt={name} src={`/images/${image}`} />
        <h3>{name}</h3>
      </Link>
      <div className="product-price">${price}</div>
      <div className="product-btns">
        <div className="btn">
        <Link to={`/products/${_id}`}>Read More</Link>
        </div>
      {quantity <= 0 ? (
          <button onClick={addToCart} disabled>Add to cart</button>
        ) : (
          <button onClick={addToCart}>Add to cart</button>
        )}
        </div>
        </div>
    </Col>
  );
}

export default FeatureItem;
