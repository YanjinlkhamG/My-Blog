// Persist and apply theme preference
(function () {
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  btn.addEventListener('click', function () {
    const next = getTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
});
