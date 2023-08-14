import PropTypes from "prop-types";
import classes from "../Main.module.css";
import { useRef } from "react";

const ListItem = (props) => {
  const depositRef = useRef(null);
  const balanceRef = useRef(null);
  const addRef = useRef(null);
  const valueRef = useRef(null);

  const handleDepositCurrency = (e) => {
    props.showCurrencyTabElement(true, e.target.className);
    switch (e.target.className) {
      case "deposit-currency":
        depositRef.current.focus();
        depositRef.current.style.background = "#fff";
        depositRef.current.style.color = "black";
        balanceRef.current.style.background = "";
        addRef.current.style.background = "";
        valueRef.current.style.background = "";
        valueRef.current.style.color = "";
        balanceRef.current.style.color = "";
        addRef.current.style.color = "";
        break;
      case "balance-currency":
        balanceRef.current.focus();
        depositRef.current.style.background = "";
        balanceRef.current.style.background = "#fff";
        balanceRef.current.style.color = "black";
        addRef.current.style.background = "";
        valueRef.current.style.background = "";
        valueRef.current.style.color = "";
        depositRef.current.style.color = "";
        addRef.current.style.color = "";
        break;
      case "add-cash":
        addRef.current.focus();
        depositRef.current.style.background = "";
        balanceRef.current.style.background = "";
        addRef.current.style.background = "#fff";
        addRef.current.style.color = "black";
        valueRef.current.style.background = "";
        valueRef.current.style.color = "";
        depositRef.current.style.color = "";
        balanceRef.current.style.color = "";
        break;
      case "value-of-currency":
        valueRef.current.focus();
        depositRef.current.style.background = "";
        depositRef.current.style.color = "";
        balanceRef.current.style.background = "";
        addRef.current.style.background = "";
        valueRef.current.style.background = "#fff";
        valueRef.current.style.color = "black";
        balanceRef.current.style.color = "";
        addRef.current.style.color = "";
        break;
      default:
        return;
    }
  };

  return (
    
      <ul className={classes.ul}>
        <li
          onClick={handleDepositCurrency}
          className="deposit-currency"
          ref={depositRef}
        >
          Deposit
        </li>
        <li
          onClick={handleDepositCurrency}
          className="balance-currency"
          ref={balanceRef}
        >
          Balance
        </li>
        <li onClick={handleDepositCurrency} className="add-cash" ref={addRef}>
          Add Cash
        </li>

        <li
          onClick={handleDepositCurrency}
          className="value-of-currency"
          ref={valueRef}
        >
          convert
        </li>
      </ul>
    
  );
};

ListItem.propTypes = {
  showCurrencyTabElement: PropTypes.func,
  handleDepositCurrency: PropTypes.func,
};

export default ListItem;
