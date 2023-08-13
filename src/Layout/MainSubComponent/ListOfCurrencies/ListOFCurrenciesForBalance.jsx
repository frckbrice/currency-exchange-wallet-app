import React, { useState, useContext, useEffect } from "react";
import Proptypes from "prop-types";
import classes from "../../Main.module.css";
import { CurrencyContext } from "../CurrencyContext.jsx";

const ListOfCurrenciesForBalance = (props) => {
  const [targetCurrency1, setTargetcurrency1] = useState("XAF");
  const [targetcurrencyInput1, setTargetcurrencyInput1] = useState(0);
  // const [targetcurrency2, setTargetcurrency2] = useState("EUR");
  // const [targetcurrencyInput2, setTargetcurrencyInput2] = useState(0);
  // const [targetcurrency3, setTargetcurrency3] = useState("CHF");
  // const [targetcurrencyInput3, setTargetcurrencyInput3] = useState(0);

  // to call up the context
  const { getIndividualAmount, localStorCurrencies } =
    useContext(CurrencyContext);

  // if selected value the value of balance is update from the context

  const handleChange = (e) => {
    if (e.target.name == "target_currency1" && e.target.value) {
      setTargetcurrency1(e.target.value);
      // const value = getIndividualAmount(e.target.value);
      setTargetcurrencyInput1(getIndividualAmount(e.target.value));
    }
    // if (e.target.name == "target_currency2" && e.target.value) {
    //   setTargetcurrency2(e.target.value);
    //   setTargetcurrencyInput2(getIndividualAmount(e.target.value));
    // }
    // if (e.target.name == "target_currency3" && e.target.value) {
    //   console.log(getIndividualAmount(e.target.value));
    //   setTargetcurrencyInput3(getIndividualAmount(e.target.value));
    // }
  };

  return (
    <div className={classes.show}>
      <div className={classes["title-adding-balance"]}>
        <h1
          style={{
            fontStyle: "italic",
            color: "chartreuse",
          }}
        >
          Balance of the Wallet
        </h1>
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
            {localStorCurrencies?.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code}
              </option>
            ))}
          </select>
          <span
            type="number"
            id="usd"
            placeholder="Amount"
            className={classes["span-balance"]}
          >
            {targetcurrencyInput1.toFixed(2)}
          </span>
        </div>
        {/* <div className={classes["div-input1"]}>
          <select
            name="target_currency2"
            className={classes.SelectTargetcurrency}
            id="select-currency"
            value={targetcurrency2}
            onChange={handleChange}
          >
            {localStorCurrencies?.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code}
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
            {localStorCurrencies?.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code}
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
        </div> */}
      </div>
      <div style={{ marginTop: "5%", display:'flex', justifyContent:'flex-start', alignItem:'center' }}>
        <span onClick={() => props.showModal()} className={classes.convert}>
          Convert ?
        </span>
      </div>
    </div>
  );
};

ListOfCurrenciesForBalance.prototype = {
  targetCurrency1:Proptypes.string,
  setTargetcurrencyInput1: Proptypes.func,
  targetcurrencyInput1: Proptypes.number,
  localStorCurrencies: Proptypes.array,
  currency:Proptypes.object,
  handleChange:Proptypes.func,
}

export default ListOfCurrenciesForBalance;

//