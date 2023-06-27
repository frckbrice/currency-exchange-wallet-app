// import React, {
//   forwardRef,
//   useRef,
//   useImperativeHandle,
//   useState,
//   useContext
// } from "react";
// import PropTypes from "prop-types";
// import classes from "../Main.module.css";
// import { CurrencyContext } from "./CurrencyContext";

// //1. add comment on top of the line eslint error : "eslint-disable-next-line react/display-name"

// /*2. or add this to your own project:
// module.exports = {
//   rules: {
//     "react/display-name": "off",
//   }
// }
//  */


// const ListOfCurrency = forwardRef((props, ref) => {
//   const [defaultCurrency, setDefaultCurrency] = useState("USD");
//   const [targetCurrency1, setTargetcurrency1] = useState("XAF");
//   const [targetcurrencyInput1, setTargetcurrencyInput1] = useState(0);
//   const [targetcurrency2, setTargetcurrency2] = useState("EUR");
//   const [targetcurrencyInput2, setTargetcurrencyInput2] = useState(0);
//   const [targetcurrency3, setTargetcurrency3] = useState("CHF");
//   const [targetcurrencyInput3, setTargetcurrencyInput3] = useState(0);

//   const selectRef = useRef();
//   const usdInputRef = useRef();
//   const eurInputRef = useRef();
//   const xafInputRef = useRef();
//   const submitInputRef = useRef();
//   const labelRef = useRef();
//   const convertRef = useRef();
//   const targetSelectRef1 = useRef();
//   const targetSelectRef2 = useRef();
//   const targetSelectRef3 = useRef();
//   const ResultCovertionRef = useRef();

//   useImperativeHandle(ref, () => ({
//     hiddenSelectTag: () => {
//       selectRef.current.style.display = "none";
//       labelRef.current.style.display = "none";
//     },

//     blurInputField: () => {
//       usdInputRef.current.readOnly = true;
//       eurInputRef.current.readOnly = true;
//       xafInputRef.current.readOnly = true;
//     },

//     hiddenSubmitBtn: () => {
//       submitInputRef.current.style.display = "none";
//     },
//     showSubmitBtn: () => {
//       submitInputRef.current.style.display = "block";
//     },
//     showConvertBtn: () => {
//       convertRef.current.style.display = "block";
//     },
//     showSelectTag: () => {
//       labelRef.current.style.display = "block";
//       selectRef.current.style.display = "block";
//     },
//     hiddenConvertBtn: () => {
//       convertRef.current.style.display = "none";
//     },
//     showTargetCurrSelect: () => {
//       targetSelectRef1.current.style.display = "initial";
//       targetSelectRef2.current.style.display = "initial";
//       targetSelectRef3.current.style.display = "initial";
//     },
//     hideTargetCurrSelect: () => {
//       targetSelectRef1.current.style.display = "none";
//       targetSelectRef2.current.style.display = "none";
//       targetSelectRef3.current.style.display = "none";
//     },
//     hiddenResultCovertionRef: () => {
//       ResultCovertionRef.current.style.display = "none";
//     },
//     showResultCovertionRef: () => {
//       ResultCovertionRef.current.style.display = "initial";
//     },
//   }));

//   const {addCashToCurrency} = useContext(CurrencyContext);

//   const handleChange = (event) => {
    
//     switch (event.target) {
//       case "source_currency":
//         setDefaultCurrency(event.target.value);
//         break;
//       case "target_currency1":
//         setTargetcurrency1(event.target.value);
//         break;
//       case "input_target_currency1":
//         setTargetcurrencyInput1(event.target.value);
//         break;
//       case "target_currency2":
//         setTargetcurrency2(event.target.value);
//         break;
//       case "input_target_currency2":
//         setTargetcurrencyInput2(event.target.value);
//         break;
//       case "target_currency3":
//         setTargetcurrency3(event.target.value);
//         break;
//       case "input_target_currency3":
//         setTargetcurrencyInput3(event.target.value);
//         break;
//       default:
//         return;
//     }

