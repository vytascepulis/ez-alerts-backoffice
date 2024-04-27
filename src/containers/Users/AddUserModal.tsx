import withModalWrapper, { ModalWrapperProps } from 'components/ModalWrapper';

interface Props extends ModalWrapperProps {}

const AddUserModal = ({}: Props) => {
  return <div>add new user</div>;
};

export default withModalWrapper(AddUserModal);
