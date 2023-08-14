import React, { useState, useContext } from "react";
import Proptypes from "prop-types";
import classes from "../../Main.module.css";
import { CurrencyContext } from "../CurrencyContext";

const ListOfCurrenciesForAdding = (props) => {
  const [targetcurrency1, setTargetcurrency1] = useState("Currency");
  const [targetcurrencyInput1, setTargetcurrencyInput1] = useState(0);
  // const [targetcurrency2, setTargetcurrency2] = useState("EUR");
  // const [targetcurrencyInput2, setTargetcurrencyInput2] = useState(0);
  // const [targetcurrency3, setTargetcurrency3] = useState("CHF");
  // const [targetcurrencyInput3, setTargetcurrencyInput3] = useState(0);

  const { addCashToCurrencies, localStorCurrencies, addCashToCurrency } =
    useContext(CurrencyContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    // const newFormData = [
    //   {
    //     code: targetcurrency1,
    //     totalAmountInWallet: parseFloat(targetcurrencyInput1),
    //     totalAmountInWalletConvertedTotarget: 0,
    //   },
    //   {
    //     code: targetcurrency2,
    //     totalAmountInWallet: parseFloat(targetcurrencyInput2),
    //     totalAmountInWalletConvertedTotarget: 0,
    //   },
    //   {
    //     code: targetcurrency3,
    //     totalAmountInWallet: parseFloat(targetcurrencyInput3),
    //     totalAmountInWalletConvertedTotarget: 0,
    //   },
    // ];

    // addCashToCurrencies(newFormData);
     addCashToCurrency(
       event.target.elements.target_currency1.value,
       event.target.elements.input_target_currency1.value
     );
   event.target.elements.input_target_currency1.value = ' ';
  };

  return (
    <form className={classes.show} onSubmit={handleSubmit}>
      <div className={classes["title-adding-balance"]}>
        <h1
          style={{
            fontStyle: "italic",
            color: "white",
            marginLeft: '20px'
          }}
        >
          Add Cash to the existing In The Wallet
        </h1>
      </div>

      <div className={classes["div-input1"]}>
        <select
          name="target_currency1"
          className={classes.SelectTargetcurrency}
          id="select-currency"
          value={targetcurrency1}
          onChange={(e) => setTargetcurrency1(e.target.value)}
        >
          <option>select a currency</option>
          {localStorCurrencies?.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code}
            </option>
          ))}
        </select>
        <input
          type="number"
          id="usd"
          name="input_target_currency1"
          placeholder="Amount"
          className={classes.inputcurrency}
        />
      </div>

      {/* <div className={classes["div-input1"]}>
          <select
            name="target_currency2"
            className={classes.SelectTargetcurrency}
            id="select-currency"
            value={targetcurrency2}
            onChange={(e) => setTargetcurrency2(e.target.value)}
          >
            {localStorCurrencies?.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code}
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
            {localStorCurrencies?.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code}
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
        </div> */}

      <div className={classes["div-submit"]}>
        <button type="submit" className={classes["submit-btn"]}>
          Save
        </button>
      </div>
    </form>
  );
};

export default ListOfCurrenciesForAdding;
