import style from './style.module.sass';
import Button from '../../components/Button';
import useFetch from '../../hooks/useFetch.ts';
import InputField from '../../components/InputField';
import { useRef } from 'react';
import { useToast } from '../../contexts/ToastProvider';

const HelperButtons = () => {
  const { fireToast } = useToast();

  const refShopDomainInput = useRef<HTMLInputElement | null>(null);

  const [purge, purgeData] = useFetch<{ message: string }>();
  const [register, registerData] = useFetch<{ message: string }>();

  const handlePurge = () => {
    purge({
      endpoint: 'purge',
      method: 'POST',
      error: (e) => fireToast({ message: e.message, type: 'error' }),
      update: (data) => fireToast({ message: data.message, type: 'success' }),
    });
  };

  const handleAddNew = () => {
    if (refShopDomainInput.current) {
      const value = refShopDomainInput.current.value;

      if (!value) return;

      register({
        endpoint: `register`,
        method: 'POST',
        variables: {
          shopDomain: refShopDomainInput.current.value,
        },
        error: (e) => fireToast({ message: e.message, type: 'error' }),
        update: (data) => fireToast({ message: data.message, type: 'success' }),
      });

      refShopDomainInput.current.value = '';
    }
  };

  return (
    <div className={style.helperButtons}>
      <Button onClick={handlePurge} disabled={purgeData.loading}>
        Purge
      </Button>
      <InputField ref={refShopDomainInput} noMargin placeholder="Shop domain" />
      <Button onClick={handleAddNew} disabled={registerData.loading}>
        Add new
      </Button>
    </div>
  );
};

export default HelperButtons;
