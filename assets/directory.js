document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(document.getElementById('wrestler-data').textContent);
  const container = document.getElementById('wrestler-container');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const pageInfo = document.getElementById('page-info');

  let currentPage = 1;
  const itemsPerPage = 50;

  function render() {
    const start = (currentPage - 1) * itemsPerPage;
    const paginatedItems = data.slice(start, start + itemsPerPage);
    
    container.innerHTML = paginatedItems.map(item => `
      <div class="wrestler-item">
        <a href="${item.url}"><h3>${item.title} (${item.count} items)</h3></a>
      </div>
    `).join('');

    pageInfo.innerText = `Page ${currentPage} of ${Math.ceil(data.length / itemsPerPage)}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage >= Math.ceil(data.length / itemsPerPage);
  }

  prevBtn.addEventListener('click', () => { currentPage--; render(); });
  nextBtn.addEventListener('click', () => { currentPage++; render(); });

  render();
});