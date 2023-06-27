import React, { useState, useContext } from "react";
import Proptypes from "prop-types";
import classes from "../../Main.module.css";
import { CurrencyContext } from "../CurrencyContext";

const ListOfCurrenciesForAdding = (props) => {
  const [targetCurrency1, setTargetcurrency1] = useState("XAF");
  const [targetcurrencyInput1, setTargetcurrencyInput1] = useState(0);
  const [targetcurrency2, setTargetcurrency2] = useState("EUR");
  const [targetcurrencyInput2, setTargetcurrencyInput2] = useState(0);
  const [targetcurrency3, setTargetcurrency3] = useState("CHF");
  const [targetcurrencyInput3, setTargetcurrencyInput3] = useState(0);

  const { addCashToCurrency } = useContext(CurrencyContext);

  const handleSubmit = (e) => {
    e.preventdefault();
     if (targetCurrency1 && targetcurrencyInput1) {
       addCashToCurrency(targetCurrency1, targetcurrencyInput1);
     }
     if (targetcurrency2 && targetcurrencyInput2) {
       addCashToCurrency(targetCurrency1, targetcurrencyInput1);
     }
     if (targetcurrency3 && targetcurrencyInput3) {
       addCashToCurrency(targetCurrency1, targetcurrencyInput1);
     }
  };

  return (
    <form className={classes.show} onSubmit={handleSubmit}>
      <div className={classes['title-adding-balance']}>
        <h1>Add Cash In The Balance</h1>
      </div>
      <div className={classes["p-input"]}>
        <div className={classes["div-input1"]}>
          <select
            name="target_currency1"
            className={classes.SelectTargetcurrency}
            id="select-currency"
            value={targetCurrency1}
            onChange={(e) => setTargetcurrency1(e.target.value)}
          >
            {Object.entries(props.listOfCurrency).map((currency) => (
              <option key={currency[0]} value={currency[0]}>
                {currency[0]}
              </option>
            ))}
          </select>
          <input
            type="number"
            id="usd"
            name="input_target_currency1"
            onChange={(e) => setTargetcurrencyInput1(e.target.value)}
            placeholder="USD"
          />
        </div>
        <div className={classes["div-input1"]}>
          <select
            name="target_currency2"
            className={classes.SelectTargetcurrency}
            id="select-currency"
            value={targetcurrency2}
            onChange={(e) => setTargetcurrency2(e.target.value)}
          >
            {Object.entries(props.listOfCurrency).map((currency) => (
              <option key={currency[0]} value={currency[0]}>
                {currency[0]}
              </option>
            ))}
          </select>
          <input
            type="number"
            id="eur"
            name="input_target_currency2"
            onChange={(e) => setTargetcurrencyInput2(e.target.value)}
            placeholder="EUR"
          />
        </div>
        <div className={classes["div-input1"]}>
          <select
            name="target_currency3"
            className={classes.SelectTargetcurrency}
            id="select-currency"
            value={targetcurrency3}
            onChange={(e) => setTargetcurrency3(e.target.value)}
          >
            {Object.entries(props.listOfCurrency).map((currency) => (
              <option key={currency[0]} value={currency[0]}>
                {currency[0]}
              </option>
            ))}
          </select>
          <input
            type="number"
            id="chf"
            name="input_target_currency3"
            onChange={(e) => setTargetcurrencyInput3(e.target.value)}
            placeholder="CHF"
          />
        </div>
      </div>
      <div className={classes["div-submit"]}>
        <button type="submit" className={classes["submit-btn"]}>
          Save
        </button>
      </div>
    </form>
  );
};

export default ListOfCurrenciesForAdding;
