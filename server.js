const fs = require("fs"); // Import modul File System
const express = require("express"); // Import modul Express.js
const app = express();

app.set("view engine", "ejs"); // Setting view engine
app.set("views", __dirname + "/public/views"); // Setting Lokasi views
app.use(express.static(__dirname + "/public/")); // Share semua yang ada di dalam folder public agar bisa diakses

// Middleware untuk parsing body
app.use(express.urlencoded({ extended: true })); // Agar API bisa membaca url
app.use(express.json()); // Agar API bisa membaca file JSON

app.get("/", (req, res) => {
  // res.send("Hello World!"); // Mengirim teks kedalam API
  const data = fs.readFileSync("./data/data.json", "utf-8"); // Membaca file data.json dengan encoding utf-8
  const dataParse = JSON.parse(data); // Mengubah data .json menjadi object
  res.render("main", {
    pageTitle: "Main",
    data: dataParse,
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
