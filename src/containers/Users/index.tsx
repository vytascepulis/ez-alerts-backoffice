import Table from 'components/Table';
import users from 'users.json';
import { Rows } from '../../components/Table/types.ts';

const columns = [
  { id: 'shopDomain', title: 'Shop Domain' },
  { id: 'uuid', title: 'Uuid' },
  { id: 'registeredAt', title: 'Registered At' },
  { id: 'isBlocked', title: 'Blocked' },
  { id: 'edit' },
];

const Users = () => {
  const rows: Rows = {
    uniqueId: 'uuid',
    data: users.map((user) => ({
      shopDomain: user.shopDomain,
      uuid: user.uuid,
      registeredAt: user.registeredAt.$date.$numberLong,
      isBlocked: (
        <input type="checkbox" disabled checked={user.isBlocked}></input>
      ),
      edit: (
        <button onClick={() => console.log('click: ', user.uuid)}>
          button
        </button>
      ),
    })),
  };

  return (
    <>
      <Table rows={rows} columns={columns} />
    </>
  );
};

export default Users;
