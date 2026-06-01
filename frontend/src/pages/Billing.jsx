import { useEffect, useState } from "react";
import axios from "axios";

function Billing() {
  const [patients, setPatients] = useState([]);
  const [bills, setBills] = useState([]);

  const [form, setForm] = useState({
    patientId: "",
    amount: "",
    paymentStatus: "Pending",
  });

  const fetchPatients = async () => {
    const res = await axios.get("http://localhost:5000/api/patients");
    setPatients(res.data);
  };

  const fetchBills = async () => {
    const res = await axios.get("http://localhost:5000/api/billing");
    setBills(res.data);
  };

  useEffect(() => {
    fetchPatients();
    fetchBills();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/billing", {
      patientId: Number(form.patientId),
      amount: Number(form.amount),
      paymentStatus: form.paymentStatus,
    });

    alert("Bill Added");

    setForm({
      patientId: "",
      amount: "",
      paymentStatus: "Pending",
    });

    fetchBills();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        Billing Management
      </h2>

      {/* FORM */}
      <form
        onSubmit={submitHandler}
        className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-xl"
      >
        {/* Patient */}
        <select
          className="w-full border p-2 rounded"
          value={form.patientId}
          onChange={(e) =>
            setForm({ ...form, patientId: e.target.value })
          }
        >
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p.patientId} value={p.patientId}>
              {p.name}
            </option>
          ))}
        </select>

        {/* Amount */}
        <input
          className="w-full border p-2 rounded"
          placeholder="Enter Amount"
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
        />

        {/* Payment Status */}
        <select
          className="w-full border p-2 rounded"
          value={form.paymentStatus}
          onChange={(e) =>
            setForm({ ...form, paymentStatus: e.target.value })
          }
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>

        {/* Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Generate Bill
        </button>
      </form>

      {/* TABLE */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          Bill Records
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Patient</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {bills.map((bill, index) => (
                <tr
                  key={bill.billId}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="p-3">{bill.billId}</td>
                  <td className="p-3">{bill.patient?.name}</td>
                  <td className="p-3 font-semibold">
                    ₹{bill.amount}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        bill.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {bill.paymentStatus}
                    </span>
                  </td>
                  <td>
  {bill.paymentStatus === "Pending" ? (
    <button
      onClick={async () => {
        await axios.put(
          `http://localhost:5000/api/billing/${bill.billId}`,
          {
            paymentStatus: "Paid",
          }
        );

        fetchBills();
      }}
    >
      Mark as Paid
    </button>
  ) : (
    <span style={{ color: "green", fontWeight: "bold" }}>
      Paid
    </span>
  )}
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Billing;