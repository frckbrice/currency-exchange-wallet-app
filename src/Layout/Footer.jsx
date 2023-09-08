
import classes from "./Footer.module.css";
import reactLogo from "../assets/react.svg";

const Footer = (props) => {
  return (
    <footer className={classes.footer}>
      <div className={classes.divfooterconetent}>
        <h1 style={{ fontFamily: "Philosopher", fontSize: "18px" }}>
          &copy; avom brice, 2023 <br /> visit &nbsp;{" "}
          <a
            href="rebaseacademy.com"
            style={{ color: "indigo", fontStyle: "italic" }}
          >
            rebaseacademy.com
          </a>
        </h1>
      </div>
      <div>
        <img src={reactLogo} className={classes.logo} alt="React logo" />{" "}
      </div>
      <div className={classes.subdiv2}>
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
            Can select currency a see value to base =&gt; &quot; Convert &quot;
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
