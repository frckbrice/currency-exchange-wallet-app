import PropTypes from "prop-types";
import classes from "../Main.module.css";
import { useRef} from "react";

const ListItemSelectTag = (props) => {
  const depositRef = useRef(null);
  const balanceRef = useRef(null);
  const addRef = useRef(null);
  const valueRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    console.log("clicked on select tag");
    props.showCurrencyTabElement(true, e.target.value);
    const { value } = e.target;
    switch (value) {
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

  return (
    <>
      {" "}
      <select
        name="select"
        id="select"
        className={classes["select-less-than-475"]}
        defaultValue='undefinded'
        onChange={handleClick}
      >
        <option name="deposit" value="deposit-currency" ref={depositRef}>
          Select action
        </option>
        <option name="deposit" value="deposit-currency" ref={depositRef}>
          Deposit
        </option>
        <option name="balance" value="balance-currency" ref={balanceRef}>
          Balance
        </option>
        <option name="add" value="add-cash" ref={addRef}>
          Add Cash
        </option>
        <option name="convert" value="value-of-currency" ref={valueRef}>
          Convert
        </option>
      </select>
    </>
  );
};

ListItemSelectTag.propTypes = {
  showCurrencyTabElement: PropTypes.func,
  handleClick: PropTypes.func,
};

export default ListItemSelectTag;
