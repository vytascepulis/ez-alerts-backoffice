import style from './style.module.sass';
import Button from '../../components/Button';
import useFetch from '../../hooks/useFetch.ts';
import InputField from '../../components/InputField';
import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

const HelperButtons = () => {
  const refShopDomainInput = useRef<HTMLInputElement | null>(null);

  const {
    loading: purgeLoading,
    error: purgeError,
    fetchData: purge,
  } = useFetch({
    endpoint: 'purge',
    method: 'POST',
  });

  const {
    loading: registerLoading,
    error: registerError,
    fetchData: register,
  } = useFetch({
    endpoint: `register`,
    method: 'POST',
  });

  const handlePurge = () => {
    purge().then((res) => console.log(res));
  };

  const handleAddNew = () => {
    if (refShopDomainInput.current) {
      const value = refShopDomainInput.current.value;

      if (!value) return;

      register({
        shopDomain: refShopDomainInput.current.value,
        uuid: uuidv4(),
      }).then((res) => console.log(res));

      refShopDomainInput.current.value = '';
    }
  };

  if (purgeError || registerError) return purgeError || registerError;

  return (
    <div className={style.helperButtons}>
      <Button onClick={handlePurge} disabled={purgeLoading}>
        Purge
      </Button>
      <InputField ref={refShopDomainInput} noMargin placeholder="Shop domain" />
      <Button onClick={handleAddNew} disabled={registerLoading}>
        Add new
      </Button>
    </div>
  );
};

export default HelperButtons;
