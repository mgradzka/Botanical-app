import React, { useState } from "react";
import Button from "../UI/Button";


function Checkout(props) {

  const [userData, setUserData] = useState({
    name: "",
    street: "",
    postal: "",
    city: "",
  });

  const [inputValidity, setInputValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const inputChangeHandler = (event) => {
    const { id, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [id]: value,
    }));
  };

  const validateInput = (id, value) => {
    return value.trim() !== "";
  };

  const inputBlurHandler = (event) => {
    const { id, value } = event.target;
    setInputValidity((prevInputValidity) => ({
      ...prevInputValidity,
      [id]: validateInput(id, value),
    }));
  };

  const confirmFormHandler = (e) => {
    e.preventDefault();

    // Validate all input fields
    const isNameValid = validateInput("name", userData.name);
    const isStreetValid = validateInput("street", userData.street);
    const isPostalValid = validateInput("postal", userData.postal);
    const isCityValid = validateInput("city", userData.city);

    if (isNameValid && isStreetValid && isPostalValid && isCityValid) {
      // Do something with the entered data
      console.log("User Data:", userData);
      props.onSubmit(userData)
    } else {
      // Handle validation errors
      setInputValidity({
        name: isNameValid,
        street: isStreetValid,
        postal: isPostalValid,
        city: isCityValid,
      });
    }
  };

  return (
    <form onSubmit={confirmFormHandler} className="mt-4">
      <div className="input-group mt-2">
        <label htmlFor="name" className="align-self-center me-3">Your Name</label>
        <input
          type="text"
          className={`form-control ${!inputValidity.name ? "is-invalid" : ""}`}
          id="name"
          value={userData.name}
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler}
        />
        {!inputValidity.name && <div className="invalid-feedback">Name is required.</div>}
      </div>
      <div className="input-group mt-2">
        <label htmlFor="street" className="align-self-center me-3">Street</label>
        <input
          className={`form-control ${!inputValidity.street ? "is-invalid" : ""}`}
          type="text"
          id="street"
          value={userData.street}
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler}
        />
        {!inputValidity.street && <div className="invalid-feedback">Street is required.</div>}
      </div>
      <div className="input-group mt-2">
        <label htmlFor="postal" className="align-self-center me-3">Postal Code</label>
        <input
          className={`form-control ${!inputValidity.postal ? "is-invalid" : ""}`}
          type="text"
          id="postal"
          value={userData.postal}
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler}
        />
        {!inputValidity.postal && <div className="invalid-feedback">Postal code is required.</div>}
      </div>
      <div className="input-group mt-2">
        <label htmlFor="city" className="align-self-center me-3">City</label>
        <input
          className={`form-control ${!inputValidity.city ? "is-invalid" : ""}`}
          type="text"
          id="city"
          value={userData.city}
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler}
        />
        {!inputValidity.city && <div className="invalid-feedback">City is required.</div>}
      </div>
      <div className="d-flex gap-2 mt-4 justify-content-end">
        <Button type="button" $bg onClick={props.onClick}>
          Cancel
        </Button>
        <Button>Confirm</Button>
      </div>
    </form>
  );
}

export default Checkout;
