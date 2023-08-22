import { createContext, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
import { useCurrency } from "./Api";
import { useLocalStorage } from "../components/useLocalStorage";

export const CurrencyContext = createContext({
  currencies: [],
  getTotalAmountInTargetCurrency: () => {},
  depositCurrency: () => {},
  convertAllTo: () => {},
  getIndividualAmount: () => {},
  addCashToCurrency: () => {},
  convertPartFromCurrencyToTarget: () => {},
});

const base_cur = {
  code: "USD",
  listOfCurrencies: {},
};

// localStorage.removeItem("currencies");

const CurrencyProvider = (props) => {
  const [currencies, setCurrencies] = useState([]);
  const [totalAmountConverted, setTotalAmountConverted] = useState(0);
  const [from, setFrom] = useState(base_cur.code);
  const [to, setTo] = useState("");
  const { localStorCurrencies, setlocalStorCurrencies } = useLocalStorage(
    "currencies",
    []
  );

  const [base_currency, setBase_currency] = useState("");
  let [partAmountConverted, setPartAmountConverted] = useState(0);
  let { listOfCurrencies } = useCurrency(`${from}`, to);

  // console.log(listOfCurrencies.CHF);
  //* add Cash to currency
  const addCashToCurrency = useCallback(
    (targetcurrency, amount) => {

      console.log(targetcurrency, amount)
      let newCurrencies = localStorCurrencies?.map((currency) =>
        currency.code === targetcurrency
          ? {
              ...currency,
              totalAmountInWallet: +currency.totalAmountInWallet + +amount,
            }
          : currency
      );

      if (newCurrencies.length != 0) {
        setlocalStorCurrencies(newCurrencies);
        setCurrencies(newCurrencies);
        console.log(newCurrencies);
        toast.success("amount saved successfully in the wallet!");
        newCurrencies = [];
      }
      return;
    },
    [setlocalStorCurrencies, localStorCurrencies]
  );

  //* deposit currency
  const depositCurrency = useCallback(
    (targetCurrency, amount) => {
      let newcurrencies = [];
      let currencyData = {};
      if (targetCurrency && amount) {
        currencyData = {
          code: targetCurrency,
          totalAmountInWallet: +amount,
          totalAmountInWalletConvertedTotarget: 0,
        };
        console.log(
          "%c in add depositCurrency , currency is : ",
          "color:red",
          currencyData
        );
        if (localStorCurrencies.length === 0) {
          console.log("local storage empty ");
          console.log(typeof currencies);
          setCurrencies([...currencies, currencyData]);
          setlocalStorCurrencies([...currencies, currencyData]);
        } else {
          console.log("local storage not empty ");
          const found = localStorCurrencies.some(
            (currency) => currency.code === currencyData.code
          );
          if (!found) {
            // newcurrencies = [...currencies, currencyData];
            console.log("currency not found", newcurrencies);
            setCurrencies([...currencies, currencyData]);
            setlocalStorCurrencies([...currencies, currencyData]);
          } else {
            addCashToCurrency(targetCurrency, amount);
            console.log("currency found");
          }
        }
      } else {
        alert("NO Currency OR Amount added!");
        return;
      }

      console.log(
        "%c in add depositCurrency , currencies is : ",
        "color:green",
        newcurrencies
      );
    },
    [currencies, localStorCurrencies, setlocalStorCurrencies, addCashToCurrency]
  );

  //* get individual amount from currency
  const getIndividualAmount = useCallback(
    (targetCurrency) => {
      console.log("%c in getIndividualAmount : ", "color:tomato");
      console.log(localStorCurrencies);
      const targetValue =
        localStorCurrencies?.find(
          (currency) => currency.code === targetCurrency
        )?.totalAmountInWallet || 0.00;
      console.log(targetCurrency, targetValue);
      return +targetValue;
    },
    [localStorCurrencies]
  );

  //* get individual currency converted to base
  const getIndividualAmountConvertedToBase = useCallback(
    (targetCurrency) => {
      console.log(
        "%c in getIndividualAmountConvertedToBase : ",
        "color:tomato"
      );
      let value = 0;
      if (localStorCurrencies.length > 0) {
        value = localStorCurrencies.find(
          (currency) => currency.code === targetCurrency
        )?.totalAmountInWalletConvertedTotarget;
      } else {
        alert("No currency in the Wallet!");
      }

      return +value;
    },
    [localStorCurrencies]
  );

  //* deposit currencies
  const depositCurrencies = useCallback(
    (arrayOfCurrencies) => {
      let newCurrencies = [];
      console.log(
        "%c at the starting in add depositCurrency , currencies is : ",
        "color:purple",
        currencies
      );
      console.log(
        "%c at the starting in add depositCurrency , arrayOfCurrencies is : ",
        "color:pink",
        arrayOfCurrencies
      );

      newCurrencies =
        localStorCurrencies?.length !== 0
          ? arrayOfCurrencies?.reduce(
              (acc, curr) => {
                if (
                  !localStorCurrencies?.find((item) => item.code == curr.code)
                ) {
                  acc.push(curr);
                }
                return acc;
              },
              [...localStorCurrencies]
            )
          : (newCurrencies = currencies.concat(arrayOfCurrencies));

      console.log("befor update: currencies", currencies);
      console.log("befor update: newcurrencies", newCurrencies);

      if (newCurrencies.length > 1) {
        setCurrencies(newCurrencies);
        console.log("after update: currencies", currencies);
        toast.success(
          "Currencies and amount saved successfully in the wallet!"
        );
        setlocalStorCurrencies(currencies);
        console.log(
          "%c in add depositCurrency , currencies is : ",
          "color:green",
          currencies
        );
      }

      newCurrencies = [];
      // store to localStorage
    },
    [currencies, setlocalStorCurrencies, localStorCurrencies]
  );

  //* add Cash to currencies
  const addCashToCurrencies = useCallback(
    (arrayOfCurrencies) => {
      let newCurrencies = [];
      // check if currency already exists then add if not, nothing todo.
      {
        newCurrencies =
          localStorCurrencies.length != 0
            ? arrayOfCurrencies?.reduce(
                (acc, curr) => {
                  let index = localStorCurrencies?.findIndex(
                    (item) => item.code == curr.code
                  );
                  if (index !== -1) {
                    console.log("add in existing");
                    acc[index].totalAmountInWallet += +curr.totalAmountInWallet;
                  } else {
                    return alert(
                      `The currency ${curr.code} doesn't exist. need to deposit it first`
                    );
                  }
                  return acc;
                },
                [...localStorCurrencies]
              )
            : [];
      }
      {
        // update currencies
        newCurrencies.length > 1 ? setCurrencies(newCurrencies) : "";
      }
      toast.success(" Amount Added successfully in the wallet!");
      // store to local storage
      {
        currencies.length > 1 ? setlocalStorCurrencies(currencies) : "";
      }

      console.log(
        "%c addCashToCurrencies , currencies is : ",
        "color:green",
        newCurrencies
      );
    },
    [currencies, setlocalStorCurrencies, localStorCurrencies]
  );

  //* set  base currency
  const setBaseCurrency = useCallback(
    (basecurrency) => {
      // sset the base currency to fetch the truth rate from api
      setFrom(basecurrency);
      const base = {
        code: basecurrency,
        listOfCurrencies: listOfCurrencies,
      };
      setBase_currency(base);
      toast.success("Base currency successfully set !");
    },
    [listOfCurrencies, setBase_currency]
  );

  //* convert all currencies to base currency
  const convertAllTo = useCallback(
    (baseCurrency) => {
      let newCurrencies = [];
      // if is basecurrency it has already been settled in the function above. then we can now have listofcurrencies updated accordingly to basecurrency.
      if (baseCurrency) {
        newCurrencies =
          localStorCurrencies.length > 0
            ? localStorCurrencies?.map((currency) => ({
                ...currency,
                totalAmountInWalletConvertedTotarget:
                  currency.totalAmountInWallet *
                  listOfCurrencies[`${currency.code}`],
              }))
            : [];
      }

      // update currencies
      if (newCurrencies.length > 0) {
        setCurrencies(newCurrencies);
        // store to local storage
        setlocalStorCurrencies(newCurrencies);
        toast.success(
          "All Currencies successfully converted to base currency !"
        );
      } else {
        alert("No currency in the Wallet!");
      }
    },
    [setlocalStorCurrencies, localStorCurrencies, listOfCurrencies]
  );

  //* get total amount of currencies converted to base currency
  const getTotalAmountInBaseCurrency = useCallback(
    (baseCurrency) => {
      let totalAmount = 0;
      if (localStorCurrencies.length > 0 && baseCurrency) {
        totalAmount = localStorCurrencies?.reduce(
          (totalConvertedAmount, currency) =>
            totalConvertedAmount +
            currency.totalAmountInWalletConvertedTotarget,
          0
        );
        setTotalAmountConverted(totalAmount);
      }

      return totalAmount || 0;
    },
    [localStorCurrencies, base_currency]
  );

  //* substract part of currency in balance
  const substractFromCurrencyToTarget = useCallback(
    (amount, sourceCurrencyCode, targetCurrencyCode) => {
      let currArray = [];
      let newAmount = 0;
      console.log('sourceCurr', sourceCurrencyCode)
      console.log("targetcurr", targetCurrencyCode);
      if (
        localStorCurrencies.length > 0 &&
        sourceCurrencyCode &&
        targetCurrencyCode &&
        amount
        
      ) {
        console.log("in  substractFromCurrencyToTarget all ok ");
        currArray = localStorCurrencies?.map((currency) =>
          currency.code === sourceCurrencyCode
            ? {
                ...currency,
                totalAmountInWallet: currency.totalAmountInWallet - amount,
              }
            : currency
        );
        setCurrencies(currArray);
        // set base currency to fetch truth value from api
        setFrom(sourceCurrencyCode);
        console.log(listOfCurrencies[`${targetCurrencyCode}`]);
        newAmount = amount * listOfCurrencies[`${targetCurrencyCode}`];
        setPartAmountConverted(newAmount);
        setlocalStorCurrencies(currArray);
        toast.success("Operation successfull. Check your Wallet Account!");
      } else {
        alert("No currency in the Wallet! or No correct values entered");
      }
    },
    [listOfCurrencies, setlocalStorCurrencies, localStorCurrencies]
  );

  const values = {
    localStorCurrencies,

    depositCurrency,
    partAmountConverted,
    setBaseCurrency,
    addCashToCurrency,
    depositCurrencies,
    convertAllTo,
    totalAmountConverted,
    getIndividualAmount,
    addCashToCurrencies,
    getIndividualAmountConvertedToBase,
    substractFromCurrencyToTarget,
    getTotalAmountInBaseCurrency,
  };

  return (
    <CurrencyContext.Provider value={values}>
      {props.children}{" "}
    </CurrencyContext.Provider>
  );
};

CurrencyProvider.propTypes = {
  currencies: PropTypes.array,
  convertAllTo: PropTypes.func,
  convertPartFromTo: PropTypes.func,
  totalAmountConverted: PropTypes.number,
  getIndividualAmount: PropTypes.func,
  addCashToCurrency: PropTypes.func,
  addCashToCurrencies: PropTypes.func,
  setBaseCurrency: PropTypes.func,
  partAmountConverted: PropTypes.string,
};

export default CurrencyProvider;
