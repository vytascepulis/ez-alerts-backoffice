import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import style from './style.module.sass';
import classNames from 'classnames';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  noMargin?: boolean;
}

const InputField = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      onChange,
      disabled,
      defaultValue,
      label,
      type,
      defaultChecked,
      min,
      max,
      placeholder,
      noMargin,
    },
    ref,
  ) => {
    return (
      <div
        className={classNames(style.inputWrapper, {
          [style.disabled]: disabled,
          [style.noMargin]: noMargin,
        })}
      >
        {label && <label htmlFor={id}>{label}</label>}
        <input
          ref={ref}
          id={id}
          type={type}
          defaultChecked={defaultChecked}
          onChange={onChange}
          disabled={disabled}
          defaultValue={defaultValue}
          min={min}
          max={max}
          placeholder={placeholder}
        />
      </div>
    );
  },
);

export default InputField;
