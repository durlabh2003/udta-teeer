import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

export function PWAInstallButton() {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        aria-label="Install Urdta Teeeeeer Studio App"
        className="min-h-[44px] inline-flex items-center gap-2 px-3.5 py-2 brutal-border bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-[6px] text-xs font-bold cursor-pointer hover:bg-[var(--color-marigold)] hover:text-[var(--text-on-marigold)] transition-colors"
      >
        <Download className="w-3.5 h-3.5 stroke-[2.5]" />
        <span>Install Studio App</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          aria-label="Install Urdta Teeeeeer on iOS Safari"
          className="min-h-[44px] inline-flex items-center gap-2 px-3.5 py-2 brutal-border bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-[6px] text-xs font-bold cursor-pointer hover:bg-[var(--color-marigold)] hover:text-[var(--text-on-marigold)] transition-colors"
        >
          <Download className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Add to Home Screen</span>
        </button>

        {showIOSGuide && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Install on iPhone or iPad"
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[var(--color-indigo)]/75 p-4"
            onClick={() => setShowIOSGuide(false)}
          >
            <div
              className="w-full max-w-sm brutal-border brutal-shadow bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-[10px] p-6 space-y-3"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="type-h3">Install Urdta Teeeeeer on iOS</h2>
              <p className="type-small leading-relaxed">
                1. Tap the <strong>Share</strong> icon in Safari&apos;s toolbar.
                <br />
                2. Scroll down and select <strong>Add to Home Screen</strong>.
              </p>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="w-full min-h-[44px] py-2 brutal-border bg-[var(--color-marigold)] text-[var(--text-on-marigold)] rounded-[6px] text-sm font-bold cursor-pointer"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
}
