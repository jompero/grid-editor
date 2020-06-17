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

export function notifyError(message: string) {
  return {
    type: 'NOTIFY',
    data: {
      message,
      severity: "error"
    }
  }
}

export function reset() {
  return {
    type: 'RESET_NOTIFICATION'
  }
}

export default notificationsReducer;