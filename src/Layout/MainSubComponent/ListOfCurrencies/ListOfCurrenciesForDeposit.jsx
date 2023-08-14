import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import classes from "../../Main.module.css";
import { CurrencyContext } from "../CurrencyContext";

//1. add comment on top of the line eslint error : "eslint-disable-next-line react/display-name"

/*2. or add this to your own project:
module.exports = {
  rules: {
    "react/display-name": "off",
  }
}
 */

const ListOfCurrenciesForDeposit = (props) => {
  const [targetcurrency1, setTargetcurrency1] = useState("USD");
  const [targetcurrencyInput1, setTargetcurrencyInput1] = useState(0);
  // const [targetcurrency2, setTargetcurrency2] = useState("EUR");
  // const [targetcurrencyInput2, setTargetcurrencyInput2] = useState(0);
  // const [targetcurrency3, setTargetcurrency3] = useState("CHF");
  // const [targetcurrencyInput3, setTargetcurrencyInput3] = useState(0);

  //* call of context
  const { depositCurrencies, depositCurrency } = useContext(CurrencyContext);

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

    //* sending currency value and amount to context
    depositCurrency(
      event.target.elements.target_currency1.value,
      event.target.elements.input_target_currency1.value
    );
event.target.elements.input_target_currency1.value = ' ';

    // depositCurrencies(newFormData);

  };

  // localStorage.removeItem("currencies");
  return (
    <form className={classes.show} onSubmit={handleSubmit}>
      <div className={classes["title-adding-balance"]}>
        <h1>
          {" "}
          Deposit of Cash in the Wallet{" "}
          <span
            style={{
              fontSize: "18px",
              fontStyle: "italic",
              color: "chartreuse",
            }}
          >
            choose the currency needed
          </span>
        </h1>
      </div>
      <div className={classes["p-input"]}>
        <div className={classes["div-input1"]}>
          <select
            name="target_currency1"
            className={classes.SelectTargetcurrency}
            id="select-currency"
            value={targetcurrency1}
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
            // onChange={(e) => setTargetcurrencyInput1(e.target.value)}
            placeholder="Enter Amount"
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
            placeholder="Enter  Amount"
          />
        </div> */}
        {/* <div className={classes["div-input1"]}>
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
            placeholder="Enter Amount"
          />
        </div> */}
      </div>
      <div className={classes["div-submit"]}>
        <button type="submit" className={classes["submit-btn"]}>
          Save
        </button>
      </div>
    </form>
  );
};

//3. or add this here to fix the display name es-lint warning
ListOfCurrenciesForDeposit.displayName = "ListOfCurrency";

ListOfCurrenciesForDeposit.propTypes = {
  listOfCurrency: PropTypes.object,
  currency: PropTypes.array,
  setTargetcurrency1: PropTypes.func,
};

export default ListOfCurrenciesForDeposit;
