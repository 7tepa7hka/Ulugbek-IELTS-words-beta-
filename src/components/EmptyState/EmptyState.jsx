import './EmptyState.css'

export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">
        <Icon size={26} strokeWidth={1.4} />
      </div>
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__desc">{description}</p>
      {action}
    </div>
  )
}
