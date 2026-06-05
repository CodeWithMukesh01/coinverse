const express = require("express");
const cors    = require("cors");
const fs      = require("fs");
const path    = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Create data folder
const dataDir      = path.join(__dirname, "data");
const contactsFile = path.join(dataDir, "contacts.json");
const usersFile    = path.join(dataDir, "users.json");

if (!fs.existsSync(dataDir))      fs.mkdirSync(dataDir);
if (!fs.existsSync(contactsFile)) fs.writeFileSync(contactsFile, "[]");
if (!fs.existsSync(usersFile))    fs.writeFileSync(usersFile, "[]");

const readData  = (file) => JSON.parse(fs.readFileSync(file));
const writeData = (file, data) =>
  fs.writeFileSync(file, JSON.stringify(data, null, 2));

// Test route
app.get("/", (req, res) => {
  res.send("CoinVerse Backend is running!");
});

// Save contact form
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message)
    return res.status(400).json({ error: "All fields required" });
  const contacts = readData(contactsFile);
  contacts.push({ id: Date.now(), name, email, subject, message });
  writeData(contactsFile, contacts);
  res.status(201).json({ success: true, message: "Message saved!" });
});

// View all contacts
app.get("/api/contact", (req, res) => {
  res.json(readData(contactsFile));
});

// Signup
app.post("/api/auth/signup", (req, res) => {
  const { name, email, password } = req.body;
  const users = readData(usersFile);
  if (users.find(u => u.email === email))
    return res.status(400).json({ error: "Email already registered" });
  users.push({ id: Date.now(), name, email, password });
  writeData(usersFile, users);
  res.status(201).json({ success: true, message: "Account created!" });
});

// Login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const users = readData(usersFile);
  const user  = users.find(
    u => u.email === email && u.password === password
  );
  if (!user)
    return res.status(400).json({ error: "Invalid email or password" });
  res.json({ success: true, name: user.name });
});

// View all users
app.get("/api/auth/users", (req, res) => {
  res.json(readData(usersFile));
});

app.listen(5000, () => console.log("Server running on port 5000 ✅"));