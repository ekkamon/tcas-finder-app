import { FC } from 'react';

interface Props {
  color?: 'danger' | 'success';
  icon?: React.ReactNode;
  html?: any;
  className?: string;
}

export const Badge: FC<Props> = ({ color, icon, html, className }) => {
  let style = '';

  switch (color) {
    case 'danger':
      style += ' text-red-700 bg-red-700';
      break;
    case 'success':
      style += ' text-green-700 bg-green-700';
      break;
  }

  return (
    <div
      className={`bg-opacity-10 p-5 font-bold rounded ${style} ${className}`}
    >
      <div className="flex items-center justify-center gap-2">
        {icon}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
};
