import Table from 'components/Table';
import { Rows } from 'components/Table/types.ts';
import Modal from 'components/Modal';
import useMergeState from '../../hooks/useMergeState.ts';
import useFetch from '../../hooks/useFetch.ts';
import { User } from './types.ts';
import EditUser from './EditUser.tsx';
import Button from '../../components/Button';
import { useEffect } from 'react';

const columns = [
  { id: 'shopDomain', title: 'Shop Domain' },
  { id: 'uuid', title: 'Uuid' },
  { id: 'registeredAt', title: 'Registered At' },
  { id: 'isBlocked', title: 'Blocked' },
  { id: 'edit' },
];

interface State {
  openUser?: User;
}

const Users = () => {
  const [state, setState] = useMergeState<State>({
    openUser: undefined,
  });

  const { error, data, loading, fetchData } = useFetch<User[]>({
    endpoint: 'users',
  });

  useEffect(() => {
    fetchData();
  }, []);

  if (error) return error;
  if (loading || !data) return 'Loading...';

  const onEditClick = (user: User) => () => {
    setState({ openUser: user });
  };

  const rows: Rows = {
    uniqueId: 'uuid',
    data: data.map((user) => ({
      shopDomain: user.shopDomain,
      uuid: user.uuid,
      registeredAt: user.registeredAt,
      isBlocked: (
        <input type="checkbox" disabled checked={user.isBlocked}></input>
      ),
      edit: <Button onClick={onEditClick(user)}>Edit</Button>,
    })),
  };

  return (
    <>
      <Table rows={rows} columns={columns} />
      <Modal
        isOpen={Boolean(state.openUser)}
        title={state.openUser?.shopDomain || ''}
        close={() => setState({ openUser: undefined })}
      >
        <EditUser user={state.openUser} />
      </Modal>
    </>
  );
};

export default Users;
