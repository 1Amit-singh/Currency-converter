import { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setTo(from);
    setFrom(to);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <>
      <div
        className="w-full h-screen flex flex-col justify-center items-center gap-8 "
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/2341830/pexels-photo-2341830.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      >
        <form
          className="flex flex-col justify-center items-center py-10 px-6"
          style={{
            background: "rgba( 255, 255, 255, 0.3 )",
            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
            backdropFilter: "blur( 4px )",
            borderRadius: "10px",
            border: "1px solid rgba( 255, 255, 255, 0.18 )",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <h1 className="text-white text-4xl font-bold mb-8">
            Currency Converter
          </h1>
          <div className="w-full">
            <InputBox
              label="From"
              amount={amount}
              onAmountChange={(amount) => setAmount(amount)}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
            />
          </div>
          <div className="relative w-full mt-2 mb-4">
            <button
              type="button"
              className="bg-blue-600 text-white rounded-lg py-2 px-3 absolute -translate-y-1/2 left-1/2 -translate-x-1/2"
              onClick={swap}
            >
              Swap
            </button>

            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg py-3 px-4 w-full"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
