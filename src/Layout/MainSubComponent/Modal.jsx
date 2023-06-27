import React, { Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import classes from "./modal.module.css";

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portal = document.getElementById("portal");
const Modal = (props) => {
  const [value, setValue] = useState("0");
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  // useEffect(() => {
  //   if (meals.length === 0) {
  //     return;
  //   }
  //   setBtnIsHighlighted(true);

  //   const timer = setTimeout(() => {
  //     setBtnIsHighlighted(false);
  //   }, 300);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, []);

  if (!props.openModal) {
    return null;
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const btnClasses = `${classes["print-result"]} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  return (
    <Fragment>
      <div className={classes.overlay}></div>
      {ReactDOM.createPortal(
        <ModalOverlay>
          <form onSubmit={handleSubmit} className={classes["modal-form"]}>
            <div className={classes["div-modal-contennt"]}>
              <div className={classes["div-modal-label"]}>
                <div>
                  <label htmlFor="amount">Enter amount :</label>

                  <input
                    type="text"
                    id="amount"
                    value={value}
                    onChange={handleChange}
                    placeholder="Enter the amount to be converted"
                    className={classes["input-modal"]}
                  />
                </div>
                <div className={classes["div-modal-select"]}>
                  {" "}
                  <label
                    htmlFor="select-currency"
                    style={{ fontFamily: "Philosopher" }}
                  >
                    {" "}
                    target Curr.
                  </label>
                  <select
                    name="currency"
                    className={classes.SelectModalcurrency}
                    id="select-currency"
                  >
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                    <option value="xaf">XAF</option>
                  </select>
                </div>
              </div>
              <div className={classes["div-modal-result"]}>
                <div className={classes.result}>
                  <div className={classes["result-container"]}>
                    <h3>Result :</h3>
                    <h3 className={btnClasses}>Resultat</h3>
                  </div>
                  <button
                    type="submit"
                    className={classes["btn-validate-modal"]}
                    style={{ color: "purple" }}
                  >
                    Save to wallet
                  </button>
                </div>
              </div>
            </div>
            <div className={classes["div-modal-btn"]}>
              <button type="submit" className={classes["btn-validate-modal"]}>
                Convert 
              </button>
              <button
                type="button"
                onClick={props.onClose}
                className={classes["btn-cancel-modal"]}
              >
                Cancel
              </button>
            </div>
          </form>
        </ModalOverlay>,
        portal
      )}
    </Fragment>
  );
};

export default Modal;
