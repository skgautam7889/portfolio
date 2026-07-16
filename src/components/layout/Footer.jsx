// src/components/layout/Footer.jsx
import { useState } from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaYoutube,
//   FaEnvelope,
//   FaPhone,
//   FaMapMarkerAlt,
  FaPaperPlane,
} from 'react-icons/fa';
import data from '../../data/portfolio.json';
import Button from '../common/Button';

const Footer = () => {
  const { footer, socialLinks, website } = data;
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const socialIcons = {
    github: FaGithub,
    linkedin: FaLinkedin,
    twitter: FaTwitter,
    instagram: FaInstagram,
    facebook: FaFacebook,
    youtube: FaYoutube,
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>
              {website?.name || 'Portfolio'}
              <span>.</span>
            </h3>
            <p>{footer?.description || ''}</p>
            <div className="footer-social">
              {socialLinks &&
                Object.entries(socialLinks).map(([key, url]) => {
                  const Icon = socialIcons[key];
                  return Icon ? (
                    <a key={key} href={url} target="_blank" rel="noopener noreferrer" aria-label={key}>
                      <Icon />
                    </a>
                  ) : null;
                })}
            </div>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul>
              {footer?.quickLinks?.map((link) => (
                <li key={link.hash}>
                  <a href={link.hash}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Services</h4>
            <ul>
              {footer?.services?.map((service, idx) => (
                <li key={idx}>
                  <a href={service.hash}>{service.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Subscribe</h4>
            <p style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '12px' }}>
              Get the latest updates and offers.
            </p>
            <form onSubmit={handleSubscribe} className="footer-subscribe">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" variant="primary" size="sm" icon={<FaPaperPlane />}>
                {subscribed ? '✓ Done' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          {footer?.copyright ||
            `© ${new Date().getFullYear()} ${website?.name || 'Portfolio'}. All rights reserved.`}
        </div>
      </div>
    </footer>
  );
};

export default Footer;