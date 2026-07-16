import SectionTitle from "./common/SectionTitle";
import data from '../data/portfolio.json';
import { useRef } from "react";
import { FaCheck } from "react-icons/fa";
import Button from "./common/Button";

const Pricing = () => {
    const { pricing } = data;
    const cardRefs = useRef([]);
    return (
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
    )
}
export default Pricing;