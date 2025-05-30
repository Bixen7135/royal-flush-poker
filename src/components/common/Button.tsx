import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'fold' | 'call' | 'raise';

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-accent-500 hover:bg-accent-600 text-white',
  secondary: 'bg-gray-700 hover:bg-gray-600 text-white',
  ghost: 'hover:bg-gray-700 text-gray-300',
  fold: 'bg-red-500 hover:bg-red-600 text-white',
  call: 'bg-green-500 hover:bg-green-600 text-white',
  raise: 'bg-blue-500 hover:bg-blue-600 text-white'
};

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  glow?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  glow = false,
  onClick,
  disabled = false,
  type = 'button',
}) => {
  const baseClasses = `btn-${variant} ${glow ? 'glow-effect' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`;

  return (
    <button
      type={type}
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;