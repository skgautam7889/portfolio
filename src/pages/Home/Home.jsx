import { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    FaGlobe,
    FaReact,
    FaNode,
    FaPhp,
    FaPython,
    FaGit,
    FaBriefcase,
    FaProjectDiagram,
    FaUsers,
    FaCode,
    FaMobileAlt,
    FaPaintBrush,
    FaDownload,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaWhatsapp,
    FaGraduationCap,
    FaCheck,
    FaArrowUp,
    FaPaperPlane,
} from 'react-icons/fa';
import {
    SiNextdotjs,
    SiTypescript,
    SiLaravel,
    SiMysql,
    SiPostgresql,
    SiMongodb,
    SiDocker,
    SiHtml5,
} from 'react-icons/si';
import data from '../../data/portfolio.json';
import SectionTitle from '../../components/common/SectionTitle';
import Button from '../../components/common/Button';
import Hero from '../../components/Hero';
import Statistics from '../../components/Statistics';
import About from '../../components/About';

const iconMap = {
    FaGlobe,
    FaReact,
    FaNode,
    FaPhp,
    FaPython,
    FaGit,
    FaBriefcase,
    FaProjectDiagram,
    FaUsers,
    FaCode,
    FaMobileAlt,
    FaPaintBrush,
    FaDownload,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaWhatsapp,
    FaGraduationCap,
    SiNextdotjs,
    SiTypescript,
    SiLaravel,
    SiMysql,
    SiPostgresql,
    SiMongodb,
    SiDocker,
    SiHtml5,
};

