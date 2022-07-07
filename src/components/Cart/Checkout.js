import classes from './Checkout.module.css';
import {useRef, useState} from 'react';

const isEmpty = value => value.trim() === '';
const is6Digits = value => value.trim().length === 6;

const Checkout = props => {

  const [inputsValidity, setInputsValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const submitHandler = event => {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredPostal = postalRef.current.value;
    const enteredCity = cityRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const postalIsValid = is6Digits(enteredPostal);
    const cityIsValid = !isEmpty(enteredCity);

    setInputsValidity({
      name: nameIsValid,
      street: streetIsValid,
      postal: postalIsValid,
      city: cityIsValid
    });

    let formIsValid = nameIsValid && streetIsValid && postalIsValid && cityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity
    });

  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={`${classes.control} ${!inputsValidity.name && classes.invalid}`}>
        <label htmlFor='name'>Name: </label>
        <input ref={nameRef} type='text' id='name' />
        {!inputsValidity.name && <p>Please enter valid data!</p>}
      </div>
      <div className={`${classes.control} ${!inputsValidity.street && classes.invalid}`}>
        <label htmlFor='street'>Street: </label>
        <input ref={streetRef} type='text' id='street' />
        {!inputsValidity.street && <p>Please enter valid data!</p>}
      </div>
      <div className={`${classes.control} ${!inputsValidity.postal && classes.invalid}`}>
        <label htmlFor='postal'>Postal: </label>
        <input ref={postalRef} type='text' id='postal' />
        {!inputsValidity.postal && <p>Please enter valid data!</p>}
      </div>
      <div className={`${classes.control} ${!inputsValidity.city && classes.invalid}`}>
        <label htmlFor='city'>City: </label>
        <input ref={cityRef} type='text' id='city' />
        {!inputsValidity.city && <p>Please enter valid data!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>Cancel</button>
        <button type='submit'>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;