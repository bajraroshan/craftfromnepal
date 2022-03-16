import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import "./style.css";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      console.log(data);
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      console.log(cart);
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <Table striped hover size="md">
        <thead>
          <tr>
            <th colSpan={2}>Product Name</th>
            <th className="text-center">Quantity</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        {state.cart.length ? (
          <tbody>
            {state.cart.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}

            <tr>
              <td colSpan={4}>
                <div className="total-row">
                  <strong>Total: ${calculateTotal()}</strong>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={4} className='text-right'>
                {Auth.loggedIn() ? (
                  <button onClick={submitCheckout}>Checkout</button>
                ) : (
                  <span>(log in to check out)</span>
                )}
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={4}>
                <h3>You haven't added anything to your cart yet!</h3>
              </td>
            </tr>
          </tbody>
        )}
      </Table>
    </div>
  );
};

export default Cart;
