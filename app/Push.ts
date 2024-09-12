
const SERVICE_WORKER_FILE_PATH = '/sw.js'; // Обновлённый путь для service worker

// Преобразование base64 в Uint8Array
const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

// Проверка поддержки уведомлений
export function notificationUnsupported(): boolean {
  return !('serviceWorker' in navigator) || !('PushManager' in window) || !('showNotification' in ServiceWorkerRegistration.prototype);
}

// Проверка разрешений и регистрация
export function checkPermissionStateAndAct(
  onSubscribe: (subs: PushSubscription | null) => void,
): void {
  const state: NotificationPermission = Notification.permission;
  switch (state) {
    case 'denied':
      console.warn('Notifications are denied');
      break;
    case 'granted':
      registerAndSubscribe(onSubscribe);
      break;
    case 'default':
      console.log('Notification permission is default');
      break;
  }
}

// Подписка на уведомления
async function subscribe(onSubscribe: (subs: PushSubscription | null) => void): Promise<void> {
  try {
    const registration = await navigator.serviceWorker.ready;
    const applicationServerKey = urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!);
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey,
    });
    console.info('Created subscription Object: ', subscription.toJSON());
    await submitSubscription(subscription);
    onSubscribe(subscription);
  } catch (e) {
    console.error('Failed to subscribe cause of: ', e);
  }
}

// Отправка подписки на сервер
async function submitSubscription(subscription: PushSubscription): Promise<void> {
  try {
    const response = await fetch('/api/web-push/subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subscription }),
    });
    const result = await response.json();
    console.log('Subscription response:', result);
  } catch (e) {
    console.error('Failed to submit subscription:', e);
  }
}

// Регистрация Service Worker и подписка
export async function registerAndSubscribe(
  onSubscribe: (subs: PushSubscription | null) => void,
): Promise<void> {
  try {
    await navigator.serviceWorker.register(SERVICE_WORKER_FILE_PATH);
    await subscribe(onSubscribe);
  } catch (e) {
    console.error('Failed to register service-worker: ', e);
  }
}

// Отправка push уведомлений
export async function sendWebPush(message: string | null): Promise<void> {
  try {
    const response = await fetch('/api/web-push/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Test Push',
        body: message ?? 'This is a test push message',
        image: '/next.svg',
        icon: '/nextjs.svg',
        url: 'https://google.com',
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      console.error('Send push response error:', error);
    } else {
      const result = await response.json();
      console.log('Send push response:', result);
    }
  } catch (e) {
    console.error('Failed to send push notification:', e);
  }
}
