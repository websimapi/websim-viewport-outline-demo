/* ...existing code... */
/* Ensure the outline continues to match the visual viewport on mobile (handles on-screen keyboard, dynamic UI).
   Uses the Visual Viewport API when available to update the outline's size/position.
*/
(function () {
  const outline = document.getElementById('viewport-outline');
  if (!outline) return;

  function updateFromVisualViewport(vv) {
    if (!vv) {
      // fallback: inset:0 already covers layout viewport
      outline.style.transform = '';
      outline.style.width = '';
      outline.style.height = '';
      outline.style.left = '';
      outline.style.top = '';
      return;
    }
    // Position and size to match visual viewport
    const left = vv.offsetLeft;
    const top = vv.offsetTop;
    const width = vv.width;
    const height = vv.height;

    outline.style.left = left + 'px';
    outline.style.top = top + 'px';
    outline.style.width = width + 'px';
    outline.style.height = height + 'px';
    outline.style.position = 'fixed';
    outline.style.inset = 'auto'; // disable inset so left/top/width/height take effect
  }

  if (window.visualViewport) {
    // initial
    updateFromVisualViewport(window.visualViewport);
    // update on resize/scroll/resize of visual viewport (e.g., keyboard)
    window.visualViewport.addEventListener('resize', () => updateFromVisualViewport(window.visualViewport));
    window.visualViewport.addEventListener('scroll', () => updateFromVisualViewport(window.visualViewport));
  } else {
    // no visualViewport API — keep CSS fixed inset:0 which already matches viewport
  }

  // Keep behaviour consistent on orientation change / window resize
  window.addEventListener('resize', () => {
    if (!window.visualViewport) {
      outline.style.inset = '0';
      outline.style.position = 'fixed';
      outline.style.left = '';
      outline.style.top = '';
      outline.style.width = '';
      outline.style.height = '';
    } else {
      updateFromVisualViewport(window.visualViewport);
    }
  });
})();
 /* ...existing code... */

