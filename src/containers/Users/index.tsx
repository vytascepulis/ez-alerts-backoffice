import Table from 'components/Table';
import { Rows } from 'components/Table/types.ts';
import useMergeState from '../../hooks/useMergeState.ts';
import useFetch from '../../hooks/useFetch.ts';
import { User } from './types.ts';
import Button from '../../components/Button';
import { useEffect } from 'react';
import HelperButtons from './HelperButtons.tsx';
import EditUserModal from './EditUserModal.tsx';
import classNames from 'classnames';
import style from './style.module.sass';

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
      shopDomain: (
        <p className={style.field}>
          <span
            className={classNames(style.onlineIndicator, {
              [style.isActive]: user.isActive,
            })}
          />
          {user.shopDomain}
        </p>
      ),
      uuid: user.uuid,
      registeredAt: user.registeredAt,
      isBlocked: (
        <input type="checkbox" disabled checked={user.isBlocked}></input>
      ),
      edit: <Button onClick={onEditClick(user)}>Edit</Button>,
    })),
  };

  return (
    <div>
      <HelperButtons />
      <Table rows={rows} columns={columns} />
      <EditUserModal
        isOpen={Boolean(state.openUser)}
        title={state.openUser?.shopDomain || ''}
        close={() => setState({ openUser: undefined })}
        user={state.openUser}
      />
    </div>
  );
};

export default Users;
