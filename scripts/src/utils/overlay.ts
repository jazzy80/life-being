const OVERLAY_SELECTOR = '.overlay';


export function addOverlay(): void {
  const overlay: HTMLDivElement = document.querySelector(OVERLAY_SELECTOR)
    || document.createElement('div');
  overlay.classList.add('overlay');
  const body = document.body;
  body.style.overflowY = 'hidden';
  body.prepend(overlay);
}

export function removeOverlay(): void {
  const overlay = document.querySelector(OVERLAY_SELECTOR) as HTMLDivElement | null;
  // Check if overlay is already active.
  if (overlay) {
    // Remove it
    overlay.remove();
    // Reenable the scroll bar.
    document.body.style.overflowY = 'auto';
  }
}
