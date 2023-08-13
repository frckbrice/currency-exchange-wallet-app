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
        depositRef.current.style.background = "#dddddd6b";
        depositRef.current.style.color = "rgb(127,255,0";
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
        balanceRef.current.style.background = "#dddddd6b";
        balanceRef.current.style.color = "rgb(127,255,0";
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
        addRef.current.style.background = "#dddddd6b";
        addRef.current.style.color = "rgb(127,255,0";
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
        valueRef.current.style.background = "#dddddd6b";
        valueRef.current.style.color = "rgb(127,255,0";
        balanceRef.current.style.color = "";
        addRef.current.style.color = "";
        break;
      default:
        return;
    }
  };

  const selectTag = (
    <select name="select" id="select" className={classes["select-less-than-475"]}>
      <option value="" selected hidden>
        Select Action
      </option>
      <option
        value="deposit"
        onClick={handleDepositCurrency}
        className="deposit-currency"
        ref={depositRef}
      >
        Deposit
      </option>
      <option
        value="balance"
        onClick={handleDepositCurrency}
        className="balance-currency"
        ref={balanceRef}
      >
        Balance
      </option>
      <option
        value="add"
        onClick={handleDepositCurrency}
        className="add-cash"
        ref={addRef}
      >
        Add Cash
      </option>
      <option
        value="convert"
        onClick={handleDepositCurrency}
        className="value-of-currency"
        ref={valueRef}
      >
        Convert
      </option>
    </select>
  );

  const ul = (
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

  const show = window.document.documentElement.scrollWidth;
  console.log(show);

  return <>{show <= 475 ? selectTag : ul}</>;
};

ListItem.propTypes = {
  showCurrencyTabElement: PropTypes.func,
  handleDepositCurrency: PropTypes.func,
};

export default ListItem;
