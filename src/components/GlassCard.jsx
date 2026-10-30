import './GlassCard.css'

function GlassCard({ children, className = '', variant = 'default', ...props }) {
  return (
    <div className={`glass-card glass-card--${variant} ${className}`} {...props}>
      {children}
    </div>
  )
}

export default GlassCard

