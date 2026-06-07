import { useState } from "react";

export default function Contact() {
  const [form,   setForm]   = useState({ name:"", email:"", subject:"", message:"" });
  const [status, setStatus] = useState(null);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

 
const handleSubmit = async e => {
    e.preventDefault();
    setStatus("loading");
    try {
        const res = await fetch("https://coinverse-01.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name:"", email:"", subject:"", message:"" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="container my-5">
      <h1 className="display-1 text-center mb-5">Contact Us</h1>

      {status === "loading" && (
        <div className="alert alert-info">Sending...</div>
      )}
      {status === "success" && (
        <div className="alert alert-success">
          ✅ Message sent! We'll get back to you soon.
        </div>
      )}
      {status === "error" && (
        <div className="alert alert-danger">
          ❌ Something went wrong. Try again.
        </div>
      )}

      <div className="row justify-content-center">
        <div className="col-md-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input name="name" value={form.name} onChange={handleChange}
                className="form-control" placeholder="Enter your name" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input name="email" value={form.email} onChange={handleChange}
                type="email" className="form-control"
                placeholder="Enter your email" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Subject</label>
              <input name="subject" value={form.subject} onChange={handleChange}
                className="form-control" placeholder="Enter subject" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea name="message" value={form.message} onChange={handleChange}
                className="form-control" rows="4"
                placeholder="Your message..." required />
            </div>
            <button
              type="submit"
              className="btn btn-primary px-4"
              disabled={status === "loading"}>
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}