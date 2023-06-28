import React, { useState, useContext, useEffect } from "react";
import Proptypes from "prop-types";
import classes from "../../Main.module.css";
import { CurrencyContext } from "../CurrencyContext";

const ListOfCurrenciesForBalance = (props) => {
  const [targetCurrency1, setTargetcurrency1] = useState("XAF");
  const [targetcurrencyInput1, setTargetcurrencyInput1] = useState(0);
  const [targetcurrency2, setTargetcurrency2] = useState("EUR");
  const [targetcurrencyInput2, setTargetcurrencyInput2] = useState(0);
  const [targetcurrency3, setTargetcurrency3] = useState("CHF");
  const [targetcurrencyInput3, setTargetcurrencyInput3] = useState(0);

  // to call up the context
  const { getIndividualAmount } = useContext(CurrencyContext);

  // if selected value the value of balance is update from the context

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "target_currency1" && value) {
      setTargetcurrency1(value);
      setTargetcurrencyInput1(getIndividualAmount(value));
    }
    if (name == "target_currency2" && value) {
      setTargetcurrency2(value);
      setTargetcurrencyInput2(getIndividualAmount(value));
    }
    if (name == "target_currency3" && value) {
        console.log(getIndividualAmount(value));
      setTargetcurrencyInput3(getIndividualAmount(value));
    }
  };

  return (
    <div className={classes.show}>
      <div className={classes["title-adding-balance"]}>
        <h1> Balance of the Wallet</h1>
      </div>
      <div className={classes["p-input"]}>
        <div className={classes["div-input1"]}>
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
      </div>
      <div style={{ marginTop: "5%" }}>
        <span onClick={() => props.showModal()} className={classes.convert}>
          Convert from one currency to another?
        </span>
      </div>
    </div>
  );
};

export default ListOfCurrenciesForBalance;