//     if(targetCurrency1 && targetcurrencyInput1){
//       addCashToCurrency(targetCurrency1, targetcurrencyInput1)
//     }
//     if (targetcurrency2 && targetcurrencyInput2) {
//       addCashToCurrency(targetcurrency2, targetcurrencyInput2);
//     }
//     if (targetcurrency3 && targetcurrencyInput3) {
//       addCashToCurrency(targetcurrency3, targetcurrencyInput3);
//     }
//   }

//   return (
//     <div className={classes.show}>
//       <div className={classes["div-input"]}>
//         <label
//           htmlFor="select-currency"
//           style={{
//             marginLeft: "1.3%",
//             marginBottom: "1.3%",
//             fontSize: "18px",
//             display: "none",
//           }}
//           ref={labelRef}
//         >
//           Select default currency
//         </label>
//         <select
//           name="source_currency"
//           className={classes.Selectcurrency}
//           ref={selectRef}
//           id="select-currency"
//           value={defaultCurrency}
//           onChange={handleChange}
//         >
//           {Object.entries(props.listOfCurrency).map((currency) => (
//             <option key={currency[0]} value={currency[0]}>
//               {currency[0]}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className={classes["p-input"]}>
//         <div className={classes["div-input1"]}>
//           {/* <label htmlFor="usd">USD :</label> */}
//           <select
//             name="target_currency1"
//             className={classes.SelectTargetcurrency}
//             ref={targetSelectRef1}
//             id="select-currency"
//             value={targetCurrency1}
//             onChange={handleChange}
//           >
//             {Object.entries(props.listOfCurrency).map((currency) => (
//               <option key={currency[0]} value={currency[0]}>
//                 {currency[0]}
//               </option>
//             ))}
//           </select>
//           <input
//             type="number"
//             id="usd"
//             ref={usdInputRef}
//             name="input_target_currency1"
//             onChange={(e) => handleChange(e)}
//             placeholder="USD"
//           />
//         </div>
//         <div className={classes["div-input1"]}>
//           {/* <label htmlFor="eur">EUR :</label> */}
//           <select
//             name="target_currency2"
//             className={classes.SelectTargetcurrency}
//             ref={targetSelectRef2}
//             id="select-currency"
//             value={targetcurrency2}
//             onChange={handleChange}
//           >
//             {Object.entries(props.listOfCurrency).map((currency) => (
//               <option key={currency[0]} value={currency[0]}>
//                 {currency[0]}
//               </option>
//             ))}
//           </select>
//           <input
//             type="number"
//             id="eur"
//             ref={eurInputRef}
//             name="input_target_currency2"
//             onChange={(e) => handleChange(e)}
//             placeholder="EUR"
//           />
//         </div>
//         <div className={classes["div-input1"]}>
//           {/* <label htmlFor="xaf">CHF :</label> */}
//           <select
//             name="target_currency3"
//             className={classes.SelectTargetcurrency}
//             ref={targetSelectRef3}
//             id="select-currency"
//             value={targetcurrency3}
//             onChange={handleChange}
//           >
//             {Object.entries(props.listOfCurrency).map((currency) => (
//               <option key={currency[0]} value={currency[0]}>
//                 {currency[0]}
//               </option>
//             ))}
//           </select>
//           <input
//             type="number"
//             id="chf"
//             ref={xafInputRef}
//             name="input_target_currency3"
//             onChange={(e) => handleChange(e)}
//             placeholder="CHF"
//           />
//         </div>
//       </div>
//       <div className={classes["div-submit"]}>
//         <button
//           type="button"
//           className={classes["submit-btn"]}
//           ref={submitInputRef}
//         >
//           Save
//         </button>
//       </div>
//       <span
//         ref={convertRef}
//         onClick={() => props.showModal()}
//         className={classes.convert}
//       >
//         Convert from one to another Currency ?
//       </span>
//       <div
//         className={classes["div-total-in-default-curr"]}
//         ref={ResultCovertionRef}
//       >
//         <span>
//           Total Amount <span>Default Curr</span>
//         </span>
//       </div>
//     </div>
//   );
// });

// //3. or add this here to fix the display name es-lint warning
// ListOfCurrency.displayName = "ListOfCurrency";

// export default ListOfCurrency;
