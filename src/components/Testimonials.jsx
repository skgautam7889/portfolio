import SectionTitle from "./common/SectionTitle";
import data from '../data/portfolio.json';
import { useRef } from "react";

const Testimonials = () => {
    const { testimonials } = data;
    const cardRefs = useRef([]);
    if(!(testimonials && testimonials.length)) {
        return null;
    }
    return (
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
    )
}
export default Testimonials;