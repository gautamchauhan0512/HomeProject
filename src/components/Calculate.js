

import { useState } from "react";
// import "./App.css"; // 👈 Make sure to import the CSS

export default function SadiCardCalculator() {
  const [inputValue, setInputValue] = useState({
    inputBhav: "",
    inputnang: ""
  });

  const [entries, setEntries] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function handleEntries() {
    const nang = Number(inputValue.inputnang);
    const bhav = Number(inputValue.inputBhav);
    const total = bhav * nang;

    if (nang <= 0 || bhav <= 0) {
      alert("Please enter positive values.");
      setInputValue({ inputBhav: "", inputnang: "" });
      return;
    }

    const newEntry = { nang, bhav, total };
    setEntries((prev) => [...prev, newEntry]);
    setInputValue({ inputBhav: "", inputnang: "" });
  }

  function resetBtn() {
    setEntries([]);
  }

  const grandTotal = entries.reduce((sum, entry) => sum + entry.total, 0);

  return (
    <div className="container">
      <h1>Sadi Card Calculator</h1>
      <div className="form">
        <input
          type="number"
          name="inputBhav"
          value={inputValue.inputBhav}
          onChange={handleChange}
          placeholder="Enter Bhav"
        />
        <input
          type="number"
          name="inputnang"
          value={inputValue.inputnang}
          onChange={handleChange}
          placeholder="Enter Nang"
        />
        <div className="buttons">
          <button
            onClick={handleEntries}
            disabled={
              inputValue.inputBhav === "" ||
              inputValue.inputnang === "" ||
              Number(inputValue.inputBhav) === 0 ||
              Number(inputValue.inputnang) === 0
            }
          >
            Add
          </button>
          <button onClick={resetBtn} className="reset">
            Reset
          </button>
        </div>
      </div>

      {entries.length > 0 && (
        <>
          <table>
            <thead>
              <tr>
                <th>Bhav</th>
                <th>Nang</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.bhav}</td>
                  <td>{item.nang}</td>
                  <td>{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="grand-total">Grand Total: {grandTotal}</h3>
        </>
      )}
    </div>
  );
}
