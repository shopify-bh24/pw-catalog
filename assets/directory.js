document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById('wrestler-container');
  const loadingMsg = document.getElementById('loading-msg');
  
  // 1. Fetch ALL metaobjects from Shopify API
  async function fetchAllData() {
    const query = `query { metaobjects(type: "collection_mapping", first: 1000) { nodes { fields { key value } } } }`;
    const response = await fetch('/api/2026-01/graphql.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': 'YOUR_PUBLIC_STOREFRONT_TOKEN' },
      body: JSON.stringify({ query })
    });
    const { data } = await response.json();
    return data.metaobjects.nodes;
  }

  // 2. Build the list
  const rawNodes = await fetchAllData();
  loadingMsg.remove();
  
  rawNodes.forEach(node => {
    const colHandle = node.fields.find(f => f.key === 'wrestler_collection').value;
    const item = document.createElement('div');
    item.className = 'wrestler-item';
    item.dataset.name = colHandle; // Ensure this matches your data
    item.innerHTML = `<a href="/collections/${colHandle}"><h3>${colHandle}</h3></a>`;
    container.appendChild(item);
  });

  // 3. Initialize your existing filter/sort logic
  // [Insert all your existing filtering, sorting, and ABC logic functions here]
});