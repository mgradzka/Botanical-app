import styled from "styled-components";

const CartItem = (props) => {
  const price = Number(props.price).toFixed(2);

  return (
    <ListItem>
      <div>
        <h5>{props.name}</h5>
        <div>
          <span>{props.amount} x </span>
          <span>{price} EUR </span>
        </div>
      </div>
      <div className="d-flex gap-2">
        <button className="btn btn-secondary rounded-0" onClick={props.onRemove}>−</button>
        <button className="btn btn-secondary rounded-0" onClick={props.onAdd}>+</button>
      </div>
    </ListItem>
  );
};

const ListItem = styled.li`
display: flex;
justify-content: space-between;
align-items: center;
border-bottom: 1px solid grey;
padding: 1rem 0;
margin: 1rem 0;

& h4 {
    margin: 0 0 0.5rem 0;
    color: #363636;
  }
`
export default CartItem;