const Home = () => {
    const {
        skills,
        services,
        experience,
        education,
        certificates,
        projects,
        testimonials,
        pricing,
        resume,
        contact,
    } = data;

    const cardRefs = useRef([]);
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 3D card mouse effect
    useEffect(() => {
        const cards = cardRefs.current;
        const handleMouseMove = (e, el) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * 4;
            const rotateY = ((x - centerX) / centerX) * 4;
            el.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        };
        const handleMouseLeave = (el) => {
            el.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0px)';
        };

        cards.forEach((el) => {
            if (el) {
                el.addEventListener('mousemove', (e) => handleMouseMove(e, el));
                el.addEventListener('mouseleave', () => handleMouseLeave(el));
            }
        });

        return () => {
            cards.forEach((el) => {
                if (el) {
                    el.removeEventListener('mousemove', (e) => handleMouseMove(e, el));
                    el.removeEventListener('mouseleave', () => handleMouseLeave(el));
                }
            });
        };
    }, []);

    const [filter, setFilter] = useState('All');
    const categories = useMemo(() => {
        const cats = ['All', ...new Set(projects?.map((p) => p.category).filter(Boolean))];
        return cats;
    }, [projects]);
    const filteredProjects = useMemo(() => {
        if (filter === 'All') return projects || [];
        return projects?.filter((p) => p.category === filter) || [];
    }, [filter, projects]);

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

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {/* ===== HERO ===== */}
            <Hero />
            {/* ===== STATISTICS ===== */}
            <Statistics />


            {/* ===== ABOUT ===== */}
            <About />

            {/* ===== SKILLS ===== */}
            <section id="skills" className="section section-alt">
                <div className="container">
                    <SectionTitle title="My Skills" subtitle="Technologies & tools I work with" />
                    {skills?.categories?.map((category, idx) => (
                        <div key={idx} className="mb-4">
                            <h4 style={{ color: 'var(--color-text-primary)', marginBottom: '20px' }}>{category.name}</h4>
                            <div className="row g-4 stagger-children">
                                {category.skills?.map((skill, skillIdx) => {
                                    const Icon = iconMap[skill.icon] || FaCode;
                                    return (
                                        <div
                                            key={skillIdx}
                                            className="col-6 col-md-4 col-lg-3"
                                            ref={(el) => (cardRefs.current[idx * 10 + skillIdx] = el)}
                                        >
                                            <div className="card card--skill card--3d">
                                                <div className="skill-icon">
                                                    <Icon />
                                                </div>
                                                <h5 className="card-title">{skill.name}</h5>
                                                <div className="skill-bar">
                                                    <div className="skill-bar-fill" style={{ width: `${skill.percentage || 0}%` }} />
                                                </div>
                                                <span className="skill-percent">{skill.percentage || 0}%</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== SERVICES ===== */}
            <section id="services" className="section section-white">
                <div className="container">
                    <SectionTitle title="My Services" subtitle="What I can do for you" />
                    <div className="row g-4 stagger-children">
                        {services?.map((service, idx) => {
                            const Icon = iconMap[service.icon] || FaGlobe;
                            return (
                                <div key={idx} className="col-md-6 col-lg-4" ref={(el) => (cardRefs.current[100 + idx] = el)}>
                                    <div className="card card--service card--3d">
                                        <div className="card-icon">
                                            <Icon />
                                        </div>
                                        <h5 className="card-title">{service.title}</h5>
                                        <p className="card-text">{service.description}</p>
                                        <a href="#contact" className="card-link">
                                            Learn More →
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===== EXPERIENCE ===== */}
            <section id="experience" className="section section-alt">
                <div className="container">
                    <SectionTitle title="Work Experience" subtitle="My professional journey" />
                    <div className="row g-4 stagger-children">
                        {experience?.map((exp, idx) => (
                            <div key={idx} className="col-12" ref={(el) => (cardRefs.current[200 + idx] = el)}>
                                <div className="card card--experience card--3d">
                                    <div className="row align-items-start">
                                        <div className="col-md-3">
                                            {exp.logo && <img src={exp.logo} alt={exp.company} className="exp-company-logo" />}
                                            <h5 style={{ marginBottom: '4px' }}>{exp.company}</h5>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{exp.location}</p>
                                        </div>
                                        <div className="col-md-9">
                                            <h5 style={{ color: 'var(--color-text-primary)' }}>{exp.position}</h5>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{exp.duration}</p>
                                            <p>{exp.description}</p>
                                            <div className="exp-tech">
                                                {exp.technologies?.map((tech, tIdx) => (
                                                    <span key={tIdx} className="badge badge-primary badge--tech">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== EDUCATION ===== */}
            <section id="education" className="section section-white">
                <div className="container">
                    <SectionTitle title="Education" subtitle="My academic background" />
                    <div className="row g-4 stagger-children">
                        {education?.map((edu, idx) => (
                            <div key={idx} className="col-md-6" ref={(el) => (cardRefs.current[300 + idx] = el)}>
                                <div className="card card--education card--3d">
                                    {edu.logo && <img src={edu.logo} alt={edu.college} className="edu-logo" />}
                                    <h5 className="card-title">{edu.degree}</h5>
                                    <p style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>{edu.college}</p>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                        {edu.university} • {edu.year}
                                    </p>
                                    <p className="card-text">{edu.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CERTIFICATES ===== */}
            <section id="certificates" className="section section-alt">
                <div className="container">
                    <SectionTitle title="Certificates" subtitle="My professional certifications" />
                    <div className="row g-4 stagger-children">
                        {certificates?.map((cert, idx) => (
                            <div key={idx} className="col-md-4" ref={(el) => (cardRefs.current[400 + idx] = el)}>
                                <div className="card card--certificate card--3d">
                                    <div className="cert-avatar">
                                        <img src={cert.image || 'https://picsum.photos/seed/default/400/400'} alt={cert.title} />
                                    </div>
                                    <h5 className="card-title">{cert.title}</h5>
                                    <p style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{cert.organization}</p>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{cert.year}</p>
                                    {cert.verify && (
                                        <a href={cert.verify} target="_blank" rel="noopener noreferrer" className="cert-verify">
                                            Verify
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== PROJECTS ===== */}
            <section id="projects" className="section section-white">
                <div className="container">
                    <SectionTitle title="My Projects" subtitle="Some of my recent work" />

                    <div className="filter-group">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`filter-btn ${filter === cat ? 'filter-btn--active' : ''}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="row g-4 stagger-children">
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project, idx) => (
                                <div key={project.id} className="col-md-6 col-lg-4" ref={(el) => (cardRefs.current[500 + idx] = el)}>
                                    <div className="card card--image-top card--3d">
                                        <div className="card-img-wrap">
                                            <img src={project.thumbnail || project.image || 'https://picsum.photos/seed/project/400/300'} alt={project.title} />
                                            <span className="badge badge-primary card-badge">{project.category}</span>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">{project.title}</h5>
                                            <p className="card-text">{project.description?.slice(0, 80)}...</p>
                                            <div className="card-tech">
                                                {project.technologies?.slice(0, 4).map((tech, tIdx) => (
                                                    <span key={tIdx} className="badge badge--tech">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="card-actions">
                                                {project.demo && (
                                                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                                                        Live
                                                    </a>
                                                )}
                                                {project.github && (
                                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                                                        Code
                                                    </a>
                                                )}
                                                <Link to={`/projects/${project.slug}`} className="btn btn-outline btn-sm">
                                                    Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="project-empty col-12">
                                <p>No projects found in this category.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ===== TESTIMONIALS ===== */}
            {testimonials && testimonials.length > 0 && (
                <section className="section section-alt">
                    <div className="container">
                        <SectionTitle title="Testimonials" subtitle="What people say about me" />
                        <div className="row g-4 stagger-children">
                            {testimonials.map((testimonial, idx) => (
                                <div key={idx} className="col-md-6" ref={(el) => (cardRefs.current[600 + idx] = el)}>
                                    <div className="card card--3d" style={{ padding: '24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                                            <img
                                                src={testimonial.image || 'https://images.unsplash.com/photo-1494790108379-be9c6b7ee3b6?w=200&h=200&fit=crop&crop=face'}
                                                alt={testimonial.name}
                                                style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
                                            />
                                            <div>
                                                <h5 style={{ marginBottom: '2px' }}>{testimonial.name}</h5>
                                                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                                                    {testimonial.company} • {testimonial.position}
                                                </p>
                                            </div>
                                        </div>
                                        <p style={{ fontStyle: 'italic' }}>"{testimonial.review}"</p>
                                        <div style={{ color: '#f1c40f', fontSize: '1.2rem' }}>{'★'.repeat(testimonial.rating || 5)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ===== PRICING ===== */}
            <section id="pricing" className="section section-white">
                <div className="container">
                    <SectionTitle title="Pricing" subtitle="Choose the plan that fits your needs" />
                    <div className="row g-4 stagger-children">
                        {pricing?.map((plan, idx) => (
                            <div key={idx} className="col-md-4" ref={(el) => (cardRefs.current[700 + idx] = el)}>
                                <div className={`card card--pricing card--3d ${plan.featured ? 'featured' : ''}`}>
                                    {plan.featured && <span className="pricing-badge">Popular</span>}
                                    <h4>{plan.title}</h4>
                                    <div className="pricing-price">
                                        {plan.price} <small>/ {plan.period}</small>
                                    </div>
                                    <ul>
                                        {plan.features?.map((feature, fIdx) => (
                                            <li key={fIdx}>
                                                <FaCheck /> {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button href="#contact" variant={plan.featured ? 'primary' : 'outline'} size="md">
                                        {plan.buttonText || 'Get Started'}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== RESUME ===== */}
            <section id="resume" className="section section-alt">
                <div className="container">
                    <SectionTitle title="Resume" subtitle="My professional summary" />

                    <div className="text-center mb-3">
                        <Button href={resume?.file || '/resume.pdf'} variant="primary" icon={<FaDownload />}>
                            Download Resume
                        </Button>
                    </div>

                    {resume?.summary && (
                        <div className="resume-summary card card--no-hover">
                            <p>{resume.summary}</p>
                        </div>
                    )}

                    <div className="row g-5">
                        <div className="col-lg-6">
                            <h3 className="resume-section-title">
                                <FaBriefcase /> Experience
                            </h3>
                            {experience?.map((exp, idx) => (
                                <div key={idx} className="resume-item">
                                    <h5>{exp.position}</h5>
                                    <p className="item-sub">{exp.company}</p>
                                    <p className="item-meta">{exp.duration}</p>
                                    <p className="item-desc">{exp.description}</p>
                                </div>
                            ))}
                        </div>

                        <div className="col-lg-6">
                            <h3 className="resume-section-title">
                                <FaGraduationCap /> Education
                            </h3>
                            {education?.map((edu, idx) => (
                                <div key={idx} className="resume-item">
                                    <h5>{edu.degree}</h5>
                                    <p className="item-sub">{edu.college}</p>
                                    <p className="item-meta">{edu.university} • {edu.year}</p>
                                    <p className="item-desc">{edu.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4">
                        <h3 className="resume-section-title">
                            <FaCode /> Skills Summary
                        </h3>
                        <div className="row g-3 resume-skills-grid">
                            {skills?.categories?.map((cat, idx) => (
                                <div key={idx} className="col-md-6 col-lg-4">
                                    <div className="card skill-summary-card">
                                        <h6>{cat.name}</h6>
                                        <div className="skill-tags">
                                            {cat.skills?.map((s, sIdx) => (
                                                <span key={sIdx} className="badge badge--tech">
                                                    {s.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CONTACT ===== */}
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

            {/* ===== CTA ===== */}
            <section className="section-cta">
                <div className="container text-center">
                    <h2>
                        Ready to build something{' '}
                        <span style={{ color: 'var(--color-text-primary)' }}>amazing</span>?
                    </h2>
                    <p style={{ maxWidth: '500px', margin: '12px auto 24px', fontSize: '1.05rem' }}>
                        Let's collaborate and create something extraordinary together.
                    </p>
                    <Button href="#contact" variant="primary" size="lg">
                        Let's Talk
                    </Button>
                </div>
            </section>

            {/* ===== FAB BUTTONS ===== */}
            <div className="fab-container">
                <button
                    className={`fab-btn fab-btn--top ${showTop ? 'visible' : ''}`}
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                >
                    <FaArrowUp />
                </button>
                <a
                    href={`https://wa.me/${contact?.whatsapp?.replace(/\s/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fab-btn fab-btn--whatsapp"
                    aria-label="WhatsApp"
                >
                    <FaWhatsapp />
                </a>
            </div>
        </>
    );
};

export default Home;