(() => {
  const query = new URLSearchParams(location.search);
  let theme = query.get('theme');
  try { theme ||= localStorage.getItem('portfolio-theme'); } catch {}
  theme ||= matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.embed = query.get('embed') === '1' ? 'true' : 'false';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#101827' : '#f8f9fb');
  function reportSize() {
    if (window.parent !== window) window.parent.postMessage({type:'portfolio-lab-size',height:Math.ceil(document.body.getBoundingClientRect().height)+8}, location.origin);
  }
  if (window.parent !== window) {
    new ResizeObserver(reportSize).observe(document.body);
    window.addEventListener('load', reportSize);
    requestAnimationFrame(reportSize);
  }
})();
