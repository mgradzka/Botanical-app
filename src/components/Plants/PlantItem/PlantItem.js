import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import CartContext from "../../../store/cart-context";

import PlantItemForm from "./PlantItemForm";

const PlantItem = (props) => {
  const ctx = useContext(CartContext);
  const price = Number(props.price).toFixed(2);

  const addToCartHandler = (amount) => {
    ctx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <SingleItem>
      <div>
        <img src={props.image} alt="Room full of plants" />
      </div>
      <div className="p-4">
        <h3>{props.name}</h3>
        <p>{props.description}</p>
        <span>{price} EUR</span>

        <PlantItemForm onAddToCart={addToCartHandler} id={props.id} />
      </div>
    </SingleItem>
  );
};

const SingleItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 1rem;
  width: 25rem;
  background-color: #f1f1f1;

  & span {
    margin-top: 0.25rem;
    font-weight: bold;
    color: #2d6b57;
    font-size: 1.25rem;
  }

  & img {
    object-fit: cover;
    max-width: 100%;
  }
`;

export default PlantItem;
