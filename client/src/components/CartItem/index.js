import React from 'react';

import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const CartItem = ({ item }) => {

  const [, dispatch] = useStoreContext();

  const removeFromCart = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    idbPromise('cart', 'delete', { ...item });

  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });
      idbPromise('cart', 'delete', { ...item });

    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value)
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });

    }
  }

  return (
    <tr>
      <td width='70'>
        <img
          src={`/images/${item.image}`}
          alt={item.name}
        />
      </td>
      <td>
        <h5 className='cart-product-name'>{item.name}</h5>
        <div className='cart-product-price'>${item.price}</div>
      </td>
      <td className='text-center'>
        
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
        </td>
        <td className='text-center'>
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
    <i className="fa-solid fa-trash-can"></i>
            {/* X */}
          </span>
        
        </td>
      </tr>
  );
}

export default CartItem;