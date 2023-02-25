import { FC, ChangeEventHandler } from 'react';

interface InputProps {
  type: 'text' | 'number';
}

interface SelectProps {
  size?: 'small' | 'large';
  className?: string;
  placeholder?: string;
  menu?: Array<{
    label: string | number;
    value: string | number;
  }>;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
}

export const Input: FC<InputProps> = () => {
  return <div></div>;
};

export const Select: FC<SelectProps> = ({
  size,
  className,
  placeholder,
  menu,
  onChange,
  disabled,
}) => {
  let styled =
    'text-sm px-2 border disabled:bg-slate-50 border-sinc-500 rounded w-full';

  switch (size) {
    case 'small':
      break;
    case 'large':
      break;
    default:
      styled += ' py-1.5';
  }

  return (
    <select
      className={`${styled} ${className}`}
      disabled={disabled}
      onChange={onChange}
      defaultValue=""
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {menu?.map((v, i) => {
        return (
          <option key={i} value={v.value}>
            {v.label}
          </option>
        );
      })}
    </select>
  );
};
