import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="flex items-center justify-between">
        
        {/* Logo / Title */}
        <h1 className="text-xl font-bold tracking-wide">
          Hospital System
        </h1>

        {/* Links */}
        <div className="flex space-x-6 text-sm font-medium">
          <Link to="/" className="hover:text-yellow-300 transition">
            Dashboard
          </Link>

          <Link to="/patients" className="hover:text-yellow-300 transition">
            Patients
          </Link>

          <Link to="/doctors" className="hover:text-yellow-300 transition">
            Doctors
          </Link>

          <Link to="/appointments" className="hover:text-yellow-300 transition">
            Appointments
          </Link>

          <Link to="/billing" className="hover:text-yellow-300 transition">
            Billing
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;