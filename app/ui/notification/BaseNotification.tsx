'use client'
import React from 'react';
import { LiaTimesCircle } from "react-icons/lia";

interface BaseNotificationProps {
  title: string;
  content: string;
  type: "success" | "error" | "warning" | "info";
  onClick: () => void;
}

const BaseNotification: React.FC<BaseNotificationProps> = ({ title, content, type, onClick }) => {
  // Определяем стили для разных типов уведомлений
  const typeStyles = {
    success: {
      borderColor: 'border-green-400',
      bgColor: 'bg-green-100',
      textColor: 'text-green-900',
    },
    error: {
      borderColor: 'border-red-400',
      bgColor: 'bg-red-100',
      textColor: 'text-red-900',
    },
    warning: {
      borderColor: 'border-yellow-400',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-900',
    },
    info: {
      borderColor: 'border-blue-400',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-900',
    },
  };

  // Получаем стили в зависимости от типа
  const styles = typeStyles[type];

  return (
    <div className={`m-4 border-l-4 ${styles.borderColor} ${styles.bgColor} rounded-sm shadow px-6 py-4 relative`}>
      <div onClick={onClick} className={`absolute ${styles.textColor} top-0 right-0 pt-2 pr-3 cursor-pointer`}>
        <LiaTimesCircle className="h-6 w-6" />
      </div>
      <p className={`text-lg font-bold ${styles.textColor}`}>{title}</p>
      <p className={`${styles.textColor}/80`}>{content}</p>
    </div>
  );
};

export default BaseNotification;
