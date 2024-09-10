// Modal.tsx
import React, { ReactNode, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      // Отключить прокрутку страницы при открытии модального окна
      document.body.style.overflow = 'hidden';
    } else {
      // Включить прокрутку страницы при закрытии модального окна
      document.body.style.overflow = 'auto';
    }

    // Очистка стиля при размонтировании компонента
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className='modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100]'>
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg max-w-4xl w-full max-h-full relative overflow-auto">
        <button onClick={onClose} className="absolute top-2 right-2 text-red-500 text-2xl">
          &times;
        </button>
        {children}
      </div>
    </div>
    </div>
  );
};

export default Modal;
