import React, { Fragment, useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import classes from "./modal.module.css";
import { CurrencyContext } from "./CurrencyContext";

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portal = document.getElementById("portal");
const Modal = (props) => {
  const [input_value, setInput_value] = useState(0);
  const [resultIsHighlighted, setResultIsHighlighted] = useState(false);
  let {
    localStorCurrencies,
    substractFromCurrencyToTarget,
    setBaseCurrency,
    addCashToCurrency,
    partAmountConverted,
  } = useContext(CurrencyContext);
  const [result, setResult] = useState(0);
  const [source_currency, setSource_currency] = useState("source");
  const [target_currency, setTarget_currency] = useState("target");

  const btnClasses = `${classes["print-result"]} ${
    resultIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (result === 0) {
      return;
    }
    setResultIsHighlighted(true);

    const timer = setTimeout(() => {
      setResultIsHighlighted(false);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [result]);

  if (!props.openModal) {
    return null;
  }

  const handleChange = (event) => {
    switch (event.target.name) {
      case "base_currency":
        setSource_currency(event.target.value);
        setBaseCurrency(event.target.value);
        break;

      case "away_currency":
        setTarget_currency(event.target.value);
        break;

      case "input_value":
        setInput_value(event.target.value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    substractFromCurrencyToTarget(
      event.target.elements.input_value.value,
      event.target.elements.base_currency.value,
      event.target.elements.away_currency.value
    );
    setTarget_currency(event.target.elements.away_currency.value);
    setResult(partAmountConverted);
  };

  const handleSaveResult = () => {
    addCashToCurrency(target_currency, partAmountConverted);
    document.getElementById('partAmountConverted').textContent = 0;
  };

  return (
    <Fragment>
      <div className={classes.overlay}></div>
      {ReactDOM.createPortal(
        <ModalOverlay>
          <form onSubmit={handleSubmit} className={classes["modal-form"]}>
            <div className={classes["div-modal-contennt"]}>
              <div className={classes["div-modal-label"]}>
                <div>
                  <label
                    htmlFor="amount"
                    style={{ fontFamily: "Philosopher", fontSize: "19px" }}
                  >
                    Enter amount :
                  </label>

                  <input
                    type="number"
                    name="input_value"
                    id="amount"
                    value={input_value}
                    onChange={handleChange}
                    placeholder="Enter the amount to be converted"
                    className={classes["input-modal"]}
                  />
                </div>
                <div className={classes["div-modal-select"]}>
                  {" "}
                  <label
                    htmlFor="select-currency1"
                    style={{ fontFamily: "Philosopher", fontSize: "19px" }}
                  >
                    {" "}
                    &nbsp; Source Curr. :
                  </label>
                  <select
                    name="base_currency"
                    className={classes.SelectModalcurrency}
                    id="select-currency1"
                    defaultValue={source_currency}
                    onChange={handleChange}
                  >
                    {localStorCurrencies.map((currency) => (
                      <option value={currency.code} key={currency.code}>
                        {currency.code}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={classes["div-modal-select"]}>
                  {" "}
                  <label
                    htmlFor="select-currency"
                    style={{ fontFamily: "Philosopher", fontSize: "19px" }}
                  >
                    {" "}
                    &nbsp; target Curr. :
                  </label>
                  <select
                    name="away_currency"
                    className={classes.SelectModalcurrency}
                    id="select-currency"
                    value={target_currency}
                    onChange={handleChange}
                  >
                    {localStorCurrencies.map((currency) => (
                      <option value={currency.code} key={currency.code}>
                        {currency.code}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={classes["div-modal-result"]}>
                <div className={classes.result}>
                  <div className={classes["result-container"]}>
                    <h3>Result :</h3>
                    <span className={btnClasses} id="partAmountConverted">
                      {partAmountConverted.toFixed(2)}
                    </span>
                  </div>
                  <button
                    type="button"
                    className={classes["btn-validate-modal"]}
                    style={{ color: "purple" }}
                    onClick={handleSaveResult}
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
                Done
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
