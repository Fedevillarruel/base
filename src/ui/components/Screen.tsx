import { ReactNode } from 'react'
import './Screen.css'

export function Screen({
  children,
  title,
  action,
}: {
  children: ReactNode
  title?: string
  action?: ReactNode
}) {
  return (
    <div className="screen">
      {title && (
        <header className="screen-header">
          <h1 className="screen-title">{title}</h1>
          {action && <div className="screen-action">{action}</div>}
        </header>
      )}
      <div className="screen-content">{children}</div>
    </div>
  )
}
