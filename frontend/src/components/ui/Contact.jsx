import React, { useState } from "react";
import axios from "axios";
import Navbar from "../shared/Navbar";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const Contact = () => {
  const { user } = useSelector((store) => store.auth);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState(""); // "success" or "error"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setStatusType("error");
      setStatus("Please log in to post your query.");
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_USER_API_END_POINT}/contact`,
        formData,
        { withCredentials: true }
      );
      if (res.data.success) {
        setStatusType("success");
        setStatus("Your message has been sent successfully!");
        toast.success("Your message has been sent successfully!")
        setFormData({ fullName: "", email: "", message: "" });
      } else {
        setStatusType("error");
        setStatus("Failed to send your message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting the contact form:", error);
      setStatusType("error");
      setStatus("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center px-6 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg">
          <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-4">
            Contact Us
          </h1>
          <p className="text-gray-600 text-center mb-6">
            We'd love to hear from you. Fill out the form below and we'll get
            back to you as soon as possible.
          </p>
          {status && (
            <div
              className={`text-center mb-4 font-medium ${
                statusType === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {status}
            </div>
          )}
          {user ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 transition duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-2"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 transition duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-2"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 transition duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-2"
                  rows="5"
                  placeholder="Write your message here"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
              >
                Send Message
              </button>
            </form>
          ) : (
            <div className="text-center">
              <p className="text-red-600 font-medium mb-4">
                Log in first to post your query.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Contact;
