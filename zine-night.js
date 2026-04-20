/* zine-night.js — drop-in night mode toggle for any zine page.
   Requires the matching body.night rules in zine.css.
   Usage: <script src="../zine-night.js"></script>  (add anywhere in <body>)

   Behavior:
   - Injects a ☀/🌙 button fixed top-right.
   - First visit: respects the OS prefers-color-scheme: dark.
   - Subsequent: remembers the last choice via localStorage('zine-night').
*/
(function () {
  var btn = document.createElement('button');
  btn.className = 'night-toggle';
  btn.id = 'zine-night-toggle';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'toggle night mode');

  function apply(night) {
    document.body.classList.toggle('night', night);
    btn.textContent = night ? '☀️' : '🌙';
    btn.title = night ? 'switch to day' : 'switch to night';
    try { localStorage.setItem('zine-night', night ? '1' : '0'); } catch (e) {}
  }

  var initial = false;
  try {
    var stored = localStorage.getItem('zine-night');
    if (stored !== null) initial = stored === '1';
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) initial = true;
  } catch (e) {}

  btn.addEventListener('click', function () {
    apply(!document.body.classList.contains('night'));
  });

  function mount() {
    document.body.appendChild(btn);
    apply(initial);
  }
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();
