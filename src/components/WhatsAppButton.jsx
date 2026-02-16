import { useState, memo } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { HiXMark } from 'react-icons/hi2';

const PHONE_NUMBER = '33783052412';
const DEFAULT_MESSAGE = 'Bonjour Supaco Digital ! Je suis intéressé(e) par vos services.';

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="whatsapp">
      {isOpen && (
        <div className="whatsapp__popup">
          <div className="whatsapp__popup-header">
            <FaWhatsapp size={20} />
            <span>Une question ?</span>
            <button
              className="whatsapp__popup-close"
              onClick={() => setIsOpen(false)}
              aria-label="Fermer"
            >
              <HiXMark size={18} />
            </button>
          </div>
          <p className="whatsapp__popup-text">
            Discutons de votre projet directement sur WhatsApp !
          </p>
          <button className="whatsapp__popup-cta" onClick={handleClick}>
            Démarrer la conversation
          </button>
        </div>
      )}

      <button
        className="whatsapp__button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contacter via WhatsApp"
      >
        <FaWhatsapp size={28} />
      </button>
    </div>
  );
};

export default memo(WhatsAppButton);
