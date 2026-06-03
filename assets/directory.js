document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('wrestler-container');
  // This will now capture all 800+ items because the Liquid loop is no longer truncated
  const items = Array.from(document.querySelectorAll('.wrestler-item'));
  const perPageSelect = document.getElementById('items-per-page');
  const sortSelect = document.getElementById('directory-sort');
  const abcLinks = document.querySelectorAll('.abc-link');
  const backToTop = document.getElementById('back-to-top');

  let currentFilter = 'ALL';

  function render(list, limit) {
    container.innerHTML = '';
    list.slice(0, limit).forEach(item => container.appendChild(item));
  }

  function applyLogic() {
    let filtered = currentFilter === 'ALL' 
      ? [...items] 
      : items.filter(i => i.dataset.name.toUpperCase().startsWith(currentFilter));
    
    // Sort
    if (sortSelect.value === 'name') filtered.sort((a,b) => a.dataset.name.localeCompare(b.dataset.name));
    if (sortSelect.value === 'count') filtered.sort((a,b) => b.dataset.count - a.dataset.count);
    
    render(filtered, parseInt(perPageSelect.value) || 9999);
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

  applyLogic();
});