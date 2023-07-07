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

  const [base_currency, setBase_currency] = useState(base_cur);
  const [partAmountConverted, setPartAmountConverted] = useState(0);
  let { listOfCurrencies } = useCurrency(`${from}`, to);

  // console.log(listOfCurrencies.CHF);

  //* deposit currency
  const depositCurrency = useCallback(
    (targetCurrency, amount) => {
      let currencyData = {
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

  //* get individual amount of currencies
  const getIndividualAmount = useCallback(
    (targetCurrency) => {
      console.log("%c in add getIndividualAmount : ", "color:tomato");
      return (
        localStorCurrencies.find((currency) => currency.code === targetCurrency)
          ?.totalAmountInWallet || 0
      );
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
      const value = localStorCurrencies.find(
        (currency) => currency.code === targetCurrency
      )?.totalAmountInWalletConvertedTotarget;
      console.log(value);
      return value || 0;
    },
    [localStorCurrencies]
  );

  //* add Cash to currency
  const addCashToCurrency = useCallback(
    (targetcurrency, amount) => {
      let newCurrencies = localStorCurrencies.map((currency) =>
        currency.code === targetcurrency
          ? {
              ...currency,
              totalAmountInWallet: currency.totalAmountInWallet + amount,
            }
          : currency
      );

      newCurrencies.length != 0 ? setCurrencies(newCurrencies) : "";
      toast.success("amount saved successfully in the wallet!");
      {
        currencies.length != 0 ? setlocalStorCurrencies(currencies) : "";
      }
      newCurrencies = [];
    },
    [currencies, setlocalStorCurrencies, localStorCurrencies]
  );

  //* deposit currencies
  const depositCurrencies = useCallback(
    (arrayOfCurrencies) => {
      let newCurrencies = [];

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
          : currencies.concat(arrayOfCurrencies);

      newCurrencies.length > 1 ? setCurrencies(newCurrencies) : "";
      toast.success("Currencies and amount saved successfully in the wallet!");
      newCurrencies = [];
      // store to localStorage
      {
        currencies.length > 1 ? setlocalStorCurrencies(currencies) : "";
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
      setFrom(basecurrency);
      const base = {
        code: basecurrency,
        listOfCurrencies: listOfCurrencies,
      };
      console.log(
        "%c in setBaseCurrency",
        "color:blue",
        base.listOfCurrencies.CHF
      );
      setBase_currency(base);
      toast.success("Base currency successfully set !");
    },
    [listOfCurrencies, setBase_currency]
  );

  //* convert all currencies to base currency
  const convertAllTo = useCallback(
    (baseCurrency) => {
      setBaseCurrency(baseCurrency);

      let newCurrencies = [];

      newCurrencies =
        localStorCurrencies.length > 1
          ? localStorCurrencies?.map((currency) => ({
              ...currency,
              totalAmountInWalletConvertedTotarget:
                currency.totalAmountInWallet *
                base_currency.listOfCurrencies[`${baseCurrency}`],
            }))
          : [];

      // update currencies
      newCurrencies.length > 1
        ? setCurrencies(newCurrencies)
        : alert("no currency in the balance yet !");
      // store to local storage
      {
        currencies.length > 1 ? setlocalStorCurrencies(currencies) : "";
      }
      toast.success("All Currencies successfully converted to base currency !");
      console.log(
        "%c in convert All to base currency , currencies is : ",
        "color:green",
        currencies,
        "and newCurrencies is",
        newCurrencies
      );
      newCurrencies = [];
    },
    [
      currencies,
      setlocalStorCurrencies,
      localStorCurrencies,
      setBaseCurrency,
      base_currency.listOfCurrencies,
    ]
  );

  //* get total amount of currencies converted to base currency
  const getTotalAmountInTargetCurrency = useCallback(() => {
    console.log(
      "%c in add getTotalAmountInTargetCurrency , currency is : ",
      "color:red"
    );

    const totalAmount = localStorCurrencies?.reduce(
      (totalConvertedAmount, currency) => {
        return (
          totalConvertedAmount + currency.totalAmountInWalletConvertedTotarget
        );
      },
      0
    );
    console.log("total amount", totalAmount);
    {
      totalAmount != 0 ? setTotalAmountConverted(totalAmount) : "";
    }
    return totalAmount;
  }, [localStorCurrencies]);

  //* substract part of currency in balance
  const substractFromCurrencyToTarget = useCallback(
    (amount, sourceCurrencyCode, targetCurrencyCode) => {
      const currArray = localStorCurrencies?.map((currency) =>
        currency.code === sourceCurrencyCode
          ? {
              ...currency,
              totalAmountInWallet: currency.totalAmountInWallet - amount,
            }
          : currency
      );

      const newAmount =
        amount * base_currency?.listOfCurrencies[`${targetCurrencyCode}`];

      setCurrencies(currArray);
      setPartAmountConverted(newAmount);
      currencies.length > 1 ? setlocalStorCurrencies(currencies) : "";
      toast.success(
        "the amount has been removed from the source currency balance!"
      );
    },
    [
      currencies,
      base_currency.listOfCurrencies,
      setlocalStorCurrencies,
      localStorCurrencies,
    ]
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
