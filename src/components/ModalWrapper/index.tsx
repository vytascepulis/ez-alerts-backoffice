import Modal from '../Modal';

export interface ModalWrapperProps {
  isOpen: boolean;
  close: () => void;
  title: string;
}

export const withModalWrapper =
  <P extends ModalWrapperProps>(
    Component: React.ComponentType<P>,
  ): React.FC<P & ModalWrapperProps> =>
  (props: P) => {
    return (
      <Modal {...props}>
        <Component {...props} />
      </Modal>
    );
  };

export default withModalWrapper;
