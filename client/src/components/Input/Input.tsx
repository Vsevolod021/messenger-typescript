import { JSX } from 'react';

type IProps = {
  className?: string;
  error?: boolean;
  errorMessage?: string;
} & JSX.IntrinsicElements['input'];

import './input.sass';

const Input = ({ className = '', error = false, errorMessage = '', ...rest }: IProps) => {
  return (
    <div className={`input ${className}`}>
      <input className="input__input" data-error={error} {...rest} />

      <p className="input__error">{errorMessage}</p>
    </div>
  );
};

export default Input;
