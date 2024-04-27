import style from './style.module.sass';
import Button from '../../components/Button';
import useFetch from '../../hooks/useFetch.ts';

interface Props {
  toggleAddNewModal: () => void;
}

const HelperButtons = ({ toggleAddNewModal }: Props) => {
  const {
    loading: purgeLoading,
    error: purgeError,
    fetchData: purge,
  } = useFetch({
    endpoint: 'purge',
    method: 'POST',
  });

  const handlePurge = () => {
    purge().then((res) => console.log(res));
  };

  if (purgeError) return purgeError;

  return (
    <div className={style.helperButtons}>
      <Button onClick={handlePurge} disabled={purgeLoading}>
        Purge
      </Button>
      <Button onClick={toggleAddNewModal}>Add new</Button>
    </div>
  );
};

export default HelperButtons;
