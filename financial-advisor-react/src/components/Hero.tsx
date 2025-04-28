import { useEffect, useRef, useState } from 'react';
import heroImage from '../assets/hero.jpeg';
import '../styles/Hero.css';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sloganRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isContentHidden, setIsContentHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const elements = [titleRef, sloganRef, buttonRef];
      
      // Hide content when scrolling down
      if (scrollY > 50) {
        setIsContentHidden(true);
      } else {
        setIsContentHidden(false);
      }
      
      elements.forEach((ref, index) => {
        if (ref.current) {
          const element = ref.current;
          const speed = 0.5 + (index * 0.1);
          const yPos = -(scrollY * speed);
          element.style.transform = `translateY(${yPos}px)`;
          element.style.opacity = `${1 - (scrollY * 0.003)}`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className={`hero-content ${isContentHidden ? 'hidden' : ''}`}>
        <h1 ref={titleRef} className="hero-title">Your Financial Future Starts Here</h1>
        <p ref={sloganRef} className="hero-slogan">Expert guidance for your financial journey</p>
        <button ref={buttonRef} className="hero-button">View Our Services</button>
      </div>
    </section>
  );
};

export default Hero; 