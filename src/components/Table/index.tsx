import { Column, Rows } from './types.ts';
import style from './style.module.sass';
import classnames from 'classnames';

interface Props {
  columns: Column[];
  rows: Rows;
}

const Table = ({ columns, rows }: Props) => {
  const headerColumnClassname = classnames(style.column, style.header);

  return (
    <table className={style.table}>
      <thead>
        <tr className={style.rowWrapper}>
          {columns.map((column) => (
            <th key={column.id} className={headerColumnClassname}>
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.data.map((row) => {
          const rowId = row[rows.uniqueId] as string;

          return (
            <tr className={style.rowWrapper} key={rowId}>
              {Object.values(row).map((value, idx) => {
                const columnId = `${rowId}-${columns[idx].id}`;

                return (
                  <td key={columnId} className={style.column}>
                    {value}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
