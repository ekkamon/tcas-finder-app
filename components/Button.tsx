import { FC } from 'react';

interface Props {
  color?: 'default' | 'primary' | 'danger' | 'success';
  className?: string;
  onClick?: any;
  children?: React.ReactNode;
}

export const Button: FC<Props> = ({ color, className, onClick, children }) => {
  let style = `py-1.5 px-3 rounded text-white ${className}`;

  switch (color) {
    case 'primary':
      style += ' bg-blue-700';
      break;
    case 'danger':
      style += ' bg-red-700';
      break;
    case 'success':
      style += ' bg-red-700';
      break;
    default:
      style += ' bg-zinc-600';
  }

  return (
    <button className={style} onClick={onClick}>
      {children}
    </button>
  );
};
