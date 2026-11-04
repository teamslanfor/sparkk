/* Noir Glitz template extras: cursor-following image preview for service rows (desktop only). */
(function () {
  'use strict';
  const preview = document.querySelector('.hover-preview');
  const rows = document.querySelectorAll('[data-preview]');
  if (!preview || !rows.length || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  let img = null;
  let x = 0, y = 0, cx = 0, cy = 0, raf = null;
  const loop = () => { cx += (x - cx) * 0.18; cy += (y - cy) * 0.18; preview.style.left = cx + 'px'; preview.style.top = cy + 'px'; raf = requestAnimationFrame(loop); };
  rows.forEach((row) => {
    row.addEventListener('mouseenter', (e) => {
      if (!img) { img = document.createElement('img'); img.alt = ''; preview.appendChild(img); }
      img.src = row.dataset.preview; x = cx = e.clientX; y = cy = e.clientY;
      preview.classList.add('show'); if (!raf) loop();
    });
    row.addEventListener('mousemove', (e) => { x = e.clientX; y = e.clientY; });
    row.addEventListener('mouseleave', () => { preview.classList.remove('show'); cancelAnimationFrame(raf); raf = null; });
  });
})();
