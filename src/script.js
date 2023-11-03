const App = () => {
  
  const getResource = async (url) => {
    let res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Couldn't fetch ${url}, status: ${res.status}!`);
    }
    return await res.json();
  };
  
  React.useEffect(() => {
    getData();
  }, []);
  
  const [data, setData] = React.useState([]);
  const [result, setResult] = React.useState();
  const [amount, setAmount] = React.useState(0);
  
  const getData = async () => {
    const res = await getResource(
      "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json"
    );
    console.log(res);
    setData((data) => res.map(_transformData));
  };
  
  const _transformData = (obj) => {
    return {
      countryCode: obj.cc,
      nameOfCurrency: obj.txt,
      value: obj.rate
    };
  };

  function goToCurr(country) {
    let found = data.filter((elem) => elem.countryCode === country);
    let symbol =
      found[0].countryCode === "USD"
        ? " $"
        : found[0].countryCode === "GBP"
        ? " £"
        : found[0].countryCode === "EUR"
        ? " €"
        : null;

    setResult(
      (result) =>
        Math.round((amount / found[0].value) * 100) / 100 + symbol
    );
  }
  function reset() {
    setResult((result) => null);
  }

  return (
    <div className="app">
      <h1 className="header">Enter the amount in UAH and choose the currency for conversion below:</h1>
      <input 
        className="input"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div className="counter">{result}</div>
      <div className="controls">
        <button onClick={() => goToCurr("USD")}>USD</button>
        <button onClick={() => goToCurr("EUR")}>EUR</button>
        <button onClick={() => goToCurr("GBP")}>GBP</button>
      </div>
      <div className="reset">
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById("app"));
