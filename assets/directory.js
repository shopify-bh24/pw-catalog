document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('wrestler-container');
  const items = Array.from(document.querySelectorAll('.wrestler-item'));
  const perPageSelect = document.getElementById('items-per-page');
  const sortSelect = document.getElementById('directory-sort');
  const abcLinks = document.querySelectorAll('.abc-link');
  const backToTop = document.getElementById('back-to-top');

  // Track state
  let currentFilter = 'ALL';

  function render(list, limit) {
    container.innerHTML = '';
    list.slice(0, limit).forEach(item => container.appendChild(item));
  }

  function getFilteredItems() {
    if (currentFilter === 'ALL') return [...items];
    return items.filter(item => item.dataset.name.toUpperCase().startsWith(currentFilter));
  }

  function applyLogic() {
    let list = getFilteredItems();
    
    // Apply Sort
    const sortVal = sortSelect.value;
    if (sortVal === 'name') list.sort((a,b) => a.dataset.name.localeCompare(b.dataset.name));
    if (sortVal === 'count') list.sort((a,b) => b.dataset.count - a.dataset.count);
    
    // Apply Pagination
    const limit = parseInt(perPageSelect.value);
    render(list, limit);
  }

  perPageSelect.addEventListener('change', applyLogic);
  sortSelect.addEventListener('change', applyLogic);

  abcLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      abcLinks.forEach(l => l.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.dataset.letter;
      applyLogic();
    });
  });

  window.addEventListener('scroll', () => backToTop.style.display = window.scrollY > 300 ? 'block' : 'none');
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Initial render
  applyLogic();
});