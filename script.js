const PRODUCTS = [
  { id: 1, name: 'Ridgeline 2P Tent', cat: 'camp', price: 189.00 },
  { id: 2, name: 'Ember Camp Stove', cat: 'camp', price: 64.50 },
  { id: 3, name: 'Switchback Boots', cat: 'hike', price: 129.99 },
  { id: 4, name: 'Trek Poles (Pair)', cat: 'hike', price: 54.00 },
  { id: 5, name: 'Flow Filter Bottle', cat: 'water', price: 34.95 },
  { id: 6, name: 'Dry Bag 20L', cat: 'water', price: 28.00 },
];
const grid = document.getElementById('grid');
const cart = new Map();

function renderProducts(filter = 'all') {
  grid.innerHTML = '';
  PRODUCTS.filter(p => filter === 'all' || p.cat === filter).forEach(p => {
    const el = document.createElement('article');
    el.className = 'product';
    el.innerHTML = `<h3>${p.name}</h3><p class="price">$${p.price.toFixed(2)}</p>`;
    const btn = document.createElement('button');
    btn.textContent = 'Add to cart';
    btn.addEventListener('click', () => addToCart(p.id));
    el.appendChild(btn);
    grid.appendChild(el);
  });
}
function addToCart(id) {
  cart.set(id, (cart.get(id) || 0) + 1);
  renderCart();
}
function renderCart() {
  const items = document.getElementById('cart-items');
  items.innerHTML = '';
  let count = 0, total = 0;
  cart.forEach((qty, id) => {
    const p = PRODUCTS.find(x => x.id === id);
    count += qty; total += qty * p.price;
    const li = document.createElement('li');
    li.textContent = `${p.name} × ${qty} — $${(qty * p.price).toFixed(2)}`;
    items.appendChild(li);
  });
  document.getElementById('cart-count').textContent = count;
  document.getElementById('cart-total').textContent = total.toFixed(2);
}
document.querySelectorAll('.filters button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(btn.dataset.filter);
  });
});
renderProducts();
