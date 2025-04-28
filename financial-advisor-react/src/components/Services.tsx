import { useEffect, useRef, useState } from 'react';
import '../styles/Services.css';
import Modal from './Modal';

interface ServiceCard {
  title: string;
  description: string;
  icon: string;
  detailedDescription: string;
}

const baseServices: ServiceCard[] = [
  {
    title: "Investment Planning",
    description: "Strategic investment solutions tailored to your financial goals",
    icon: "💰",
    detailedDescription: "Our investment planning service provides comprehensive strategies designed to help you achieve your financial objectives. We analyze your current financial situation, risk tolerance, and long-term goals to create a personalized investment portfolio. Our team of experts will guide you through market fluctuations and help you make informed decisions about your investments."
  },
  {
    title: "Retirement Planning",
    description: "Secure your future with comprehensive retirement strategies",
    icon: "🏖️",
    detailedDescription: "Plan for a comfortable retirement with our expert guidance. We'll help you calculate your retirement needs, create a savings strategy, and develop a plan for managing your retirement income. Our comprehensive approach includes Social Security optimization, pension planning, and healthcare cost considerations."
  },
  {
    title: "Tax Optimization",
    description: "Minimize tax burden through smart financial planning",
    icon: "📊",
    detailedDescription: "Our tax optimization strategies help you keep more of your hard-earned money. We analyze your tax situation and implement strategies to minimize your tax liability while ensuring compliance with tax laws. From tax-efficient investment strategies to retirement account optimization, we'll help you make the most of available tax benefits."
  },
  {
    title: "Estate Planning",
    description: "Protect your legacy with proper estate management",
    icon: "🏛️",
    detailedDescription: "Ensure your assets are protected and distributed according to your wishes with our comprehensive estate planning services. We'll help you create a plan that minimizes estate taxes, provides for your loved ones, and supports your charitable goals. Our services include will preparation, trust creation, and legacy planning."
  },
  {
    title: "Risk Management",
    description: "Safeguard your assets with effective risk mitigation",
    icon: "🛡️",
    detailedDescription: "Protect your financial future with our risk management strategies. We'll help you identify potential risks to your financial security and develop a comprehensive plan to mitigate them. From insurance planning to emergency fund strategies, we'll ensure you're prepared for life's uncertainties."
  },
  {
    title: "Wealth Management",
    description: "Comprehensive wealth management for long-term growth",
    icon: "📈",
    detailedDescription: "Our wealth management service provides a holistic approach to growing and preserving your wealth. We combine investment management, tax planning, and estate planning to create a comprehensive strategy for your financial future. Our team will work with you to develop and implement a plan that aligns with your goals and values."
  }
];

// Create three sets of services for infinite loop effect
const services = [...baseServices, ...baseServices, ...baseServices];

const Services = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<ServiceCard | null>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 1;
    let scrollInterval: number;

    const startScroll = () => {
      scrollInterval = window.setInterval(() => {
        if (scrollContainer) {
          scrollContainer.scrollLeft += scrollAmount;
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
          <div 
            key={index} 
            className="service-card"
            onClick={() => setSelectedService(service)}
          >
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
      {selectedService && (
        <Modal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          service={selectedService}
        />
      )}
    </section>
  );
};

export default Services; 