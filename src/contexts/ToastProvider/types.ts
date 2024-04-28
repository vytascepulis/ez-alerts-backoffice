export interface Context {
  fireToast: (settings: ToastInterface) => void;
  removeToast: (toastId: string) => void;
}

export interface ToastInterface {
  type: 'success' | 'warning' | 'error';
  message: string;
}

export type ActiveToast = ToastInterface & { id: string };
