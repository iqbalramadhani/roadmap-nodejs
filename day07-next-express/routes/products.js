const express = require("express");
const router = express.Router();

// GET /products
router.get("/", (req, res) => {
  res.json([{ id: 1, name: "Laptop" }, { id: 2, name: "Mouse" }]);
});

// GET /products/1
router.get("/:id", (req, res) => {
  res.json({ id: req.params.id, name: "Sample Product" });
});

module.exports = router;
