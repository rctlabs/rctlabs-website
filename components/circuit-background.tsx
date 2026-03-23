"use client"

/*
 * CircuitBackground — Animated SVG circuit lines background
 * Adapted from manus-frontend-design; warm amber palette
 */
export default function CircuitBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="circuit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A853" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#D4A853" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#C4745B" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        {/* Horizontal lines */}
        <line x1="0" y1="20%" x2="30%" y2="20%" stroke="url(#circuit-grad)" strokeWidth="1" />
        <line x1="70%" y1="20%" x2="100%" y2="20%" stroke="url(#circuit-grad)" strokeWidth="1" />
        <line x1="0" y1="50%" x2="20%" y2="50%" stroke="url(#circuit-grad)" strokeWidth="1" />
        <line x1="80%" y1="50%" x2="100%" y2="50%" stroke="url(#circuit-grad)" strokeWidth="1" />
        <line x1="0" y1="80%" x2="25%" y2="80%" stroke="url(#circuit-grad)" strokeWidth="1" />
        <line x1="75%" y1="80%" x2="100%" y2="80%" stroke="url(#circuit-grad)" strokeWidth="1" />
        {/* Vertical lines */}
        <line x1="15%" y1="0" x2="15%" y2="25%" stroke="url(#circuit-grad)" strokeWidth="1" />
        <line x1="85%" y1="0" x2="85%" y2="30%" stroke="url(#circuit-grad)" strokeWidth="1" />
        <line x1="15%" y1="75%" x2="15%" y2="100%" stroke="url(#circuit-grad)" strokeWidth="1" />
        <line x1="85%" y1="70%" x2="85%" y2="100%" stroke="url(#circuit-grad)" strokeWidth="1" />
        {/* Pulse dots — amber */}
        <circle cx="15%" cy="20%" r="3" fill="#D4A853" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="85%" cy="20%" r="3" fill="#D4A853" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.8;0.2" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="15%" cy="80%" r="3" fill="#C4745B" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="85%" cy="50%" r="3" fill="#C4745B" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.8;0.2" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="50%" cy="50%" r="2" fill="#D4A853" opacity="0.3">
          <animate attributeName="opacity" values="0.1;0.6;0.1" dur="5s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  )
}
