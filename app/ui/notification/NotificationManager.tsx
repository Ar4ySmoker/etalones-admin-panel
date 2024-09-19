'use client'
import React, { ReactNode, useState } from "react";
import BaseNotification from "./BaseNotification";
import NotificationContext from "@/app/context/NotificationContext";

export interface NotificationData {
  id: string; // Уникальный идентификатор для уведомлений
  title: string;
  content: string;
  type: "success" | "error" | "warning" | "info";
}

interface NotificationManagerProps {
  children: ReactNode;
}

const NotificationManager: React.FC<NotificationManagerProps> = (props) => {
  const [notifications, setNotifications] = useState<Array<NotificationData>>([]);

  const addNotification = (notif: NotificationData) => {
    setNotifications(notifications.concat(notif));
    
    // Удаление уведомления через 5 секунд
    setTimeout(() => {
      setNotifications((prevNotifications) =>
        prevNotifications.filter((n) => n.id !== notif.id)
      );
    }, 3000); // 3000 миллисекунд = 3 секунд
  };

  return (
    <NotificationContext.Provider value={addNotification}>
      {props.children}
      <div className="fixed bottom-0 max-w-xl">
        {notifications.map(notification =>
          <BaseNotification key={notification.id} {...notification}
            onClick={() => {
              setNotifications(notifications.filter(n => n.id !== notification.id));
            }}
          />
        )}
      </div>
    </NotificationContext.Provider>
  );
};

export default NotificationManager;
