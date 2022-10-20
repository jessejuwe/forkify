import React from 'react';

type Props = { children: React.ReactNode; type?: any; onClick: () => void };

const Button = (props: Props) => {
  return (
    <button
      className="button-style"
      type={props.type || 'button'}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
