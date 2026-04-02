"use client"

import { Bell, X } from "lucide-react"

export interface NotificationItem {
  id: string
  title: string
  message: string
  time: string
  read: boolean
}

interface NotificationDropdownProps {
  notifications: NotificationItem[]
  unreadCount: number
  onClose: () => void
  onMarkAllRead: () => void
}

export default function NotificationDropdown({
  notifications,
  unreadCount,
  onClose,
  onMarkAllRead,
}: NotificationDropdownProps) {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute right-0 top-full mt-2 z-50 w-80 rounded-xl border border-border bg-popover shadow-lg">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <span className="text-sm font-semibold text-popover-foreground">Notifications</span>
          <div className="flex items-center gap-2">
            {unreadCount > 0 ? (
              <button
                onClick={onMarkAllRead}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Mark all read
              </button>
            ) : null}
            <button onClick={onClose} className="flex items-center justify-center min-h-9 min-w-9 rounded-lg p-1 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors" aria-label="Close notifications">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <Bell className="mb-2 h-8 w-8 opacity-30" />
              <p className="text-sm">No notifications</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex cursor-pointer gap-3 border-b border-border/50 px-4 py-3 transition-colors last:border-0 hover:bg-accent/30 ${
                  !notification.read ? "bg-primary/5" : ""
                }`}
              >
                <div
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                    notification.read ? "bg-transparent" : "bg-primary"
                  }`}
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-popover-foreground">{notification.title}</p>
                  <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{notification.message}</p>
                  <p className="mt-1 text-xs text-muted-foreground/60">{notification.time}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}
