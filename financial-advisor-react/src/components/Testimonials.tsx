import { useState, useEffect, useRef } from 'react';
import '../styles/Testimonials.css';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO",
    company: "Tech Innovations Inc.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    quote: "The financial guidance I received was transformative. Their team's expertise helped us navigate complex investment decisions and achieve remarkable growth for our company.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Entrepreneur",
    company: "Startup Vision",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    quote: "Working with this team has been a game-changer for my personal and business finances. Their strategic approach and personalized attention are unmatched.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Senior Manager",
    company: "Global Solutions",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    quote: "The level of professionalism and attention to detail is outstanding. They've helped me build a solid financial foundation for my future.",
    rating: 5
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Retired Executive",
    company: "Former Fortune 500",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    quote: "Their retirement planning expertise gave me the confidence to make the transition. I'm now enjoying my retirement with peace of mind.",
    rating: 5
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: number;
    if (isAutoPlaying) {
      interval = window.setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className="testimonials-section">
      <h2>Client Testimonials</h2>
      <div className="testimonials-container" ref={carouselRef}>
        <div 
          className="testimonials-carousel"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">"</div>
                <p className="testimonial-quote">{testimonial.quote}</p>
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="star">★</span>
                  ))}
                </div>
                <div className="testimonial-author">
                  <img src={testimonial.image} alt={testimonial.name} className="author-image" />
                  <div className="author-info">
                    <h3>{testimonial.name}</h3>
                    <p>{testimonial.role}</p>
                    <p className="company">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-button prev" onClick={handlePrev}>←</button>
        <button className="carousel-button next" onClick={handleNext}>→</button>
        <div className="carousel-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 