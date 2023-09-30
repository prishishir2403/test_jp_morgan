import React, { useState } from "react";
import "./App.css";
import sampleData from './sampleData';

const instruments = sampleData;

function App() {
  const [data, setData] = useState(instruments);

  const sortByAssetClass = () => {
    const sortedData = [...data].sort((a, b) => {
      if (a.assetClass === "Equities") return -1;
      if (b.assetClass === "Equities") return 1;
      if (a.assetClass === "Credit") return 1;
      if (b.assetClass === "Credit") return -1;
      return 0;
    });
    setData(sortedData);
  };

  const sortByPrice = () => {
    const sortedData = [...data].sort((a, b) => b.price - a.price);
    setData(sortedData);
  };

  const sortByTicker = () => {
    const sortedData = [...data].sort((a, b) => a.ticker.localeCompare(b.ticker));
    setData(sortedData);
  };

  const getColorForAssetClass = (assetClass) => {
    switch (assetClass) {
      case "Macro":
        return "white";
      case "Equities":
        return "blue";
      case "Credit":
        return "green";
      default:
        return "white";
    }
  };

  return (
    <div className="App">
      <h1>Financial Instruments</h1>
      <table>
        <thead>
          <tr>
            <th>Asset Class</th>
            <th>Ticker</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((instrument, index) => (
            <tr
              key={index}
              style={{ backgroundColor: getColorForAssetClass(instrument.assetClass) }}
            >
              <td>{instrument.assetClass}</td>
              <td>{instrument.ticker}</td>
              <td style={{ color: instrument.price >= 0 ? "black" : "red" }}>
                {instrument.price.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttons">
        <button onClick={sortByAssetClass}>Sort by Asset Class</button>
        <button onClick={sortByPrice}>Sort by Price (Descending)</button>
        <button onClick={sortByTicker}>Sort by Ticker (Alphabetical)</button>
      </div>
    </div>
  );
}

export default App;
