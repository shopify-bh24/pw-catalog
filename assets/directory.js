document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('wrestler-container');
  const items = Array.from(document.querySelectorAll('.wrestler-item'));
  const perPageSelect = document.getElementById('items-per-page');
  const sortSelect = document.getElementById('directory-sort');
  const abcLinks = document.querySelectorAll('.abc-link');
  const backToTop = document.getElementById('back-to-top');

  function render(list, limit) {
    container.innerHTML = '';
    list.slice(0, limit).forEach(item => container.appendChild(item));
  }

  perPageSelect.addEventListener('change', (e) => render(items, parseInt(e.target.value)));

  sortSelect.addEventListener('change', (e) => {
    let sorted = [...items];
    if (e.target.value === 'name') sorted.sort((a,b) => a.dataset.name.localeCompare(b.dataset.name));
    if (e.target.value === 'count') sorted.sort((a,b) => b.dataset.count - a.dataset.count);
    render(sorted, parseInt(perPageSelect.value));
  });

  abcLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      abcLinks.forEach(l => l.classList.remove('active'));
      e.target.classList.add('active');
      const filtered = items.filter(item => item.dataset.name.toUpperCase().startsWith(e.target.dataset.letter));
      render(filtered, 2500); 
    });
  });

  window.addEventListener('scroll', () => backToTop.style.display = window.scrollY > 300 ? 'block' : 'none');
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  render(items, 20); 
});