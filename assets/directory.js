document.addEventListener("DOMContentLoaded", () => {
  // 1. Get all required elements
  const dataElement = document.getElementById('wrestler-data');
  const container = document.getElementById('wrestler-container');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const pageInfo = document.getElementById('page-info');

  // 2. ONLY proceed if all elements exist on the current page
  if (dataElement && container && prevBtn && nextBtn && pageInfo) {
    
    const data = JSON.parse(dataElement.textContent);
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
    
  } else {
    // Optional: Log a message to console if you need to debug why it didn't run
    console.log("Wrestler directory elements not found on this page. Script skipped.");
  }
});