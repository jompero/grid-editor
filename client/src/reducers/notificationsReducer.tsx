export interface NotificationsState {
  message: string,
  severity: "success" | "info" | "warning" | "error" | undefined
}

interface NotificationsAction {
  type: string,
  data: {
    message: string,
    severity: "success" | "info" | "warning" | "error" | undefined
  }
}

function notificationsReducer(state: NotificationsState | {} = {}, action: NotificationsAction) {
  switch(action.type) {
    case 'NOTIFY':
      return action.data;
    case 'RESET_NOTIFICATION':
      return {};
    default: 
      return state;
  }
}

export function notify(message: string, severity: "success" | "info" | "warning" | "error" | undefined = undefined) {
  return {
    type: 'NOTIFY',
    data: {
      message,
      severity
    }
  }
}

export function resetNotifications() {
  return {
    type: 'RESET_NOTIFICATION'
  }
}

export default notificationsReducer;