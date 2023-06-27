import Header from "./Layout/Header";
import Main from "./Layout/Main";
import Footer from "./Layout/Footer";
import CurrencyProvider from "./Layout/MainSubComponent/CurrencyContext";

function App() {
  return (
    <>
      <Header />
      <CurrencyProvider>
        <Main />
      </CurrencyProvider>
      <Footer />
    </>
  );
}

export default App;
