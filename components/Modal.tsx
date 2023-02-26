import { FC, useState } from 'react';

interface Props {
  isOpen: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Modal: FC<Props> = ({ isOpen, className, children }) => {
  if (isOpen) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 h-modal bg-black bg-opacity-50 h-full overflow-x-hidden overflow-y-auto">
        <div
          className={`relative m-auto w-full max-full max-w-2xl ${className}`}
        >
          {children}
        </div>
      </div>
    );
  }

  return <></>;
};
