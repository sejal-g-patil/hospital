import { useEffect, useState } from "react";
import axios from "axios";

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    phone: "",
    salary: "",
  });

  const fetchDoctors = async () => {
    const res = await axios.get("http://localhost:5000/api/doctors");
    setDoctors(res.data);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/doctors", {
      ...form,
      salary: Number(form.salary),
    });

    fetchDoctors();

    setForm({
      name: "",
      specialization: "",
      phone: "",
      salary: "",
    });
  };

  const deleteDoctor = async (id) => {
    await axios.delete(`http://localhost:5000/api/doctors/${id}`);
    fetchDoctors();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        Doctor Management
      </h2>

      {/* FORM */}
      <form
        onSubmit={submitHandler}
        className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl"
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
          placeholder="Specialization"
          value={form.specialization}
          onChange={(e) =>
            setForm({ ...form, specialization: e.target.value })
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
          placeholder="Salary"
          value={form.salary}
          onChange={(e) =>
            setForm({ ...form, salary: e.target.value })
          }
        />

        <button
          type="submit"
          className="md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Doctor
        </button>
      </form>

      {/* TABLE */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          Doctors List
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Specialization</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Salary</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {doctors.map((doctor, index) => (
                <tr
                  key={doctor.doctorId}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="p-3">{doctor.doctorId}</td>
                  <td className="p-3 font-medium">{doctor.name}</td>
                  <td className="p-3">{doctor.specialization}</td>
                  <td className="p-3">{doctor.phone}</td>
                  <td className="p-3">₹{doctor.salary}</td>

                  <td className="p-3">
                    <button
  onClick={async () => {
    await axios.delete(
      `http://localhost:5000/api/doctors/${doctor.doctorId}`
    );

    fetchDoctors();
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

export default Doctors;