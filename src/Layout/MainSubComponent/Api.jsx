import React, { useEffect, useState } from "react";
import axios from "axios";
// import Freecurrencyapi from "@everapi/freecurrencyapi-js";

// const freecurrencyapi = new Freecurrencyapi(
//   "oorxysDSyKKtPYwHIqSswZtS4njGQ858Gt7ehxYf"
// ); ff286a1bcb9d4b340c8b641ab013dc47

export const useCurrency = (frm, to) => {
  const [listOfCurrencies, setListOfCurrencies] = useState([]);

  const req_url = `https://api.freecurrencyapi.com/v1/latest?apikey=oorxysDSyKKtPYwHIqSswZtS4njGQ858Gt7ehxYf&currencies=${to}&base_currency=${frm}`;

  // const req_url = `https://api.exchangeratesapi.io/v1/' + ${endpoint} + '?access_key=' + ${access_key},`;

  useEffect(() => {
    let cancel;
    const fetchData = async () => {
      try {
        const { data } = await axios({
          method: "GET",
          url: req_url,
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
          onDownloadProgress: (progressEvent) => {
            console.log(
              "%cDownloading ...",
              "color:green",
              progressEvent.loaded
            );
          },
          header: {
            "Access-Control-Allow-origin": "*",
            "Access-control-Allow-Method": "POST,PUT,DELETE,GET,OPTIONS",
            "Access-Control-Allow-Headers":
              "content-type, X-Auth-Token,Origin, Authorization",
          },
        });
        // console.log(rates);
        setListOfCurrencies(data.data);
      } catch (err) {
        if (axios.isCancel(err)) console.log(err);
      }
    };
    fetchData();
    return () => cancel();
  }, [frm, to, req_url]);

  return { listOfCurrencies };
};

//key: oorxysDSyKKtPYwHIqSswZtS4njGQ858Gt7ehxYf
