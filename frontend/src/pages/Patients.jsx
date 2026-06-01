import { useEffect, useState } from "react";
import axios from "axios";

function Patients() {
  const [patients, setPatients] = useState([]);

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    disease: "",
  });

  const fetchPatients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/patients");
      setPatients(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/patients", form);

      alert("Patient Added");

      setForm({
        name: "",
        age: "",
        gender: "",
        phone: "",
        address: "",
        disease: "",
      });

      fetchPatients();
    } catch (error) {
      console.log(error);
    }
  };

  const deletePatient = async (id) => {
    await axios.delete(`http://localhost:5000/api/patients/${id}`);
    fetchPatients();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        Patient Management
      </h2>

      {/* FORM */}
      <form
        onSubmit={submitHandler}
        className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl"
      >
        <input
          className="border p-2 rounded"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          className="border p-2 rounded"
          placeholder="Age"
          value={form.age}
          onChange={(e) =>
            setForm({ ...form, age: e.target.value })
          }
        />

        <input
          className="border p-2 rounded"
          placeholder="Gender"
          value={form.gender}
          onChange={(e) =>
            setForm({ ...form, gender: e.target.value })
          }
        />

        <input
          className="border p-2 rounded"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <input
          className="border p-2 rounded"
          placeholder="Address"
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
        />

        <input
          className="border p-2 rounded"
          placeholder="Disease"
          value={form.disease}
          onChange={(e) =>
            setForm({ ...form, disease: e.target.value })
          }
        />

        <button
          type="submit"
          className="md:col-span-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Patient
        </button>
      </form>

      {/* TABLE */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          Patients List
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Age</th>
                <th className="p-3 text-left">Gender</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {patients.map((patient, index) => (
                <tr
                  key={patient.patientId}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="p-3">{patient.patientId}</td>
                  <td className="p-3 font-medium">{patient.name}</td>
                  <td className="p-3">{patient.age}</td>
                  <td className="p-3">{patient.gender}</td>

                  <td className="p-3">
                    <button
  onClick={async () => {
    await axios.delete(
      `http://localhost:5000/api/patients/${patient.patientId}`
    );

    fetchPatients();
  }}
>
  Delete
</button>
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

export default Patients;