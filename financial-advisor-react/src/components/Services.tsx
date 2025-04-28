import { useEffect, useRef } from 'react';
import '../styles/Services.css';

interface ServiceCard {
  title: string;
  description: string;
  icon: string;
}

const baseServices: ServiceCard[] = [
  {
    title: "Investment Planning",
    description: "Strategic investment solutions tailored to your financial goals",
    icon: "💰"
  },
  {
    title: "Retirement Planning",
    description: "Secure your future with comprehensive retirement strategies",
    icon: "🏖️"
  },
  {
    title: "Tax Optimization",
    description: "Minimize tax burden through smart financial planning",
    icon: "📊"
  },
  {
    title: "Estate Planning",
    description: "Protect your legacy with proper estate management",
    icon: "🏛️"
  },
  {
    title: "Risk Management",
    description: "Safeguard your assets with effective risk mitigation",
    icon: "🛡️"
  },
  {
    title: "Wealth Management",
    description: "Comprehensive wealth management for long-term growth",
    icon: "📈"
  }
];

// Create three sets of services for infinite loop effect
const services = [...baseServices, ...baseServices, ...baseServices];

const Services = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 1;
    let scrollInterval: number;

    const startScroll = () => {
      scrollInterval = window.setInterval(() => {
        if (scrollContainer) {
          scrollContainer.scrollLeft += scrollAmount;
          // Reset scroll position when reaching the end of the first set
          if (scrollContainer.scrollLeft >= (scrollContainer.scrollWidth / 3)) {
            scrollContainer.scrollLeft = 0;
          }
        }
      }, 30);
    };

    const stopScroll = () => {
      window.clearInterval(scrollInterval);
    };

    startScroll();

    scrollContainer.addEventListener('mouseenter', stopScroll);
    scrollContainer.addEventListener('mouseleave', startScroll);

    return () => {
      window.clearInterval(scrollInterval);
      scrollContainer.removeEventListener('mouseenter', stopScroll);
      scrollContainer.removeEventListener('mouseleave', startScroll);
    };
  }, []);

  return (
    <section className="services-section" ref={scrollRef}>
      <h2>Our Services</h2>
      <div className="services-container" ref={scrollContainerRef}>
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services; 