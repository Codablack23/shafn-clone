"use client"
import React, { useState } from "react";
import { message, notification, Spin } from "antd";
import EmailApiService from "@/repositories/EmailRepository";
 // adjust path as needed

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // Basic JS validation function
  const validate = (): string | null => {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.trim()) return "Email is required";
    // Simple email regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) return "Invalid email address";
    if (!form.subject.trim()) return "Subject is required";
    if (!form.message.trim()) return "Message is required";
    return null;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      message.error(error);
      return;
    }
    setLoading(true);
    try {
      const res = await EmailApiService.sendContactMail(form);
      if (res.status === "success") {
        notification.success({
          message:"Contact Received",
          description:res.message || "Message sent successfully!"
        });
        setForm({ name: "", email: "", subject: "", message: "" }); // reset form
      } else {
        notification.error({
          message:"Error",
          description:res.message || "Failed to send message"
        });
      }
    } catch (err) {
      notification.error({
          message:"Error",
          description:"Unexpected error occurred, please try again."
        });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ps-contact-form">
      <div className="container">
        <form className="ps__contact-form" onSubmit={onSubmit}>
          <h3>Contact Us</h3>

          <div className="form-group">
            <input
              name="name"
              className="form-control w3-light-grey"
              type="text"
              placeholder="Name *"
              style={{ border: "none" }}
              value={form.name}
              onChange={onChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <input
              name="email"
              className="form-control w3-light-grey"
              type="text"
              placeholder="Email *"
              style={{ border: "none" }}
              value={form.email}
              onChange={onChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <input
              name="subject"
              className="form-control w3-light-grey"
              type="text"
              placeholder="Subject *"
              style={{ border: "none" }}
              value={form.subject}
              onChange={onChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <textarea
              name="message"
              className="form-control w3-light-grey"
              rows={5}
              style={{ border: "none" }}
              placeholder="Message"
              value={form.message}
              onChange={onChange}
              disabled={loading}
            />
          </div>

          <div className="form-group submit text-center">
            <button className="ps-btn" type="submit" disabled={loading}>
              {loading ? <Spin size="small" /> : "Send message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
