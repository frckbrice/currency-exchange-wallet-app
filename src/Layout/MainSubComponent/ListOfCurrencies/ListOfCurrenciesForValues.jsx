import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import classes from "./ListOfvalues.module.css";
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
    localStorCurrencies,
    getIndividualAmountConvertedToBase,
    getTotalAmountInTargetCurrency,
  } = useContext(CurrencyContext);

  const handleChange = (event) => {
    switch (event.target.name) {
      case "source_currency":
        setDefaultCurrency(event.target.value);
        setBaseCurrency(event.target.value);
        convertAllTo(event.target.value);
        setTotalAmount(getTotalAmountInTargetCurrency());
        break;

      case "target_currency1":
        setTargetcurrency1(event.target.value);
        setTargetcurrencyInput1(
          getIndividualAmountConvertedToBase(event.target.value)
        );
        console.log(getIndividualAmountConvertedToBase(event.target.value));
        break;
      case "target_currency2":
        setTargetcurrency2(event.target.value);
        setTargetcurrencyInput2(
          getIndividualAmountConvertedToBase(event.target.value)
        );
        console.log(getIndividualAmountConvertedToBase(event.target.value));
        break;
      case "target_currency3":
        setTargetcurrency3(event.target.value);
        setTargetcurrencyInput3(
          getIndividualAmountConvertedToBase(event.target.value)
        );
        console.log(getIndividualAmountConvertedToBase(event.target.value));
        break;
      default:
        return;
    }
  };

  return (
    <div className={classes.show}>
      <div className={classes["div-input"]}>
        <div className={classes["title-defaultvalue"]}>
          <span
            style={{
              fontSize: "20px",
              fontStyle: "italic",
              color: "chartreuse",
            }}
          >
            Set your default currency
          </span>
        </div>
        <select
          name="source_currency"
          className={classes.Selectcurrency}
          id="select-currency"
          value={defaultCurrency}
          onChange={handleChange}
        >
          {localStorCurrencies?.map((currency, index) => (
            <option key={index} value={currency.code}>
              {currency.code}
            </option>
          ))}
        </select>
      </div>
      <div className={classes["title-value"]}>
        <span
          style={{
            fontSize: "20px",
            fontStyle: "italic",
            color: "chartreuse",
          }}
        >
          Select the currency to see the converted value to base currency
        </span>
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
            {localStorCurrencies?.map((currency, index) => (
              <option key={index} value={currency.code}>
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
            {targetcurrencyInput1.toFixed(2)}
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
            {localStorCurrencies?.map((currency, index) => (
              <option key={index} value={currency.code}>
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
            {targetcurrencyInput2.toFixed(2)}
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
            {localStorCurrencies?.map((currency, index) => (
              <option key={index} value={currency.code}>
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
            {targetcurrencyInput3.toFixed(2)}
          </span>
        </div>
      </div>
      <div className={classes["default-convert-amount"]}>
        <span onClick={() => props.showModal()} className={classes.convert}>
          Convert from one currency to another?
        </span>
      </div>
      <div className={classes["div-total-in-default-curr"]}>
        <h1
          style={{
            fontSize: "20px",
            color: "chartreuse",
            fontStyle: "italic",
            fontFamily: "Satisfy",
          }}
        >
          Total Amount : &nbsp;&nbsp;<span>{totalAmount.toFixed(2)}</span>
          <span>&nbsp;&nbsp;{defaultCurrency}</span>
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
