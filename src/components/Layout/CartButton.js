import { useContext } from "react";
import styled from "styled-components";
import CartContext from "../../store/cart-context";
import CartBadge from "./CartBadge";

const CartButton = (props) => {
  const ctx = useContext(CartContext)

  const numberOfCartItems = ctx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount
  }, 0)
  return (
    <Button onClick={props.onClick}>
      <span className="material-symbols-outlined me-2">shopping_cart</span>

      <span>Your Cart</span>
      <CartBadge>{numberOfCartItems}</CartBadge>
    </Button>
  );
};

const Button = styled.button`
  cursor: pointer;
  font: inherit;
  border: none;
 
  background-color: #b3d6cb;
    /* border: 1px solid #e6e6e6; */
  color:  rgba(0, 0, 0, 0.8);;
  padding: 0.75rem 3rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-weight: bold;

  &:hover,
  &:active {
    background-color: #a0ccbe;
  /* border: 1px solid #cccccc; */
  }
`;

export default CartButton;
