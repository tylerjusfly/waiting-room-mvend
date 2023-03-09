import { BehaviorSubject } from "rxjs";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notifications = new BehaviorSubject(null);

class NotificationService {
  notifications = notifications.asObservable();
  configuration = {
    position: toast.POSITION.TOP_CENTER,
    transition: Bounce,
  };

  sendNotification = (message, type, options = {}) => {
    try {
      if (message) {
        switch (type) {
          case AlertTypes.success:
            notifications.next(() =>
              toast.success(message, this.configuration)
            );
            break;

          case AlertTypes.error:
            notifications.next(() => toast.error(message, this.configuration));
            break;

          default:
            notifications.next(() =>
              toast(message, { ...this.configuration, ...options })
            );
            break;
        }
      }
    } catch (ex) {
      notifications.next(() => toast.error(ex.message, this.configuration));
    }
  };
}

// Create a New Instance Of Notification Class
const Notify = new NotificationService();

export default Notify;

const AlertTypes = Object.freeze({
  success: Symbol("success"),
  error: Symbol("error"),
});

export const notifySuccess = (message) => {
  Notify.sendNotification(message, AlertTypes.success);
};

export const notifyError = (message) => {
  Notify.sendNotification(message, AlertTypes.error);
};
