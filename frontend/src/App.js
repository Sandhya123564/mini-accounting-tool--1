import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8000/entries";

function App() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({
    date: "",
    description: "",
    income: "",
    expense: ""
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await axios.get(API);
    setRows(res.data);
  };

  const addRow = async () => {
    await axios.post(API, {
      ...form,
      income: Number(form.income || 0),
      expense: Number(form.expense || 0),
    });
    setForm({ date: "", description: "", income: "", expense: "" });
    loadData();
  };

  const deleteRow = async (id) => {
    await axios.delete(`${API}/${id}`);
    loadData();
  };

  // 🔹 Running Balance
  let balance = 0;

  // 🔹 Monthly Profit/Loss
  const monthly = {};

  rows.forEach(r => {
    const month = r.date.slice(0, 7); // YYYY-MM
    const value = r.income - r.expense;
    monthly[month] = (monthly[month] || 0) + value;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", padding: 30 }}>
      <h1 style={{ textAlign: "center", color: "#38bdf8" }}>
        "LEDGER LITE"
      </h1>

      {/* 🔹 MONTHLY PROFIT / LOSS */}
      <div style={{
        display: "flex",
        gap: 20,
        justifyContent: "center",
        marginBottom: 20,
        flexWrap: "wrap"
      }}>
        {Object.entries(monthly).map(([month, value]) => (
        <div
    key={month}
    style={{
    padding: "18px 30px",
    borderRadius: 20,
    minWidth: 320,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: value >= 0 ? "#86efac" : "#fecaca",
    color: "#064e3b",
    boxShadow: "0 6px 14px rgba(0,0,0,0.2)"
  }}
>
  <div style={{ fontSize: 18, fontWeight: 600 }}>
    {month}
  </div>

  <div style={{ fontSize: 20, fontWeight: "bold" }}>
    {value >= 0 ? "Profit: ₹" : "Loss: ₹"}
    {Math.abs(value)}
  </div>
</div>
))}
</div>
          
             
      {/* 🔹 TABLE */}
      <table style={{
        width: "100%",
        background: "white",
        borderRadius: 12,
        overflow: "hidden"
      }}>
        <thead>
          <tr style={{ background: "#0284c7", color: "white" }}>
            <th>Date</th>
            <th>Description</th>
            <th>Income</th>
            <th>Expense</th>
            <th>Balance</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {rows.map(r => {
            balance += r.income - r.expense;
            return (
              <tr key={r.id}>
                <td>{r.date}</td>
                <td>{r.description}</td>

                <td style={{ color: "green", fontWeight: "bold" }}>
                  ₹ {r.income}
                </td>

                <td style={{ color: "red", fontWeight: "bold" }}>
                  ₹ {r.expense}
                </td>

                <td style={{
                  color: "#1d4ed8",
                  fontWeight: "bold"
                }}>
                  ₹ {balance}
                </td>

                <td>
                  <button
                    style={{
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: 6,
                      cursor: "pointer"
                    }}
                    onClick={() => deleteRow(r.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}

          {/* 🔹 ADD NEW ROW */}
          <tr style={{ background: "#e5e7eb" }}>
            <td>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
              />
            </td>

            <td>
              <input
                placeholder="Description"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
              />
            </td>

            <td>
              <input
                type="number"
                placeholder="Income"
                value={form.income}
                onChange={e => setForm({ ...form, income: e.target.value })}
              />
            </td>

            <td>
              <input
                type="number"
                placeholder="Expense"
                value={form.expense}
                onChange={e => setForm({ ...form, expense: e.target.value })}
              />
            </td>

            <td colSpan="2">
              <button
                style={{
                  width: "100%",
                  background: "#22c55e",
                  color: "white",
                  border: "none",
                  padding: 10,
                  borderRadius: 8,
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
                onClick={addRow}
              >
                ➕ Add Entry
              </button>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  );
}

export default App;