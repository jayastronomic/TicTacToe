const express = require("express");
const app = express();
const path = require("path");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Serve static files from the 'assets' directory
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
