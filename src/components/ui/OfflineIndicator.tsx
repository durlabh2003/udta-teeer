import React, { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div
      role="status"
      className="fixed bottom-16 md:bottom-4 left-4 z-50 flex items-center gap-2 brutal-border brutal-shadow-sm bg-[var(--color-marigold)] text-[var(--text-on-marigold)] px-3.5 py-2 rounded-[8px] text-xs font-bold"
    >
      <WifiOff className="w-4 h-4 stroke-[2.5]" />
      <span>Offline Mode — Cached pages active</span>
    </div>
  );
}
