require("dotenv").config();

const express = require("express");
const cors = require("cors");

const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const app = express();
const appointmentRoutes =require("./routes/appointmentRoutes");
const billingRoutes =
  require("./routes/billingRoutes");
  const dashboardRoutes =
  require("./routes/dashboardRoutes");




app.use(cors());
app.use(express.json());
app.use(
  "/api/appointments",
  appointmentRoutes
);

app.get("/", (req, res) => {
  res.send("Hospital Management API Running");
});
app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);

app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});
app.use(
  "/api/billing",
  billingRoutes
);