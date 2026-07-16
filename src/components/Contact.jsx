import SectionTitle from "../components/common/SectionTitle";
import { useRef, useState } from "react";
import data from "../data/portfolio.json";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaPhone,
  FaSpinner,
  FaWhatsapp,
} from "react-icons/fa";
import Select from "react-select";

const Contact = () => {
  const cardRefs = useRef([]);
  const { contact } = data;

  const contactItems = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: contact?.email,
      href: `mailto:${contact?.email}`,
    },
    {
      icon: FaPhone,
      label: "Phone",
      value: contact?.phone,
      href: `tel:${contact?.phone}`,
    },
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      value: contact?.whatsapp,
      href: `https://wa.me/${contact?.whatsapp?.replace(/\s/g, "")}`,
    },
    {
      icon: FaMapMarkerAlt,
      label: "Address",
      value: contact?.address,
      href: contact?.map,
    },
  ];

  const [loading, setLoading] = useState(false);

  // Country list with dial codes
  const countries = [
    { value: "+91", label: "🇮🇳 India (+91)" },
    { value: "+1", label: "🇺🇸 USA (+1)" },
    { value: "+44", label: "🇬🇧 UK (+44)" },
    { value: "+971", label: "🇦🇪 UAE (+971)" },
    { value: "+61", label: "🇦🇺 Australia (+61)" },
    { value: "+81", label: "🇯🇵 Japan (+81)" },
    { value: "+49", label: "🇩🇪 Germany (+49)" },
    { value: "+33", label: "🇫🇷 France (+33)" },
    { value: "+55", label: "🇧🇷 Brazil (+55)" },
    { value: "+86", label: "🇨🇳 China (+86)" },
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      country: countries[0],
      phone: "",
      whatsapp: false,
      attachment: null,
      subject: "",
      message: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .required("Please enter your name.")
        .min(2, "Name must be at least 2 characters."),

      email: Yup.string()
        .trim()
        .email("Please enter a valid email address.")
        .required("Email is required."),

      phone: Yup.string()
        .required("Phone number is required.")
        .min(4, "Please enter a valid phone number.")
        .matches(/^[0-9+\-\s()]+$/, "Invalid phone number format."),

      whatsapp: Yup.boolean(),

      attachment: Yup.mixed()
        .nullable()
        .test("fileSize", "Maximum file size is 50 MB.", (file) => {
          if (!file) return true;
          return file.size <= 50 * 1024 * 1024;
        }),

      subject: Yup.string()
        .trim()
        .required("Subject is required."),

      message: Yup.string()
        .trim()
        .required("Message is required.")
        .min(10, "Message must be at least 10 characters."),
    }),

    validateOnChange: true,
    validateOnBlur: true,

    onSubmit: async (values, { resetForm }) => {
      setLoading(true);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        alert("✅ Message sent successfully!");
        resetForm();
      } catch (error) {
        console.log("error==>", error)
        // alert("❌ Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleFileChange = (e) => {
    formik.setFieldValue("attachment", e.target.files[0]);
  };

  return (
    <section id="contact" className="section section-white">
      <div className="container">
        <SectionTitle title="Get In Touch" subtitle="Let's work together" />

        <div className="row g-5">
          {/* Left – Contact Info Cards */}
          <div className="col-lg-4">
            <div className="d-flex flex-column gap-2 stagger-children">
              {contactItems.map((item, idx) => (
                <div
                  key={idx}
                  className="card card--contact-info card--3d"
                  ref={(el) => (cardRefs.current[800 + idx] = el)}
                >
                  <div className="contact-icon">
                    <item.icon />
                  </div>
                  <div>
                    <p className="contact-label">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.label === "Address" ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className="contact-value"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="contact-value">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right – Contact Form */}
          <div className="col-lg-8">
            <div className="card contact-form-card">
              <form onSubmit={formik.handleSubmit} noValidate>
                {/* Name */}
                <div className="form-group mb-3">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${
                      formik.touched.name && formik.errors.name
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="John Doe"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="invalid-feedback">{formik.errors.name}</div>
                  )}
                </div>

                {/* Email */}
                <div className="form-group mb-3">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${
                      formik.touched.email && formik.errors.email
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="you@example.com"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="invalid-feedback">{formik.errors.email}</div>
                  )}
                </div>

                {/* Phone – Combined Country + Number */}
                <div className="form-group mb-3">
                  <label className="form-label">Phone Number *</label>
                  <div className="phone-group">
                    <div className="country-select">
                      <Select
                        name="country"
                        options={countries}
                        value={formik.values.country}
                        onChange={(value) =>
                          formik.setFieldValue("country", value)
                        }
                        isSearchable
                        placeholder="Code"
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    </div>
                    <div className="phone-input">
                      <input
                        type="text"
                        name="phone"
                        className={`form-control ${
                          formik.touched.phone && formik.errors.phone
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="Enter phone number"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="text-danger mt-1">{formik.errors.phone}</div>
                  )}
                </div>

                {/* WhatsApp Checkbox */}
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="whatsapp"
                    id="whatsappCheck"
                    checked={formik.values.whatsapp}
                    onChange={formik.handleChange}
                  />
                  <label className="form-check-label" htmlFor="whatsappCheck">
                    This number is also available on WhatsApp
                  </label>
                </div>

                {/* File Attachment */}
                <div className="form-group mb-3">
                  <label className="form-label">Attachment (optional)</label>
                  <input
                    type="file"
                    className="form-control"
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.zip"
                    onChange={handleFileChange}
                  />
                  <small className="text-muted">
                    Allowed: JPG, PNG, PDF, DOC, DOCX, ZIP (Max 50 MB)
                  </small>
                  {formik.errors.attachment && (
                    <div className="text-danger mt-1">
                      {formik.errors.attachment}
                    </div>
                  )}
                </div>

                {/* Subject */}
                <div className="form-group mb-3">
                  <label className="form-label">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    className={`form-control ${
                      formik.touched.subject && formik.errors.subject
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Inquiry about..."
                  />
                  {formik.touched.subject && formik.errors.subject && (
                    <div className="invalid-feedback">
                      {formik.errors.subject}
                    </div>
                  )}
                </div>

                {/* Message */}
                <div className="form-group mb-3">
                  <label className="form-label">Message *</label>
                  <textarea
                    rows="5"
                    name="message"
                    className={`form-control ${
                      formik.touched.message && formik.errors.message
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Tell us about your project..."
                  />
                  {formik.touched.message && formik.errors.message && (
                    <div className="invalid-feedback">
                      {formik.errors.message}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!formik.isValid || loading}
                >
                  {loading ? (
                    <>
                      <FaSpinner className="fa-spin me-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="me-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;