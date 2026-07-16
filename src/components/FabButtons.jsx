import { FaArrowUp, FaWhatsapp } from "react-icons/fa";
import data from '../data/portfolio.json';
import { useEffect, useState } from "react";

const FabButtons = () => {
    const [showTop, setShowTop] = useState(false);

    const { contact } = data;
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            setShowTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
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
    )
}
export default FabButtons;