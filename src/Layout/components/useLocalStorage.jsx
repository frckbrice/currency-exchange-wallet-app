import React from "react";

export function useLocalStorage(key, intialValue) {
  const [localStorCurrencies, setlocalStorCurrencies] = React.useState(() => {
    return JSON.parse(localStorage.getItem(key)) || intialValue;
  });

  const setLocalStoragelocalStorCurrencies = React.useCallback(
    (localStorCurrencies) => {
      setlocalStorCurrencies(() => {
        if (localStorCurrencies) {
          localStorage.setItem(key, JSON.stringify(localStorCurrencies));
        } else {
          console.log("no localStorCurrencies to store in local storage");
          return;
        }

        return localStorCurrencies;
      });
    },
    [key]
  );

  React.useEffect(() => {
    setLocalStoragelocalStorCurrencies(localStorCurrencies);

    const refreshStorageFunc = (event) => {
      if (event.key === key) {
        setlocalStorCurrencies(event.newlocalStorCurrencies);
      }
    };
    window.addEventListener("storage", refreshStorageFunc);

    return () => {
      window.removeEventListener("storage", refreshStorageFunc);
    };
  }, [key, setLocalStoragelocalStorCurrencies, localStorCurrencies]);

  return { localStorCurrencies, setlocalStorCurrencies: setLocalStoragelocalStorCurrencies };
}

// export function Set(key, value) {
//   return localStorage.setItem(`${key}`, JSON.stringify(value));
// }