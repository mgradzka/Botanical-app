import React, { useContext, useState } from "react";
import styled from "styled-components";

import CartItem from "./CartItem";
import { ThreeCircles } from "react-loader-spinner";

import Button from "../UI/Button";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Items = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 20rem;
  overflow: auto;
`;

const Cart = (props) => {
  const [checkout, setCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, isSuccess] = useState(false);
  const ctx = useContext(CartContext);

  const totalAmount = Number(ctx.totalAmount).toFixed(2);
  const hasItems = ctx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
     await fetch(
      "https://plants-app-ef536-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: ctx.items,
        }),
      }
    );
    setIsSubmitting(false);
    isSuccess(true);
    ctx.clearCart()
  };

  const cartItems = (
    <Items>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </Items>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div>
        {ctx.items.length === 0 && <p>Your cart is empty!</p>}
        {ctx.items.length > 0 && (
          <div className="d-flex justify-content-between mt-4">
            <h4>Total Amount: </h4>
            <h4>{totalAmount} EUR</h4>
          </div>
        )}
      </div>
      {checkout && (
        <Checkout onSubmit={submitOrderHandler} onClick={props.onHideModal} />
      )}
      {!checkout && (
        <div className="d-flex gap-2 mt-4 justify-content-end">
          <Button $bg onClick={props.onHideModal}>
            Close
          </Button>
          {hasItems && <Button onClick={orderHandler}>Order</Button>}
        </div>
      )}
    </>
  );

  const contentIsSubmitting = (
    <ThreeCircles
      height="50"
      width="50"
      color="#337a63"
      wrapperStyle={{ justifyContent: "center", margin: "5rem 0" }}
      visible={true}
      ariaLabel="three-circles-rotating"
    />
  );

  const contentIsSubmitted = (
    <>
      <h3 className="mb-3">Thank you!</h3>
      <p>Your order is successfully sent!</p>
      <div className="d-flex justify-content-end">
        <Button $bg onClick={props.onHideModal} className="justify-self-end">
          Close
        </Button>
      </div>
    </>
  );

  return (
    <Modal onClick={props.onHideModal}>
      {!isSubmitting && !success && cartModalContent}
      {isSubmitting && contentIsSubmitting}
      {success && contentIsSubmitted}
    </Modal>
  );
};

export default Cart;
