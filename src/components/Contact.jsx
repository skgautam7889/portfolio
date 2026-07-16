import SectionTitle from "./common/SectionTitle";
import Button from "./common/Button";
import { useRef, useState } from "react";
import data from '../data/portfolio.json';
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaPhone, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
    const cardRefs = useRef([]);
    const { contact } = data;
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', form);
        setSubmitted(true);
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 4000);
    };

    const contactItems = [
        { icon: FaEnvelope, label: 'Email', value: contact?.email, href: `mailto:${contact?.email}` },
        { icon: FaPhone, label: 'Phone', value: contact?.phone, href: `tel:${contact?.phone}` },
        {
            icon: FaWhatsapp,
            label: 'WhatsApp',
            value: contact?.whatsapp,
            href: `https://wa.me/${contact?.whatsapp?.replace(/\s/g, '')}`,
        },
        { icon: FaMapMarkerAlt, label: 'Address', value: contact?.address, href: contact?.map },
    ];

    return (
        <section id="contact" className="section section-white">
            <div className="container">
                <SectionTitle title="Get In Touch" subtitle="Let's work together" />

                <div className="row g-5">
                    <div className="col-lg-4">
                        <div className="d-flex flex-column gap-2 stagger-children">
                            {contactItems.map((item, idx) => (
                                <div key={idx} className="card card--contact-info card--3d" ref={(el) => (cardRefs.current[800 + idx] = el)}>
                                    <div className="contact-icon">
                                        <item.icon />
                                    </div>
                                    <div>
                                        <p className="contact-label">{item.label}</p>
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                target={item.label === 'Address' ? '_blank' : '_self'}
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

                    <div className="col-lg-8">
                        <div className="card contact-form-card">
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            value={form.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Phone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            className="form-control"
                                            value={form.phone}
                                            onChange={handleChange}
                                            placeholder="+1 234 567 890"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Subject *</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            className="form-control"
                                            value={form.subject}
                                            onChange={handleChange}
                                            required
                                            placeholder="Subject"
                                        />
                                    </div>
                                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                        <label className="form-label">Message *</label>
                                        <textarea
                                            name="message"
                                            className="form-control"
                                            rows="5"
                                            value={form.message}
                                            onChange={handleChange}
                                            required
                                            placeholder="Your message..."
                                        />
                                    </div>
                                </div>
                                <Button type="submit" variant="primary" size="lg" icon={<FaPaperPlane />}>
                                    Send Message
                                </Button>
                                {submitted && <span className="form-success">✓ Message sent!</span>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Contact;