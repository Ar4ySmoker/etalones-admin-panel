'use client'
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Определяем типы для контекста
interface ModalContextType {
  isOpen: boolean;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  modalContent: ReactNode | null;
}

// Создаем начальное состояние контекста
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Провайдер для контекста
export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const openModal = (content: ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, modalContent }}>
      {children}
      {isOpen && <Modal />}
    </ModalContext.Provider>
  );
};

// Хук для использования контекста
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

// Модальное окно
const Modal: React.FC = () => {
  const { closeModal, modalContent } = useModal();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg max-w-lg w-full relative">
        <button onClick={closeModal} className="absolute top-2 right-2 text-red-500">
          &times;
        </button>
        <div>{modalContent}</div>
      </div>
    </div>
  );
};
