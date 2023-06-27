import React from "react";
import PropTypes from "prop-types";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <center>
      <header className={classes.header}>EXCHANGE CURRENCY WALLET</header>
    </center>
  );
};

Header.propTypes = {};

export default Header;
