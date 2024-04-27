import { InputHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import style from './style.module.sass';

interface Option {
  title: string;
  value: string;
}

interface Props extends InputHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  label?: ReactNode;
}

const Select = ({
  options,
  onChange,
  disabled,
  id,
  label,
  defaultValue,
}: Props) => {
  return (
    <div
      className={classNames(style.selectWrapper, {
        [style.disabled]: disabled,
      })}
    >
      {label && <label htmlFor={id}>{label}</label>}
      <select
        onChange={onChange}
        disabled={disabled}
        id={id}
        defaultValue={defaultValue}
      >
        {options.map((option) => (
          <option key={option.value}>{option.title}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
