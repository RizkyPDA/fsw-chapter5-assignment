const express = require("express"); // Import modul Express.js
const app = express();
const fs = require("fs"); // Import modul File System
const { uuid } = require("uuidv4");

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

app.get("/add", (req, res) => {
  res.render("add", {
    pageTitle: "Add",
  });
});

app.post("/add", (req, res) => {
  const { nama, email, password } = req.body;
  const data = fs.readFileSync("./data/data.json", "utf-8");
  const dataParsed = JSON.parse(data);
  const newUser = {
    id: uuid(),
    nama,
    email,
    password,
  };
  dataParsed.push(newUser);
  fs.writeFileSync("./data/data.json", JSON.stringify(dataParsed, null, 4));
  res.redirect("/");
});

app.get("/edit", (req, res) => {
  const { id } = req.query;
  const data = fs.readFileSync("./data/data.json", "utf-8");
  const dataParsed = JSON.parse(data);

  const dataToEdit = dataParsed.find((item) => {
    return (item.id = id);
  });
  res.render("edit", {
    pageTitle: "Edit",
    data: dataToEdit,
  });
});

// edit cara post

app.post("/edit", (req, res) => {
  const { id } = req.query;
  const { nama, email, password } = req.body;
  const data = fs.readFileSync("./data/data.json", "utf-8");
  const dataParsed = JSON.parse(data);

  const dataToEditIndex = dataParsed.findIndex((item) => {
    return (item.id = id);
  });
  const dataToEdit = {
    id: id,
    nama: nama,
    email: email,
    password: password,
  };

  dataParsed[dataToEditIndex] = dataToEdit;
  fs.writeFileSync("./data/data.json", JSON.stringify(dataParsed, null, 4));
  res.redirect("/");
});

// edit cara put

// app.put("/edit", (req, res) => {
//   console.log("====================================");
//   console.log("masuk");
//   console.log("====================================");
//   const { id } = req.query;
//   const { nama, email, password } = req.body;
//   const data = fs.readFileSync("./data/data.json", "utf-8");
//   const dataParsed = JSON.parse(data);

//   const dataToEditIndex = dataParsed.findIndex((item) => {
//     return (item.id = id);
//   });
//   const dataToEdit = {
//     id: id,
//     nama: nama,
//     hemail: email,
//     password: password,
//   };

//   dataParsed[dataToEditIndex] = dataToEdit;
//   fs.writeFileSync("./data/data.json", JSON.stringify(dataParsed, null, 4));
//   res.json({
//     message: "succedeed",
//   });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
