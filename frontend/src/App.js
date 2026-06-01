import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Billing from "./pages/Billing";

import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/patients"
          element={<Patients />}
        />

        <Route
          path="/doctors"
          element={<Doctors />}
        />

        <Route
          path="/appointments"
          element={<Appointments />}
        />
        <Route
  path="/billing"
  element={<Billing />}
/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;