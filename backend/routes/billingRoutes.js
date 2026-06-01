const express = require("express");

const router = express.Router();

const {
  createBill,
  getBills,
  updateBillStatus,
} = require("../controllers/billingController");

router.post("/", createBill);
router.get("/", getBills);
router.put("/:id", updateBillStatus);

module.exports = router;