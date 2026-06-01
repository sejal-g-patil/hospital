import { useEffect, useState } from "react";
import axios from "axios";

function Appointments() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [form, setForm] = useState({
    patientId: "",
    doctorId: "",
    appointmentDate: "",
    status: "Scheduled",
  });

  const fetchPatients = async () => {
    const res = await axios.get("http://localhost:5000/api/patients");
    setPatients(res.data);
  };

  const fetchDoctors = async () => {
    const res = await axios.get("http://localhost:5000/api/doctors");
    setDoctors(res.data);
  };

  const fetchAppointments = async () => {
    const res = await axios.get("http://localhost:5000/api/appointments");
    setAppointments(res.data);
  };

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
    fetchAppointments();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/appointments", {
      patientId: Number(form.patientId),
      doctorId: Number(form.doctorId),
      appointmentDate: form.appointmentDate,
      status: form.status,
    });

    fetchAppointments();

    setForm({
      patientId: "",
      doctorId: "",
      appointmentDate: "",
      status: "Scheduled",
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">
        Appointment Booking
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
          {patients.map((patient) => (
            <option key={patient.patientId} value={patient.patientId}>
              {patient.name}
            </option>
          ))}
        </select>

        {/* Doctor */}
        <select
          className="w-full border p-2 rounded"
          value={form.doctorId}
          onChange={(e) =>
            setForm({ ...form, doctorId: e.target.value })
          }
        >
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.doctorId} value={doctor.doctorId}>
              {doctor.name}
            </option>
          ))}
        </select>

        {/* Date */}
        <input
          type="date"
          className="w-full border p-2 rounded"
          value={form.appointmentDate}
          onChange={(e) =>
            setForm({ ...form, appointmentDate: e.target.value })
          }
        />

        {/* Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Book Appointment
        </button>
      </form>

      {/* TABLE */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          Appointment List
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Patient</th>
                <th className="p-3 text-left">Doctor</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment, index) => (
                <tr
                  key={appointment.appointmentId}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="p-3">{appointment.appointmentId}</td>
                  <td className="p-3">{appointment.patient?.name}</td>
                  <td className="p-3">{appointment.doctor?.name}</td>
                  <td className="p-3">
                    {new Date(
                      appointment.appointmentDate
                    ).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 text-sm rounded bg-green-100 text-green-700">
                      {appointment.status}
                    </span>
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

export default Appointments;