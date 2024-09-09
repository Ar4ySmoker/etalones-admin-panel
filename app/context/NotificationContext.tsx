import React from 'react';
import { NotificationData } from "../ui/notification/NotificationManager";

const NotificationContext = React.createContext<(notif: NotificationData) => void>(() => {});

export default NotificationContext;
