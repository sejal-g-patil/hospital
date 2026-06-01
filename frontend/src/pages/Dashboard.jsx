import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dashboard")
      .then((res) => setStats(res.data));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">
        Hospital Management Dashboard
      </h1>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Patients */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm">Total Patients</h3>
          <p className="text-2xl font-bold text-blue-600">
            {stats.totalPatients ?? 0}
          </p>
        </div>

        {/* Doctors */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm">Total Doctors</h3>
          <p className="text-2xl font-bold text-green-600">
            {stats.totalDoctors ?? 0}
          </p>
        </div>

        {/* Appointments */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <h3 className="text-gray-500 text-sm">Total Appointments</h3>
          <p className="text-2xl font-bold text-purple-600">
            {stats.totalAppointments ?? 0}
          </p>
        </div>

        {/* Revenue */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <h3 className="text-gray-500 text-sm">Revenue</h3>
          <p className="text-2xl font-bold text-yellow-600">
            ₹{stats.totalRevenue ?? 0}
          </p>
        </div>

      </div>

      {/* OPTIONAL INFO SECTION */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">
          Overview
        </h2>
        <p className="text-gray-500">
          Welcome to the Hospital Management System dashboard.
          Here you can monitor patients, doctors, appointments, and revenue in real time.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;