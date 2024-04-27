import style from './style.module.sass';
import { ReactNode, useRef } from 'react';
import useClickOutside from '../../hooks/useOutsideClick.ts';
import { ModalWrapperProps } from '../ModalWrapper';

interface Props extends ModalWrapperProps {
  children: ReactNode;
}

const Modal = ({ isOpen, close, title, children }: Props) => {
  const refModalContentDiv = useRef<HTMLDivElement | null>(null);
  useClickOutside(refModalContentDiv, close);

  if (!isOpen) return;

  return (
    <div className={style.modalOverlay}>
      <div ref={refModalContentDiv} className={style.modalContent}>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
