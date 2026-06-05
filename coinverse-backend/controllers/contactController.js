const Contact = require("../models/Contact");

const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields required" });
    }

    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    res.status(201).json({ success: true, message: "Message saved!" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { submitContact };