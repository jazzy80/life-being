"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeOverlay = exports.addOverlay = void 0;
var OVERLAY_SELECTOR = '.overlay';
function addOverlay() {
    var overlay = document.querySelector(OVERLAY_SELECTOR)
        || document.createElement('div');
    overlay.classList.add('overlay');
    var body = document.body;
    body.style.overflowY = 'hidden';
    body.prepend(overlay);
}
exports.addOverlay = addOverlay;
function removeOverlay() {
    var overlay = document.querySelector(OVERLAY_SELECTOR);
    // Check if overlay is already active.
    if (overlay) {
        // Remove it
        overlay.remove();
        // Reenable the scroll bar.
        document.body.style.overflowY = 'auto';
    }
}
exports.removeOverlay = removeOverlay;
