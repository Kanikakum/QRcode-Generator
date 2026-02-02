const express = require("express");
const bodyParser = require("body-parser");
const QRCode = require("qrcode");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Home Page
app.get("/", (req, res) => {
  res.render("index", { qrCode: null });
});

// Generate QR
app.post("/generate", async (req, res) => {
  const text = req.body.text;

  try {
    const qrCode = await QRCode.toDataURL(text);
    res.render("index", { qrCode });
  } catch (err) {
    res.send("Error generating QR Code");
  }
});

// Server Start
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
