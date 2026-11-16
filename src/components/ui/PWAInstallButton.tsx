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
        className="inline-flex items-center gap-2 px-3.5 py-2 brutal-border bg-[#FFF9F0] text-[#111111] rounded-[6px] text-xs font-bold cursor-pointer hover:bg-[#FFC21A] transition-colors"
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
          className="inline-flex items-center gap-2 px-3.5 py-2 brutal-border bg-[#FFF9F0] text-[#111111] rounded-[6px] text-xs font-bold cursor-pointer hover:bg-[#FFC21A] transition-colors"
        >
          <Download className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Add to Home Screen</span>
        </button>

        {showIOSGuide && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Install on iPhone or iPad"
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[#111111]/75 p-4"
            onClick={() => setShowIOSGuide(false)}
          >
            <div
              className="w-full max-w-sm brutal-border brutal-shadow bg-[#FFF9F0] dark:bg-[#212E46] text-[#111111] dark:text-[#FFF9F0] rounded-[6px] p-6 space-y-3"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-extrabold">Install Urdta Teeeeeer on iOS</h2>
              <p className="text-sm leading-relaxed">
                1. Tap the <strong>Share</strong> icon in Safari&apos;s toolbar.
                <br />
                2. Scroll down and select <strong>Add to Home Screen</strong>.
              </p>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2 brutal-border bg-[#FFC21A] text-[#111111] rounded-[4px] text-sm font-bold cursor-pointer"
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
