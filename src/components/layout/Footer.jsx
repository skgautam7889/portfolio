// src/components/layout/Footer.jsx

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  // FaEnvelope,
  // FaPhone,
  // FaMapMarkerAlt,
  FaPaperPlane,
  FaSpinner,
} from 'react-icons/fa';

import data from '../../data/portfolio.json';
import Button from '../common/Button';
import SubscriberService from '../../services/SubscriberService';
import { sendContactEmail } from '../../services/web3FormsService';

const subscribeValidationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .required('Email address is required.')
    .email('Please enter a valid email address.'),
});

const Footer = () => {
  const { footer, socialLinks, website } = data;

  const [subscribed, setSubscribed] = useState(false);
  const [subscribeError, setSubscribeError] = useState('');

  const socialIcons = {
    github: FaGithub,
    linkedin: FaLinkedin,
    twitter: FaTwitter,
    instagram: FaInstagram,
    facebook: FaFacebook,
    youtube: FaYoutube,
  };

  const subscribeFormik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: subscribeValidationSchema,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      const email = values.email.trim();

      if (!email || !subscribeFormik.isValid) {
        return;
      }

      setSubscribeError('');
      setSubscribed(false);

      try {
        const payload = {
          email,
        };

        const res = await SubscriberService.subscribe(email);
        console.log("res==>", res)
        const formData = {
          name: "Dev Span",

          email: "skgautam7889@gmail.com",

          phone: "+91 9876543210",

          company: "ABC Pvt Ltd",

          subject: "Portfolio Inquiry",

          message: "Hello, I want to discuss a project.",
        };
        const response = await sendContactEmail(formData);
        console.log("response==>", response)
        if (response.success) {
          console.log("Email Sent");
        } else {
          console.log(response.message);
        }
        // if (response.success) {

        //   alert("Subscribed Successfully");

        // } else {

        //   alert(response.message);

        // }

        console.log('Subscribe payload:', payload);

        /*
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(
            responseData.message ||
              'Unable to subscribe. Please try again.',
          );
        }
        */

        await new Promise((resolve) => setTimeout(resolve, 2000));

        setSubscribed(true);
        resetForm();

        setTimeout(() => {
          setSubscribed(false);
        }, 3000);
      } catch (error) {
        console.error('Subscription failed:', error);

        setSubscribeError(
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.',
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleEmailChange = (event) => {
    if (subscribed) {
      setSubscribed(false);
    }

    if (subscribeError) {
      setSubscribeError('');
    }

    subscribeFormik.handleChange(event);
  };

  const emailValue = subscribeFormik.values.email.trim();

  const isSubscribeDisabled =
    subscribeFormik.isSubmitting ||
    subscribed ||
    !emailValue ||
    !subscribeFormik.dirty ||
    !subscribeFormik.isValid ||
    Boolean(subscribeFormik.errors.email);

  const handleSubscribeButtonClick = (event) => {
    if (isSubscribeDisabled) {
      event.preventDefault();
      event.stopPropagation();
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
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={key}
                    >
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
              {footer?.services?.map((service, index) => (
                <li key={index}>
                  <a href={service.hash}>{service.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Subscribe</h4>

            <p
              style={{
                fontSize: '0.9rem',
                opacity: 0.7,
                marginBottom: '12px',
              }}
            >
              Get the latest updates and offers.
            </p>

            <form
              onSubmit={subscribeFormik.handleSubmit}
              className="footer-subscribe"
              noValidate
            >
              <div className="footer-subscribe-field">
                <input
                  id="subscribeEmail"
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={subscribeFormik.values.email}
                  onChange={handleEmailChange}
                  onBlur={subscribeFormik.handleBlur}
                  disabled={subscribeFormik.isSubmitting || subscribed}
                  className={
                    subscribeFormik.touched.email &&
                      subscribeFormik.errors.email
                      ? 'is-invalid'
                      : ''
                  }
                  autoComplete="email"
                  aria-invalid={
                    subscribeFormik.touched.email &&
                    Boolean(subscribeFormik.errors.email)
                  }
                  aria-describedby="subscribeEmailError"
                />

                <span
                  id="subscribeEmailError"
                  className="footer-subscribe-error"
                >
                  {subscribeFormik.touched.email &&
                    subscribeFormik.errors.email
                    ? subscribeFormik.errors.email
                    : ''}
                </span>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={isSubscribeDisabled}
                aria-disabled={isSubscribeDisabled}
                onClick={handleSubscribeButtonClick}
                className={`footer-subscribe-button ${isSubscribeDisabled
                  ? 'footer-subscribe-button--disabled'
                  : ''
                  }`}
                icon={
                  subscribeFormik.isSubmitting ? (
                    <FaSpinner className="subscribe-spinner" />
                  ) : (
                    <FaPaperPlane />
                  )
                }
              >
                {subscribeFormik.isSubmitting
                  ? 'Subscribing...'
                  : subscribed
                    ? '✓ Done'
                    : 'Subscribe'}
              </Button>
            </form>

            <div className="footer-subscribe-message">
              {subscribeError && (
                <span
                  className="footer-subscribe-api-error"
                  role="alert"
                >
                  {subscribeError}
                </span>
              )}

              {subscribed && (
                <span
                  className="footer-subscribe-success"
                  role="status"
                >
                  You have subscribed successfully.
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          {footer?.copyright ||
            `© ${new Date().getFullYear()} ${website?.name || 'Portfolio'
            }. All rights reserved.`}
        </div>
      </div>
    </footer>
  );
};

export default Footer;