import React from "react";
import PropTypes from "prop-types";
import classes from "../Main.module.css";

const ListItem = (props) => {
    const handleDepositCurrency = (e) => {
      props.showCurrencyTabElement(true,e.target.className);
    };

  return (
    <ul className={classes.ul}>
      <li onClick={handleDepositCurrency} className="deposit-currency">
        Deposit
      </li>
      <li onClick={handleDepositCurrency} className="balance-currency">
        Balance
      </li>
      <li onClick={handleDepositCurrency} className="add-cash">
        Add Cash to Balance
      </li>

      <li onClick={handleDepositCurrency} className="value-of-currency">
        Set Default C. & Values.
      </li>
    </ul>
  );
};

ListItem.propTypes = {
  showCurrencyTabElement: PropTypes.func,
  handleDepositCurrency: PropTypes.func,
};

export default ListItem;
