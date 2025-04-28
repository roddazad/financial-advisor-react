import { useEffect, useRef } from 'react';
import '../styles/About.css';

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!aboutRef.current) return;

      const rect = aboutRef.current.getBoundingClientRect();
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate how far the section is from the viewport center
      const distanceFromCenter = rect.top + rect.height / 2 - windowHeight / 2;
      const scrollProgress = Math.min(Math.max(-distanceFromCenter / (windowHeight / 2), -1), 1);

      // Apply animations based on scroll direction
      if (imageRef.current) {
        imageRef.current.style.transform = `translateX(${scrollProgress * 50}px) rotate(${scrollProgress * 5}deg)`;
        imageRef.current.style.opacity = `${1 - Math.abs(scrollProgress) * 0.5}`;
      }

      if (contentRef.current) {
        contentRef.current.style.transform = `translateX(${-scrollProgress * 50}px)`;
        contentRef.current.style.opacity = `${1 - Math.abs(scrollProgress) * 0.5}`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="about-section" ref={aboutRef}>
      <div className="about-container">
        <div className="about-image-container" ref={imageRef}>
          <div className="image-placeholder">
            <img src="/src/assets/profile.jpeg" alt="Financial Advisor" />
          </div>
        </div>
        <div className="about-content" ref={contentRef}>
          <h2>About Us</h2>
          <div className="about-text">
            <p>
              With over 15 years of experience in financial planning and wealth management, 
              we are dedicated to helping our clients achieve their financial goals. Our team 
              of certified financial advisors brings expertise, integrity, and personalized 
              attention to every client relationship.
            </p>
            <p>
              We believe in building long-term relationships based on trust and transparency. 
              Our approach combines cutting-edge financial technology with time-tested investment 
              strategies to deliver comprehensive solutions tailored to your unique needs.
            </p>
            <div className="stats-container">
              <div className="stat-item">
                <span className="stat-number">15+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Happy Clients</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">$100M+</span>
                <span className="stat-label">Assets Managed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 