import { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick: () => void;
}

const Button = ({ children, onClick, disabled }: Props) => {
  return (
    <button type="button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
