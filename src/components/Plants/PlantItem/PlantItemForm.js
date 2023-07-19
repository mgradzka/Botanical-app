import React, { useRef, useState, useEffect } from "react";

import Input from "../../UI/Input";
import Button from "../../UI/Button";

const PlantItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true)
  const [buttonText, setButtonText] = useState('Add')
  const amountInputRef = useRef();

  useEffect(() => {
    if (buttonText === "Added!") {
      const timer = setTimeout(() => {
        setButtonText("Add");
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [buttonText]);
  
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false)
      return;
    }

    props.onAddToCart(enteredAmountNumber);
    setButtonText('Added!')
  };
  return (
    <form onSubmit={submitHandler} className="d-flex flex-row justify-content-between mt-4">
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          defaultValue: "1",
        }}
      />
      <Button>{buttonText}</Button>
      {!amountIsValid && <p>Please enter a valid amount.</p>}
    </form>
  );
};


export default PlantItemForm;
