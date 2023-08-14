
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes["div-title"]}>
        <div>
          <h5>WITH YOUR </h5>
        </div>
        <div>
          <h1>CURRENCY WALLET</h1>
          <h5 style={{ textAlign: "end" }}> YOU </h5>
        </div>
        <span className={classes["span-underlined"]}></span>
      </div>
      <div>
        <div className={classes["div-description"]}>
          <span>Can deposit cash =&gt; &quot;Deposit&quot;</span>

          <span>Can check the balance =&gt; &quot;Balance &quot;</span>
          <span>Can set default currency =&gt; &quot;Convert&quot;</span>
          <span>
            Can add cash on existing cash at any time =&gt; &quot; Add Cash&quot;
          </span>

          <span>
            Can convert from currency to currency and update both currency
            contents =&gt; &quot; Convert&quot;
          </span>
        </div>
      </div>
    </header>
  );
};


export default Header;
