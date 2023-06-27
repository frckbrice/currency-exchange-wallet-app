import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import classes from "../../Main.module.css";
import { CurrencyContext } from "../CurrencyContext";

const ListOfCurrenciesForValues = (props) => {
  const [defaultCurrency, setDefaultCurrency] = useState("USD");
  const [targetCurrency1, setTargetcurrency1] = useState("USD");
  const [targetcurrencyInput1, setTargetcurrencyInput1] = useState(0);
  const [targetcurrency2, setTargetcurrency2] = useState("EUR");
  const [targetcurrencyInput2, setTargetcurrencyInput2] = useState(0);
  const [targetcurrency3, setTargetcurrency3] = useState("CHF");
  const [targetcurrencyInput3, setTargetcurrencyInput3] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const {
    convertAllTo,
    totalAmountConverted,
    setBaseCurrency,
    getIndividualAmount,
  } = useContext(CurrencyContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "source_currency") {
      setDefaultCurrency(value);
      setBaseCurrency(value, props.listOfCurrency);
      convertAllTo(value);
      setTotalAmount(totalAmountConverted);
    }
    if (name === "target_currency1" && value) {
      setTargetcurrency1(value);
      setTargetcurrencyInput1(getIndividualAmount(value));
    }
    if (name === "target_currency3" && value) {
      setTargetcurrency3(value);
      setTargetcurrencyInput2(getIndividualAmount(value));
    }
    if (name === "target_currency2" && value) {
      setTargetcurrency2(value);
      setTargetcurrencyInput3(getIndividualAmount(value));
    }
  };

  const handleSubmit = (event) => {
    event.preventdefault();
  };

  return (
    <div className={classes.show}>
      <form action="submit" onSubmit={handleSubmit}>
        <div className={classes["div-input"]}>
          <label
            htmlFor="select-currency"
            style={{
              marginLeft: "1.3%",
              marginBottom: "1.3%",
              fontSize: "18px",
              display: "none",
            }}
          >
            Select default currency
          </label>
          <select
            name="source_currency"
            className={classes.Selectcurrency}
            id="select-currency"
            value={defaultCurrency}
            onChange={handleChange}
          >
            {Object.entries(props.listOfCurrency).map((currency) => (
              <option key={currency[0]} value={currency[0]}>
                {currency[0]}
              </option>
            ))}
          </select>
        </div>

        <div className={classes["p-input"]}>
          <div className={classes["div-input1"]} >
            <select
              name="target_currency1"
              className={classes.SelectTargetcurrency}
              id="select-currency"
              value={targetCurrency1}
              onChange={handleChange}
            >
              {Object.entries(props.listOfCurrency).map((currency) => (
                <option key={currency[0]} value={currency[0]}>
                  {currency[0]}
                </option>
              ))}
            </select>

            <span
              type="number"
              id="usd"
              placeholder="USD"
              className={classes["span-balance"]}
            >
              {targetcurrencyInput1}
            </span>
          </div>
        </div>
        <div className={classes["div-input1"]}>
          <select
            name="target_currency2"
            className={classes.SelectTargetcurrency}
            id="select-currency"
            value={targetcurrency2}
            onChange={handleChange}
          >
            {Object.entries(props.listOfCurrency).map((currency) => (
              <option key={currency[0]} value={currency[0]}>
                {currency[0]}
              </option>
            ))}
          </select>
          <span
            type="number"
            id="usd"
            placeholder="USD"
            className={classes["span-balance"]}
          >
            {targetcurrencyInput2}
          </span>
        </div>
        <div className={classes["div-input1"]}>
          <select
            name="target_currency3"
            className={classes.SelectTargetcurrency}
            id="select-currency"
            value={targetcurrency3}
            onChange={handleChange}
          >
            {Object.entries(props.listOfCurrency).map((currency) => (
              <option key={currency[0]} value={currency[0]}>
                {currency[0]}
              </option>
            ))}
          </select>
          <span
            type="number"
            id="usd"
            placeholder="USD"
            className={classes["span-balance"]}
          >
            {targetcurrencyInput3}
          </span>
        </div>

        {/* <div className={classes["div-submit"]}>
          <button type="submit" className={classes["submit-btn"]}>
            Save
          </button>
        </div> */}
      </form>
      <div style={{ marginTop: "2%" }}>
        <span onClick={() => props.showModal()} className={classes.convert}>
          Convert from one currency to another?
        </span>
      </div>
      <div className={classes["div-total-in-default-curr"]}>
        <h1>
          Total Amount : <span>{totalAmount}</span>
          <span>{"  " + defaultCurrency}</span>
        </h1>
      </div>
    </div>
  );
};

ListOfCurrenciesForValues.prototype = {
  listOfCurrency: PropTypes.object,
  handleSubmit: PropTypes.func,
};

export default ListOfCurrenciesForValues;
