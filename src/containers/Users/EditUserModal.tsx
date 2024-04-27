import { RefValues, User } from './types.ts';
import InputField from '../../components/InputField';
import style from './style.module.sass';
import Button from '../../components/Button';
import { useRef } from 'react';
import Select from '../../components/Select';
import { animations } from '../../constants.ts';
import useFetch from '../../hooks/useFetch.ts';
import { buildUpdateSettingsBody } from './utils.ts';
import withModalWrapper, {
  ModalWrapperProps,
} from '../../components/ModalWrapper';

interface Props extends ModalWrapperProps {
  user?: User;
}

const EditUserModal = ({ user }: Props) => {
  const refValues = useRef<RefValues>({
    animationIn: user?.settings.display.animationIn,
    animationOut: user?.settings.display.animationOut,
    duration: user?.settings.display.duration,
    useProductImages: user?.settings.useProductImages,
    image: user?.settings.image.base64,
    textContent: user?.settings.text.content,
    textSpecialColor: user?.settings.text.specialColor,
    audio: user?.settings.audio.base64,
    volume: user?.settings.audio.volume,
  });

  const {
    loading: updateSettingsLoading,
    error: updateSettingsError,
    fetchData: updateSettings,
  } = useFetch({
    endpoint: `settings/${user?.uuid}`,
    method: 'PUT',
  });

  const {
    loading: deleteUserLoading,
    error: deleteUserError,
    fetchData: deleteUser,
  } = useFetch({
    endpoint: `users/${user?.uuid}`,
    method: 'DELETE',
  });

  const {
    loading: fireAlertLoading,
    error: fireAlertError,
    fetchData: fireAlert,
  } = useFetch({
    endpoint: `test-alert/${user?.uuid}`,
    method: 'POST',
  });

  const {
    loading: blockUserLoading,
    error: blockUserError,
    fetchData: blockUser,
  } = useFetch({
    endpoint: `users/${user?.uuid}/block`,
    method: 'POST',
  });

  const toggleBlock = () => {
    blockUser({ isBlocked: !user?.isBlocked }).then((res) => console.log(res));
  };

  const handleSave = () => {
    updateSettings(buildUpdateSettingsBody(refValues.current, user)).then(
      (res) => console.log(res),
    );
  };

  const handleDelete = () => {
    deleteUser().then((res) => console.log(res));
  };

  const handleFireAlert = () => {
    fireAlert().then((res) => console.log(res));
  };

  const handleOnChange = (field: string, value: string | number | boolean) => {
    refValues.current = {
      ...refValues.current,
      [field]: value,
    };
  };

  const animationsIn = animations.map((animation) => animation[0]);
  const animationsOut = animations.map((animation) => animation[1]);

  if (
    updateSettingsError ||
    deleteUserError ||
    fireAlertError ||
    blockUserError
  )
    return (
      updateSettingsError || deleteUserError || fireAlertError || blockUserError
    );

  if (!user) return null;

  return (
    <div className={style.editUserWrapper}>
      <div className={style.topSection}>
        <div>
          <InputField
            id="uuid"
            label="Uuid"
            defaultValue={user.uuid}
            disabled
          />
          <InputField
            id="registeredAt"
            label="Registered At"
            defaultValue={user.registeredAt}
            disabled
          />
          <InputField
            id="isBlocked"
            label="Is blocked"
            defaultValue={user.isBlocked.toString()}
            disabled
          />
        </div>
        <div className={style.buttonsWrapper}>
          <Button disabled={blockUserLoading} onClick={toggleBlock}>
            {user.isBlocked ? 'Unblock' : 'Block'}
          </Button>
          <Button disabled={updateSettingsLoading} onClick={handleSave}>
            Save
          </Button>
          <Button disabled={deleteUserLoading} onClick={handleDelete}>
            Delete
          </Button>
          <Button disabled={fireAlertLoading} onClick={handleFireAlert}>
            Fire test alert
          </Button>
        </div>
      </div>
      <hr />
      <div className={style.mainSection}>
        <div>
          <Select
            id="animationIn"
            label="Animation in"
            onChange={(e) => handleOnChange('animationIn', e.target.value)}
            defaultValue={user.settings.display.animationIn}
            options={animationsIn.map((item) => ({
              title: item,
              value: item,
            }))}
          />
          <Select
            id="animationOut"
            label="Animation out"
            onChange={(e) => handleOnChange('animationOut', e.target.value)}
            defaultValue={user.settings.display.animationOut}
            options={animationsOut.map((item) => ({
              title: item,
              value: item,
            }))}
          />
          <InputField
            id="duration"
            label="Duration"
            defaultValue={user.settings.display.duration}
            onChange={(e) => handleOnChange('duration', +e.target.value)}
            type="number"
          />
          <InputField
            id="useProductImages"
            label="Use product images"
            type="checkbox"
            defaultChecked={user.settings.useProductImages}
            onChange={(e) =>
              handleOnChange('useProductImages', e.target.checked)
            }
          />
          <InputField
            id="image"
            label="Image base64"
            defaultValue={user.settings.image.base64}
            onChange={(e) => handleOnChange('image', e.target.value)}
          />
        </div>
        <img
          className={style.alertImage}
          alt="img"
          src={user.settings.image.base64}
        />
        <div>
          <InputField
            id="content"
            label="Text content"
            defaultValue={user.settings.text.content}
            onChange={(e) => handleOnChange('textContent', e.target.value)}
          />
          <InputField
            id="specialColor"
            label="Special color"
            defaultValue={user.settings.text.specialColor}
            onChange={(e) => handleOnChange('textSpecialColor', e.target.value)}
          />
          <hr />
          <InputField
            id="audio"
            label="Audio base64"
            defaultValue={user.settings.audio.base64}
            onChange={(e) => handleOnChange('audio', e.target.value)}
          />
          <InputField
            id="volume"
            label="Volume"
            defaultValue={user.settings.audio.volume}
            onChange={(e) => handleOnChange('volume', +e.target.value)}
            min={0}
            max={100}
            type="number"
          />
          <audio controls>
            <source src={user.settings.audio.base64} type="audio/mpeg" />
          </audio>
        </div>
      </div>
    </div>
  );
};

export default withModalWrapper(EditUserModal);
