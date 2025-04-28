import { useEffect } from 'react';
import '../styles/Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    description: string;
    icon: string;
    detailedDescription: string;
  };
}

const Modal = ({ isOpen, onClose, service }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-header">
          <div className="modal-icon">{service.icon}</div>
          <h2>{service.title}</h2>
        </div>
        <div className="modal-body">
          <p>{service.detailedDescription}</p>
        </div>
        <div className="modal-footer">
          <button className="request-info-btn" onClick={() => {
            // Handle request more info action
            console.log('Request more info for:', service.title);
          }}>
            Request More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal; 