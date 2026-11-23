/* Dan Pearce portfolio header: opens and closes the menu on narrow screens. No globals, no dependencies. */
(function () {
  var bar = document.getElementById('dp-bar');
  if (!bar) return;
  var toggle = bar.querySelector('.dp-bar__toggle');
  if (!toggle) return;
  function set(open) {
    bar.classList.toggle('dp-bar--open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  toggle.addEventListener('click', function () { set(!bar.classList.contains('dp-bar--open')); });
  document.addEventListener('click', function (e) { if (!bar.contains(e.target)) set(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
})();
