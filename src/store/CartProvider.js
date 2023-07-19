import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultState = {
  items: [],
  totalAmount: 0,
};

const reducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    let updatedItems;
    const index = state.items.findIndex((el) => el.id === action.item.id);
    if (index === -1) {
      updatedItems = [...state.items, action.item];
    } else {
      updatedItems = [...state.items];
      updatedItems[index].amount += action.item.amount;
    }

    return {
      items: updatedItems,
      totalAmount: state.totalAmount + action.item.price * action.item.amount,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    let updatedItems;
    const index = state.items.findIndex((el) => el.id === action.id);
    if (state.items[index].amount === 1) {
      updatedItems = state.items.filter((el) => el.id !== action.id);
    } else {
      updatedItems = [...state.items];
      updatedItems[index].amount -= 1;
    }

    return {
      items: updatedItems,
      totalAmount: state.totalAmount - state.items[index].price,
    };
  }
  if (action.type === "CLEAR") {
    return defaultState;
  }
  return defaultState;
};

const CartProvider = (props) => {
  const [cartState, dispatch] = useReducer(reducer, defaultState);

  const addItemToCartHandler = (item) => {
    dispatch({ type: "ADD_ITEM", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatch({ type: "REMOVE_ITEM", id: id });
  };

  const clearCartHandler = () => {
    dispatch({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
