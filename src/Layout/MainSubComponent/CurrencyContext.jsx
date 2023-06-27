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

  console.log(listOfCurrencies);

  const setBaseCurrency = useCallback(
    (currency) => {
      setFrom(currency);
      const base = {
        ...base_currency,
        code: currency,
        listOfCurrencies: listOfCurrencies,
      };
      setCurrencies((prev) => [base, ...prev]);
    },
    [listOfCurrencies]
  );

  const depositCurrency = useCallback(
    (targetCurrency, amount) => {
      const currencyData = {
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
      setlocalStorCurrencies(currencies);
      console.log(
        "%c in add depositCurrency , currency is : ",
        "color:green",
        currencies
      );
    },
    [currencies, setlocalStorCurrencies]
  );

  const getIndividualAmount = useCallback(
    (targetCurrency) => {
      console.log(
        "%c in add getIndividualAmount , currency is : ",
        "color:green"
      );
      return localStorCurrencies.find(
        (currency) => currency.code === targetCurrency
      )?.totalAmountInWallet;
    },
    [localStorCurrencies]
  );

  const addCashToCurrency = useCallback(
    (targetcurrency, amount) => {
      console.log(
        "%c in add getIndividualAmount , currency is : ",
        "color:red"
      );
      const newCurrencies = currencies.map((curr) =>
        curr.code === targetcurrency
          ? { ...curr, totalAmountInWallet: curr.totalAmountInWallet + amount }
          : curr
      );

      setCurrencies([...newCurrencies]);
      setlocalStorCurrencies(currencies);
    },
    [currencies, setlocalStorCurrencies]
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
      setTotalAmountConverted(totalAmount);
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
    convertAllTo,
    totalAmountConverted,
    getIndividualAmount,
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
