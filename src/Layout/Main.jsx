import { useRef, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import reactLogo from "../assets/react.svg";
import classes from "./Main.module.css";
import ListItem from "./MainSubComponent/ListItem";
// import ListOfCurrency from "./MainSubComponent/ListOfCurrency";
import ListOfCurrenciesForBalance from "./MainSubComponent/ListOfCurrencies/ListOFCurrenciesForBalance";
import ListOfCurrenciesForDeposit from "./MainSubComponent/ListOfCurrencies/ListOfCurrenciesForDeposit";
import ListOfCurrenciesForValues from "./MainSubComponent/ListOfCurrencies/ListOfCurrenciesForValues";
import Modal from "./MainSubComponent/Modal";
import { useCurrency } from "./MainSubComponent/Api";
import ListOfCurrenciesForAdding from "./MainSubComponent/ListOfCurrencies/ListOfCurrenciesForAddingCash";
import ListItemSelectTag from "./MainSubComponent/ListItemSelectTag";

const to = "";
const from = "";

// const endpoint = "convert";
// const access_key = "ff286a1bcb9d4b340c8b641ab013dc47";

const Main = () => {
  const configRef = useRef();
  const [showCurrencyTabDeposit, setShowCurrencyTabDeposit] = useState(false);
  const [showCurrencyTabBalance, setShowCurrencyTabBalance] = useState(false);
  const [showCurrencyTabValues, setShowCurrencyTabValues] = useState(false);
  const [showCurrencyTabAdding, setShowCurrencyTabAdding] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  // const [isvideo, setIsVideo] = useState(true);

  let { listOfCurrencies } = useCurrency(from, to);

  // useEffect(() => {
  //   if(document.documentElement.scrollWidth < 476) {
  //     setIsVideo(prev => !prev)
  //     console.log(document.documentElement.scrollWidth);
  //   }
  // },[])


  const showCurrencyTabElement = useCallback((value, name) => {
    switch (name) {
      case "deposit-currency":
        console.log("deposit-currency");
        setShowCurrencyTabDeposit(value);
        setShowCurrencyTabBalance(false);
        setShowCurrencyTabValues(false);
        setShowCurrencyTabAdding(false);
        document.querySelector(".deposit-currency").style.border= '1px solide red';
        break;
        
      case "balance-currency":
        console.log("balance-currency");
        setShowCurrencyTabDeposit(false);
        setShowCurrencyTabBalance(value);
        setShowCurrencyTabValues(false);
        setShowCurrencyTabAdding(false);
        break;

      case "value-of-currency":
        console.log("value-of-currency");
        setShowCurrencyTabDeposit(false);
        setShowCurrencyTabBalance(false);
        setShowCurrencyTabValues(value);
        setShowCurrencyTabAdding(false);
        break;

      case "add-cash":
        setShowCurrencyTabAdding(true);
        setShowCurrencyTabDeposit(false);
        setShowCurrencyTabBalance(false);
        setShowCurrencyTabValues(false);
        break;
      default:
        return;
    }
    console.log('clicked')
  }, []);

  const showModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  return (
    <main className={classes.main}>
      <div className={classes.overlay}></div>
      {isOpenModal && (
        <Modal
          openModal={() => setIsOpenModal(true)}
          onClose={() => setIsOpenModal(false)}
        />
      )}
      {/* <img src={reactLogo} className={classes.logo} alt="React logo" /> */}
      <div className={classes.list}>
        {/* {isvideo ?  
          (<ListItem
            showCurrencyTabElement={showCurrencyTabElement}
            config={configRef}
          />):( <ListItemSelectTag
            showCurrencyTabElement={showCurrencyTabElement}
            config={configRef}
          />)
        } */}

        <div className={classes.displaylistitems}>
          <ListItem
            showCurrencyTabElement={showCurrencyTabElement}
            config={configRef}
          />
        </div>
        <div className={classes.displaylistitemselect}>
          <ListItemSelectTag
            showCurrencyTabElement={showCurrencyTabElement}
            config={configRef}
          />
        </div>
        {showCurrencyTabDeposit && (
          <ListOfCurrenciesForDeposit listOfCurrency={listOfCurrencies} />
        )}
        {showCurrencyTabBalance && (
          <ListOfCurrenciesForBalance
            listOfCurrency={listOfCurrencies}
            showModal={showModal}
          />
        )}
        {showCurrencyTabAdding && (
          <ListOfCurrenciesForAdding listOfCurrency={listOfCurrencies} />
        )}
        {showCurrencyTabValues && (
          <ListOfCurrenciesForValues
            showModal={showModal}
            listOfCurrency={listOfCurrencies}
          />
        )}
      </div>
      <video className={classes.video} autoPlay loop muted playsInline>
        <source
          src="https://cdn.dribbble.com/uploads/39417/original/49dbf46eae15d227fc95a69cee31251e.mp4?1657824906"
          type="video/mp4"
        />
        {/* <source
          src="https://cdn.dribbble.com/uploads/39421/original/963b4f8739cbdf86ca3f3a23245efd18.mp4?1657824985"
          type="video/mp4"
        /> */}
      </video>
      <video
        className={classes.displayimageinstead}
        // className={classes.video}
        autoPlay
        loop
        muted
        playsInline
        poster="
          https://github.githubassets.com/images/modules/site/home/globe.jpg"
      >
        <source src="" />
      </video>
    </main>
  );
};

Main.propTypes = {
  showCurrencyTab: PropTypes.bool,
  setShowCurrencyTab: PropTypes.func,
  hiddenSelectTag: PropTypes.func,
  showSubmitBtn: PropTypes.func,
  blurInputField: PropTypes.func,
  showSelectTag: PropTypes.func,
};

export default Main;
