import { ActiveToast } from './types.ts';
import style from './style.module.sass';
import classNames from 'classnames';
import { TOAST_DISAPPEAR_DURATION, TOAST_DURATION } from './contants.ts';
import { useToast } from './index.tsx';
import useMergeState from '../../hooks/useMergeState.ts';
import useDelay from '../../hooks/useDelay.ts';

interface Props {
  toast: ActiveToast;
}

interface State {
  isDisappearing: boolean;
}

const Toast = ({ toast }: Props) => {
  const { removeToast } = useToast();

  const [state, setState] = useMergeState<State>({
    isDisappearing: false,
  });

  const toastClassname = classNames(style.toast, {
    [style.error]: toast.type === 'error',
    [style.warning]: toast.type === 'warning',
    [style.disappearing]: state.isDisappearing,
  });

  const setDisappear = () => {
    setState({ isDisappearing: true });
  };

  useDelay(setDisappear, TOAST_DURATION);
  useDelay(
    () => removeToast(toast.id),
    TOAST_DURATION + TOAST_DISAPPEAR_DURATION,
  );

  return <div className={toastClassname}>{toast.message}</div>;
};

export default Toast;
