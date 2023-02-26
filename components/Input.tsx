import {
  FC,
  ChangeEventHandler,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from 'react';

interface InputProps {
  size?: 'small' | 'large';
  type: 'text' | 'number';
  value?: number | string | null;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  min?: any;
  max?: any;
  disabled?: boolean;
}

interface SelectProps {
  size?: 'small' | 'large';
  className?: string;
  value?: string;
  placeholder?: string;
  menu?: Array<{
    label: string | number;
    value: string | number;
  }>;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
}

export const Input: FC<InputProps> = ({
  size,
  type,
  value,
  placeholder,
  onChange,
  min,
  max,
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
    <input
      type={type}
      value={value || ''}
      className={styled}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      max={max}
      disabled={disabled}
    />
  );
};

export const Select: FC<SelectProps> = ({
  size,
  className,
  value,
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
      value={value}
    >
      {placeholder && <option value="">{placeholder}</option>}
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
