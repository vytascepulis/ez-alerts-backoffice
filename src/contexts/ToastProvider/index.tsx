import { createContext, ReactNode, useContext } from 'react';
import { ActiveToast, Context, ToastInterface } from './types.ts';
import useMergeState from '../../hooks/useMergeState.ts';
import style from './style.module.sass';
import Toast from './Toast.tsx';

interface Props {
  children: ReactNode;
}

interface State {
  activeToasts: ActiveToast[];
}

const ToastContext = createContext<Context>({
  fireToast: () => {},
  removeToast: () => {},
});

const ToastProvider = ({ children }: Props) => {
  const [state, setState] = useMergeState<State>({
    activeToasts: [],
  });

  const fireToast = ({ message, type }: ToastInterface) => {
    setState({
      activeToasts: [
        ...state.activeToasts,
        { id: new Date().getTime().toString(), message, type },
      ],
    });
  };

  const removeToast = (toastId: string) => {
    const newToasts = state.activeToasts.filter(
      (toast) => toast.id !== toastId,
    );

    setState({ activeToasts: newToasts });
  };

  const value = {
    fireToast,
    removeToast,
  };

  return (
    <ToastContext.Provider value={value}>
      <>
        {children}
        <div className={style.toastWrapper}>
          <div className={style.toastContainer}>
            {state.activeToasts.map((toast) => {
              return <Toast key={toast.id} toast={toast} />;
            })}
          </div>
        </div>
      </>
    </ToastContext.Provider>
  );
};

export default ToastProvider;

export const useToast = () => useContext(ToastContext);
