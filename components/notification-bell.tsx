"use client"

/*
 * NotificationBell — Shell notification button for the Navbar
 * Currently shows a static bell icon (real notifications in Phase 8 with Supabase Realtime)
 */
import { useState } from "react"
import { Bell } from "lucide-react"
import NotificationDropdown, { type NotificationItem } from "@/components/notification-dropdown"

// Placeholder notifications — replace with Supabase Realtime subscription in Phase 8
const PLACEHOLDER_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    title: "Welcome to RCT Labs",
    message: "Explore our AI Operating System protocols and start building.",
    time: "Just now",
    read: false,
  },
]

export function NotificationBell() {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState(PLACEHOLDER_NOTIFICATIONS)
  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative flex h-11 w-11 items-center justify-center rounded-full text-foreground/70 hover:bg-accent hover:text-foreground transition-colors"
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
        aria-expanded={open}
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
        )}
      </button>

      {open && (
        <NotificationDropdown
          notifications={notifications}
          unreadCount={unreadCount}
          onClose={() => setOpen(false)}
          onMarkAllRead={markAllRead}
        />
      )}
    </div>
  )
}

export default NotificationBell
