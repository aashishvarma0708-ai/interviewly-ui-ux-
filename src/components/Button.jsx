import './Button.css'

function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  type = 'button',
  disabled = false,
  onClick,
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`btn btn--${variant} btn--${size} ${fullWidth ? 'btn--full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

