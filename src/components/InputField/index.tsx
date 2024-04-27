import { InputHTMLAttributes, ReactNode } from 'react';
import style from './style.module.sass';
import classNames from 'classnames';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
}

const InputField = ({
  id,
  onChange,
  disabled,
  defaultValue,
  label,
  type,
  defaultChecked,
  min,
  max,
}: Props) => {
  return (
    <div
      className={classNames(style.inputWrapper, { [style.disabled]: disabled })}
    >
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type}
        defaultChecked={defaultChecked}
        onChange={onChange}
        disabled={disabled}
        defaultValue={defaultValue}
        min={min}
        max={max}
      />
    </div>
  );
};

export default InputField;
