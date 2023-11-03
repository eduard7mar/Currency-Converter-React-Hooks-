const App = () => {

  const getResource = async url => {
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
    "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json");

    console.log(res);
    setData(data => res.map(_transformData));
  };

  const _transformData = obj => {
    return {
      countryCode: obj.cc,
      nameOfCurrency: obj.txt,
      value: obj.rate };

  };

  function goToCurr(country) {
    let found = data.filter(elem => elem.countryCode === country);
    let symbol =
    found[0].countryCode === "USD" ?
    " $" :
    found[0].countryCode === "GBP" ?
    " £" :
    found[0].countryCode === "EUR" ?
    " €" :
    null;

    setResult(
    (result) =>
    Math.round(amount / found[0].value * 100) / 100 + symbol);

  }
  function reset() {
    setResult(result => null);
  }

  return /*#__PURE__*/(
    React.createElement("div", { className: "app" }, /*#__PURE__*/
    React.createElement("h1", { className: "header" }, "Enter the amount in UAH and choose the currency for conversion below:"), /*#__PURE__*/
    React.createElement("input", {
      className: "input",
      type: "number",
      value: amount,
      onChange: e => setAmount(e.target.value) }), /*#__PURE__*/

    React.createElement("div", { className: "counter" }, result), /*#__PURE__*/
    React.createElement("div", { className: "controls" }, /*#__PURE__*/
    React.createElement("button", { onClick: () => goToCurr("USD") }, "USD"), /*#__PURE__*/
    React.createElement("button", { onClick: () => goToCurr("EUR") }, "EUR"), /*#__PURE__*/
    React.createElement("button", { onClick: () => goToCurr("GBP") }, "GBP")), /*#__PURE__*/

    React.createElement("div", { className: "reset" }, /*#__PURE__*/
    React.createElement("button", { onClick: reset }, "Reset"))));



};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));