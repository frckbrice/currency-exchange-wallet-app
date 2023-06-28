import React, { createContext, useState, useMemo, useCallback } from "react";
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

const base_currency = {
  code: "USD",
  totalAmountInWallet: 0,
  totalAmountInWalletConvertedTotarget: 0,
};

const from = "";
const to = "";
// localStorage.removeItem("currencies");

const CurrencyProvider = (props) => {
  const [currencies, setCurrencies] = useState([]);
  const [totalAmountConverted, setTotalAmountConverted] = useState(0);
  const [from, setFrom] = useState(base_currency);
  const [to, setTo] = useState("");
  let { listOfCurrencies } = useCurrency(`${from}`, to);

  const { localStorCurrencies, setlocalStorCurrencies } = useLocalStorage(
    "currencies",
    []
  );

  //* set currency base
  const setBaseCurrency = useCallback(
    (currency) => {
      setFrom(currency);
      const base = {
        ...base_currency,
        code: currency,
        listOfCurrencies: listOfCurrencies,
      };
      setCurrencies([base, ...currencies]);
    },
    [listOfCurrencies, currencies]
  );

  //* deposit currency
  const depositCurrency = useCallback(
    (targetCurrency, amount) => {
      let currencyData = {
        ...base_currency,
        code: targetCurrency,
        totalAmountInWallet: amount,
        totalAmountInWalletConvertedTotarget: 0,
      };
      console.log(
        "%c in add depositCurrency , currency is : ",
        "color:red",
        currencyData
      );

      setCurrencies([...currencies, currencyData]);

      {
        currencies.length != 0 ? setlocalStorCurrencies(currencies) : "";
      }
      currencyData = {};
      console.log(
        "%c in add depositCurrency , currencies is : ",
        "color:green",
        currencies
      );
    },
    [currencies, setlocalStorCurrencies]
  );

  //* get individual currencies
  const getIndividualAmount = useCallback(
    (targetCurrency) => {
      console.log(
        "%c in add getIndividualAmount , currency is : ",
        "color:green"
      );
      return (
        localStorCurrencies.find((currency) => currency.code === targetCurrency)
          ?.totalAmountInWallet || 0
      );
    },
    [localStorCurrencies]
  );

  //* add Cash to currency
  const addCashToCurrency = useCallback(
    (targetcurrency, amount) => {
      const newCurrencies = localStorCurrencies.map((currency) => {
        if (currency.code === targetcurrency) {
          console.log("adding ...");
          return {
            ...currency,
            totalAmountInWallet: currency.totalAmountInWallet + amount,
          };
        } else {
          return alert(
            "this currency doesn't exist in the wallet. you can deposit it before"
          );
        }
      });

      setCurrencies([...newCurrencies]);
      {
        newCurrencies.length != 0 ? setlocalStorCurrencies(currencies) : "";
      }
    },
    [currencies, setlocalStorCurrencies, localStorCurrencies]
  );

  //* deposit currencies
  const depositCurrencies = useCallback(
    (arrayOfCurrencies) => {
      let newCurrencies = [];
      {
        newCurrencies =
          currencies.length !== 0
            ? (newCurrencies = arrayOfCurrencies?.reduce(
                (acc, curr) => {
                  if (
                    !localStorCurrencies?.findIndex(
                      (item) => item.code == curr.code
                    ) !== -1
                  ) {
                    [...acc, curr];
                  }
                  return acc;
                },
                [...localStorCurrencies]
              ))
            : currencies.concat(arrayOfCurrencies);
      }

      setCurrencies([...newCurrencies]);
      // store to localStorage
      {
        currencies.length != 0 ? setlocalStorCurrencies(currencies) : "";
      }

      console.log(
        "%c in add depositCurrency , currencies is : ",
        "color:green",
        newCurrencies
      );
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
                    console.log("add if existing");
                    acc[index].totalAmountInWallet += curr.totalAmountInWallet;
                  } else {
                    return alert(
                      `The currency ${curr.code} doesn't exist. need to deposit it first`
                    );
                  }
                  return acc;
                },
                [...localStorCurrencies]
              )
            : "";
      }
      // update currencies
      setCurrencies([...newCurrencies]);
      // store to local storage
      {
        currencies.length != 0 ? setlocalStorCurrencies(currencies) : "";
      }

      console.log(
        "%c in add depositCurrency , currencies is : ",
        "color:green",
        newCurrencies
      );
    },
    [currencies, setlocalStorCurrencies, localStorCurrencies]
  );

  const convertAllTo = useCallback(
    (targetCurrency) => {
      console.log("%c in add convertAllTo , currency is : ", "color:red");
      let newCurrencies = currencies.map((currency) => {
        return {
          ...currency,
          totalAmountInWalletConvertedTotarget:
            currency.totalAmountInWallet * currency[targetCurrency],
        };
      });
      setCurrencies([...newCurrencies]);
      setlocalStorCurrencies(currencies);
    },
    [currencies, setlocalStorCurrencies]
  );

  const getTotalAmountInTargetCurrency = useCallback(
    (targetCurrencyCode) => {
      console.log(
        "%c in add getTotalAmountInTargetCurrency , currency is : ",
        "color:red"
      );
      const newCurrencies = convertAllTo(targetCurrencyCode);
      const totalAmount = newCurrencies.reduce(
        (totalConvertedAmount, currency) => {
          return (
            totalConvertedAmount + currency.totalAmountInWalletConvertedTotarget
          );
        },
        0
      );
      {
        totalAmount != 0 ? setTotalAmountConverted(totalAmount) : "";
      }
    },
    [convertAllTo]
  );

  const convertPartFromCurrencyToTarget = useMemo(
    (amount, sourceCurrencyCode, targetCurrencyCode) => {
      //   console.log(
      //     "%c in add convertPartFromCurrencyToTarget , currency is : ",
      //     "color:red"
      //   );
      //   const currArray = currencies.map((currency) =>
      //     currency.code === sourceCurrencyCode
      //       ? {
      //           ...currency,
      //           totalAmountInWallet: currency.totalAmountInWallet - amount,
      //         }
      //       : currency
      //   );
      //   const source = currencies.find(
      //     (currency) => currency.code === sourceCurrencyCode
      //   );
      //   const newAmount = amount * source.listOfCurrencies[targetCurrencyCode];
      //   const newCurrencies = currArray.map((currency) =>
      //     currency.code == targetCurrencyCode
      //       ? {
      //           ...currency,
      //           totalAmountInWallet: currency.totalAmountInWallet + newAmount,
      //         }
      //       : currency
      //   );
      //   setCurrencies([...newCurrencies]);
      //   setlocalStorCurrencies(currencies);
      //   return { newAmount, currencies };
    },
    [currencies]
  );

  const values = {
    currencies,
    depositCurrency,
    setBaseCurrency,
    addCashToCurrency,
    depositCurrencies,
    convertAllTo,
    totalAmountConverted,
    getIndividualAmount,
    addCashToCurrencies,
    convertPartFromCurrencyToTarget,
    getTotalAmountInTargetCurrency,
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
};

export default CurrencyProvider;
