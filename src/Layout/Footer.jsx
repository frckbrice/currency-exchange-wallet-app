
import classes from "./Footer.module.css";

const Footer = (props) => {
  return (
    <footer className={classes.footer}>
      <h1 style={{fontFamily:'Philosopher', fontSize:'18px'}}>&copy; avom brice, 2023 <br /> visit &nbsp; <a href="rebaseacademy.com" style={{color:'indigo', fontStyle:'italic'}}>rebaseacademy.com</a></h1>
    </footer>
  );
};

export default Footer;
