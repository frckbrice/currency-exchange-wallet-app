
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes["div-title"]}>
        <div className={classes.subdiv1}>
          {/* <h5 className={classes.h5start}>WITH YOUR </h5> */}
        </div>
        <div className={classes.headertitle}>
          <h1>CURRENCY WALLET</h1>
          {/* <h5 className={classes.h5end}> YOU </h5> */}
        </div>
        <span className={classes["span-underlined"]}></span>
      </div>
      {/* <div className={classes.subdiv2}>
        <div className={classes["div-description"]}>
          <span>Can deposit cash =&gt; &quot;Deposit&quot;</span>

          <span>Can check the balance =&gt; &quot;Balance &quot;</span>
          <span>Can set default currency =&gt; &quot;Convert&quot;</span>
          <span>
            Can add cash on existing cash at any time =&gt; &quot; Add
            Cash&quot;
          </span>

          <span>
            Can convert from currency to currency and update both currency
            contents =&gt; &quot; Convert&quot;
          </span>
          <span>
            Can select currency a see value to base =&gt; &quot; Convert
            &quot;
          </span>
        </div>
      </div> */}
    </header>
  );
};


export default Header;
