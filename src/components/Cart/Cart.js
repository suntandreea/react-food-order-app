import {useContext, useState} from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from './Checkout';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount: 1});
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderButtonHandler = () => {
    setShowCheckout(prevShowCheckout => !prevShowCheckout);
  };

  const submitOrderHandler = (userData) => {
    setIsSubmitting(true);
    fetch('https://react-apps-d4fbe-default-rtdb.firebaseio.com/food-order/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
    });
    setIsSubmitting(false);
    setIsSuccessful(true);
    cartCtx.clearCart();
  };

  const cartModalContent = <>
    {cartItems}
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
    </div>
    {showCheckout && <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />}
    {!showCheckout && <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && <button className={classes.button} onClick={orderButtonHandler}>Order</button>}
    </div>}
  </>;

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !isSuccessful && cartModalContent}
      {isSubmitting && <p>Sending order data ...</p>}
      {isSuccessful && <p>Order successfully placed!</p>}
    </Modal>
  );
};

export default Cart;
