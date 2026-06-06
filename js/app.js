// ═══════════════════════════════════════════
//  CAFÉ MANAGEMENT — Main Application Logic
// ═══════════════════════════════════════════

// ── DATA STORE ──────────────────────────────
const store = {
  orders: [
    { id: 1042, table: 4, items: 'Cappuccino × 2, Croissant × 1', total: 620, status: 'served', time: '08:14 AM' },
    { id: 1043, table: 7, items: 'Flat White, Avocado Toast', total: 490, status: 'preparing', time: '08:22 AM' },
    { id: 1044, table: 2, items: 'Espresso × 3, Muffin × 2', total: 580, status: 'pending', time: '08:35 AM' },
    { id: 1045, table: 9, items: 'Latte, Chai Latte, Banana Bread', total: 670, status: 'served', time: '08:41 AM' },
    { id: 1046, table: 1, items: 'Cold Brew, Sandwich', total: 390, status: 'pending', time: '08:55 AM' },
    { id: 1047, table: 5, items: 'Americano, Cheesecake', total: 410, status: 'preparing', time: '09:02 AM' },
  ],

  menu: [
    { id: 1, name: 'Espresso', cat: 'Coffee', price: 120, emoji: '☕', available: true },
    { id: 2, name: 'Cappuccino', cat: 'Coffee', price: 180, emoji: '🍵', available: true },
    { id: 3, name: 'Flat White', cat: 'Coffee', price: 200, emoji: '☕', available: true },
    { id: 4, name: 'Cold Brew', cat: 'Coffee', price: 220, emoji: '🧊', available: true },
    { id: 5, name: 'Latte', cat: 'Coffee', price: 190, emoji: '🥛', available: true },
    { id: 6, name: 'Chai Latte', cat: 'Tea', price: 170, emoji: '🍵', available: true },
    { id: 7, name: 'Croissant', cat: 'Pastry', price: 160, emoji: '🥐', available: true },
    { id: 8, name: 'Avocado Toast', cat: 'Food', price: 280, emoji: '🥑', available: true },
    { id: 9, name: 'Banana Bread', cat: 'Pastry', price: 140, emoji: '🍌', available: false },
    { id: 10, name: 'Cheesecake', cat: 'Dessert', price: 250, emoji: '🍰', available: true },
    { id: 11, name: 'Muffin', cat: 'Pastry', price: 130, emoji: '🧁', available: true },
    { id: 12, name: 'Sandwich', cat: 'Food', price: 220, emoji: '🥪', available: true },
  ],

  staff: [
    { id: 1, name: 'Priya Sharma', role: 'Barista', shift: 'Morning', status: 'on-duty', since: '2022-03-15', phone: '+91 98765 43210' },
    { id: 2, name: 'Karan Mehta', role: 'Cashier', shift: 'Morning', status: 'on-duty', since: '2023-06-01', phone: '+91 87654 32109' },
    { id: 3, name: 'Divya Nair', role: 'Barista', shift: 'Evening', status: 'off-duty', since: '2021-11-20', phone: '+91 76543 21098' },
    { id: 4, name: 'Arjun Reddy', role: 'Manager', shift: 'Morning', status: 'on-duty', since: '2020-01-10', phone: '+91 65432 10987' },
    { id: 5, name: 'Sneha Iyer', role: 'Waitstaff', shift: 'Evening', status: 'off-duty', since: '2023-09-05', phone: '+91 54321 09876' },
    { id: 6, name: 'Rohan Das', role: 'Barista', shift: 'Morning', status: 'on-duty', since: '2022-07-18', phone: '+91 43210 98765' },
  ],

  inventory: [
    { id: 1, item: 'Coffee Beans', category: 'Raw', stock: 80, unit: 'kg', min: 20, cost: 450 },
    { id: 2, item: 'Full Cream Milk', category: 'Dairy', stock: 45, unit: 'L', min: 15, cost: 65 },
    { id: 3, item: 'Pastry Mix', category: 'Baking', stock: 18, unit: 'kg', min: 10, cost: 280 },
    { id: 4, item: 'Sugar', category: 'Raw', stock: 60, unit: 'kg', min: 10, cost: 45 },
    { id: 5, item: 'Chai Masala', category: 'Spices', stock: 8, unit: 'kg', min: 5, cost: 320 },
    { id: 6, item: 'Paper Cups', category: 'Supply', stock: 12, unit: 'packs', min: 5, cost: 120 },
    { id: 7, item: 'Oat Milk', category: 'Dairy', stock: 14, unit: 'L', min: 10, cost: 95 },
    { id: 8, item: 'Cream Cheese', category: 'Dairy', stock: 6, unit: 'kg', min: 3, cost: 380 },
  ],

  tables: Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    seats: [2, 4, 4, 6, 2, 4, 4, 2, 6, 4, 2, 4][i],
    status: ['occupied','free','reserved','occupied','free','occupied','free','free','occupied','reserved','free','occupied'][i],
  })),
};

// ── NAVIGATION ───────────────────────────────
function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.querySelector(`[data-page="${page}"]`)?.classList.add('active');
  document.querySelector('.page-title').textContent = pageTitles[page];
}

const pageTitles = {
  dashboard: 'Dashboard',
  orders: 'Orders',
  menu: 'Menu Management',
  tables: 'Table View',
  inventory: 'Inventory',
  staff: 'Staff',
  reports: 'Reports',
};

// ── RENDER HELPERS ───────────────────────────
function statusBadge(s) {
  const map = {
    pending:    ['badge-orange', 'Pending'],
    preparing:  ['badge-yellow', 'Preparing'],
    served:     ['badge-green',  'Served'],
    cancelled:  ['badge-red',    'Cancelled'],
    'on-duty':  ['badge-green',  'On Duty'],
    'off-duty': ['badge-red',    'Off Duty'],
    occupied:   ['badge-orange', 'Occupied'],
    free:       ['badge-green',  'Free'],
    reserved:   ['badge-blue',   'Reserved'],
  };
  const [cls, label] = map[s] || ['badge-yellow', s];
  return `<span class="badge ${cls}">${label}</span>`;
}

function rupee(n) { return '₹' + n.toLocaleString('en-IN'); }

// ── ORDERS ───────────────────────────────────
function renderOrders(filter = 'all') {
  const list = document.getElementById('orders-list');
  const items = filter === 'all' ? store.orders : store.orders.filter(o => o.status === filter);
  list.innerHTML = items.map(o => `
    <div class="order-card">
      <div class="order-number">#${o.id}</div>
      <div class="order-items">
        <strong>Table ${o.table}</strong>
        ${o.items}
      </div>
      <div>${statusBadge(o.status)}<div class="order-time" style="margin-top:5px">${o.time}</div></div>
      <div>
        <div class="order-total">${rupee(o.total)}</div>
        <div style="display:flex;gap:6px;margin-top:8px">
          <button class="btn btn-outline btn-sm" onclick="changeStatus(${o.id})">Update</button>
          <button class="btn btn-primary btn-sm" onclick="printReceipt(${o.id})">Print</button>
        </div>
      </div>
    </div>
  `).join('');
}

let orderFilter = 'all';
function setOrderFilter(f) {
  orderFilter = f;
  document.querySelectorAll('#orders-tabs .tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`[data-filter="${f}"]`)?.classList.add('active');
  renderOrders(f);
}

function changeStatus(id) {
  const cycle = ['pending', 'preparing', 'served'];
  const o = store.orders.find(x => x.id === id);
  const next = cycle[(cycle.indexOf(o.status) + 1) % cycle.length];
  o.status = next;
  renderOrders(orderFilter);
  renderDashboard();
}

function printReceipt(id) {
  const o = store.orders.find(x => x.id === id);
  alert(`🧾 Receipt for Order #${o.id}\nTable: ${o.table}\n${o.items}\nTotal: ${rupee(o.total)}`);
}

// ── MENU ─────────────────────────────────────
function renderMenu(filter = 'all') {
  const grid = document.getElementById('menu-grid');
  const items = filter === 'all' ? store.menu : store.menu.filter(m => m.cat === filter);
  grid.innerHTML = items.map(m => `
    <div class="menu-card">
      <div class="menu-card-img">${m.emoji}</div>
      <div class="menu-card-body">
        <div class="menu-card-name">${m.name}</div>
        <div class="menu-card-cat">${m.cat}</div>
        <div class="menu-card-footer">
          <span class="price">${rupee(m.price)}</span>
          <div style="display:flex;gap:6px;align-items:center">
            ${statusBadge(m.available ? 'free' : 'cancelled').replace('Free', 'Active').replace('Cancelled', 'Inactive')}
            <button class="btn btn-outline btn-sm" onclick="editMenuItem(${m.id})">✏️</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function editMenuItem(id) {
  const item = store.menu.find(m => m.id === id);
  document.getElementById('menu-modal-title').textContent = 'Edit Item: ' + item.name;
  document.getElementById('field-item-name').value = item.name;
  document.getElementById('field-item-price').value = item.price;
  document.getElementById('field-item-cat').value = item.cat;
  document.getElementById('field-item-emoji').value = item.emoji;
  document.getElementById('menu-modal').classList.add('open');
  document.getElementById('menu-modal').dataset.editId = id;
}

function saveMenuItem() {
  const id = parseInt(document.getElementById('menu-modal').dataset.editId);
  if (id) {
    const item = store.menu.find(m => m.id === id);
    item.name = document.getElementById('field-item-name').value;
    item.price = parseInt(document.getElementById('field-item-price').value);
    item.cat = document.getElementById('field-item-cat').value;
    item.emoji = document.getElementById('field-item-emoji').value;
  } else {
    store.menu.push({
      id: store.menu.length + 1,
      name: document.getElementById('field-item-name').value,
      price: parseInt(document.getElementById('field-item-price').value),
      cat: document.getElementById('field-item-cat').value,
      emoji: document.getElementById('field-item-emoji').value || '☕',
      available: true,
    });
  }
  closeModal('menu-modal');
  renderMenu();
}

function openAddMenuItem() {
  document.getElementById('menu-modal-title').textContent = 'Add New Item';
  document.getElementById('field-item-name').value = '';
  document.getElementById('field-item-price').value = '';
  document.getElementById('field-item-cat').value = 'Coffee';
  document.getElementById('field-item-emoji').value = '';
  document.getElementById('menu-modal').dataset.editId = '';
  document.getElementById('menu-modal').classList.add('open');
}

// ── TABLES ───────────────────────────────────
function renderTables() {
  const grid = document.getElementById('tables-grid');
  grid.innerHTML = store.tables.map(t => {
    const colors = { free: '#7A8C6E', occupied: '#C05B2C', reserved: '#3B82F6' };
    const bg = { free: 'rgba(122,140,110,0.08)', occupied: 'rgba(192,91,44,0.08)', reserved: 'rgba(59,130,246,0.08)' };
    return `
      <div onclick="tableAction(${t.id})" style="
        background:${bg[t.status]};
        border:2px solid ${colors[t.status]};
        border-radius:12px; padding:20px; cursor:pointer;
        transition:all 0.2s; text-align:center;
      " onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform='translateY(0)'">
        <div style="font-family:'Playfair Display',serif;font-size:28px;font-weight:900;color:${colors[t.status]}">T${t.id}</div>
        <div style="font-family:'DM Mono',monospace;font-size:10px;letter-spacing:0.15em;color:${colors[t.status]};margin:6px 0 2px;text-transform:uppercase">${t.status}</div>
        <div style="font-size:12px;color:#5C3D2E">👥 ${t.seats} seats</div>
      </div>
    `;
  }).join('');
}

function tableAction(id) {
  const t = store.tables.find(x => x.id === id);
  const cycle = ['free', 'occupied', 'reserved'];
  t.status = cycle[(cycle.indexOf(t.status) + 1) % cycle.length];
  renderTables();
  updateTableStats();
}

function updateTableStats() {
  const occ = store.tables.filter(t => t.status === 'occupied').length;
  const free = store.tables.filter(t => t.status === 'free').length;
  const res = store.tables.filter(t => t.status === 'reserved').length;
  document.getElementById('table-occ').textContent = occ;
  document.getElementById('table-free').textContent = free;
  document.getElementById('table-res').textContent = res;
}

// ── INVENTORY ────────────────────────────────
function renderInventory() {
  const tbody = document.getElementById('inventory-body');
  tbody.innerHTML = store.inventory.map(inv => {
    const pct = Math.min(100, Math.round((inv.stock / (inv.min * 4)) * 100));
    const cls = pct > 50 ? 'stock-high' : pct > 25 ? 'stock-mid' : 'stock-low';
    const lowWarn = inv.stock <= inv.min ? `<span class="badge badge-red" style="margin-left:6px">Low</span>` : '';
    return `
      <tr>
        <td><strong>${inv.item}</strong>${lowWarn}</td>
        <td><span class="badge badge-blue">${inv.category}</span></td>
        <td>${inv.stock} ${inv.unit}</td>
        <td>${inv.min} ${inv.unit}</td>
        <td>
          <div class="stock-bar-wrap">
            <div class="stock-bar-bg"><div class="stock-bar ${cls}" style="width:${pct}%"></div></div>
          </div>
        </td>
        <td>${rupee(inv.cost)}/${inv.unit}</td>
        <td>
          <button class="btn btn-outline btn-sm" onclick="restock(${inv.id})">+ Restock</button>
        </td>
      </tr>
    `;
  }).join('');
}

function restock(id) {
  const inv = store.inventory.find(i => i.id === id);
  const qty = prompt(`Restock "${inv.item}"\nCurrent: ${inv.stock} ${inv.unit}\nAdd quantity:`);
  if (qty && !isNaN(qty) && +qty > 0) {
    inv.stock += +qty;
    renderInventory();
  }
}

// ── STAFF ────────────────────────────────────
function renderStaff() {
  const tbody = document.getElementById('staff-body');
  tbody.innerHTML = store.staff.map(s => `
    <tr>
      <td>
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#D4A054,#C05B2C);display:flex;align-items:center;justify-content:center;color:white;font-family:'Playfair Display',serif;font-weight:700;font-size:14px;flex-shrink:0">
            ${s.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div style="font-weight:700">${s.name}</div>
            <div style="font-size:11px;color:#A07850;font-family:'DM Mono',monospace">${s.phone}</div>
          </div>
        </div>
      </td>
      <td>${s.role}</td>
      <td><span class="badge badge-blue">${s.shift}</span></td>
      <td>${statusBadge(s.status)}</td>
      <td style="font-family:'DM Mono',monospace;font-size:11px">${s.since}</td>
      <td>
        <button class="btn btn-outline btn-sm" onclick="toggleStaffStatus(${s.id})">Toggle</button>
      </td>
    </tr>
  `).join('');
}

function toggleStaffStatus(id) {
  const s = store.staff.find(x => x.id === id);
  s.status = s.status === 'on-duty' ? 'off-duty' : 'on-duty';
  renderStaff();
}

function openAddStaff() {
  document.getElementById('staff-modal').classList.add('open');
}

function saveStaff() {
  const name = document.getElementById('field-staff-name').value;
  const role = document.getElementById('field-staff-role').value;
  const shift = document.getElementById('field-staff-shift').value;
  const phone = document.getElementById('field-staff-phone').value;
  if (!name) return;
  store.staff.push({ id: store.staff.length + 1, name, role, shift, phone, status: 'off-duty', since: new Date().toISOString().slice(0, 10) });
  closeModal('staff-modal');
  renderStaff();
}

// ── DASHBOARD ────────────────────────────────
function renderDashboard() {
  const today = store.orders;
  const revenue = today.reduce((s, o) => s + o.total, 0);
  const served = today.filter(o => o.status === 'served').length;
  const pending = today.filter(o => o.status === 'pending').length;
  const occ = store.tables.filter(t => t.status === 'occupied').length;

  document.getElementById('stat-revenue').textContent = rupee(revenue);
  document.getElementById('stat-orders').textContent = today.length;
  document.getElementById('stat-tables').textContent = occ + '/' + store.tables.length;
  document.getElementById('stat-served').textContent = served;

  // Recent activity
  const act = document.getElementById('activity-feed');
  act.innerHTML = today.slice(-5).reverse().map(o => `
    <div class="activity-item">
      <div class="activity-dot"></div>
      <div class="activity-text">Order #${o.id} — Table ${o.table} — ${o.items.split(',')[0]}</div>
      <div class="activity-time">${o.time}</div>
    </div>
  `).join('');

  // Top items mini
  const topItems = document.getElementById('top-items');
  const itemCount = {};
  today.forEach(o => o.items.split(',').forEach(i => {
    const name = i.trim().replace(/ × \d+/, '');
    itemCount[name] = (itemCount[name] || 0) + 1;
  }));
  const sorted = Object.entries(itemCount).sort((a, b) => b[1] - a[1]).slice(0, 4);
  topItems.innerHTML = sorted.map(([name, count]) => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(44,24,16,0.05)">
      <span style="font-size:13px;color:#5C3D2E">${name}</span>
      <span style="font-family:'DM Mono',monospace;font-size:11px;color:#A07850">${count} orders</span>
    </div>
  `).join('');
}

// ── REPORTS ──────────────────────────────────
function renderReports() {
  const revenue = store.orders.reduce((s, o) => s + o.total, 0);
  document.getElementById('report-revenue').textContent = rupee(revenue);
  document.getElementById('report-orders').textContent = store.orders.length;
  document.getElementById('report-avg').textContent = rupee(Math.round(revenue / store.orders.length));
  document.getElementById('report-staff').textContent = store.staff.filter(s => s.status === 'on-duty').length;

  // Simple bar chart via CSS
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const data = [2800, 3400, 2900, 4100, 3800, 5200, 4700];
  const max = Math.max(...data);
  document.getElementById('bar-chart').innerHTML = days.map((d, i) => `
    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;flex:1">
      <div style="font-family:'DM Mono',monospace;font-size:10px;color:#A07850">${rupee(data[i])}</div>
      <div style="width:100%;background:rgba(44,24,16,0.07);border-radius:6px;height:150px;display:flex;align-items:flex-end;overflow:hidden">
        <div style="width:100%;height:${Math.round((data[i]/max)*100)}%;background:linear-gradient(180deg,#D4A054,#C05B2C);border-radius:6px 6px 0 0;transition:height 0.5s ease"></div>
      </div>
      <div style="font-family:'DM Mono',monospace;font-size:10px;color:#A07850;letter-spacing:0.1em">${d}</div>
    </div>
  `).join('');
}

// ── MODAL UTILS ──────────────────────────────
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

function openNewOrder() {
  document.getElementById('order-modal').classList.add('open');
}

function saveOrder() {
  const table = document.getElementById('field-order-table').value;
  const items = document.getElementById('field-order-items').value;
  const total = document.getElementById('field-order-total').value;
  if (!table || !items || !total) return alert('Fill all fields.');
  const id = store.orders.reduce((max, o) => Math.max(max, o.id), 0) + 1;
  const now = new Date();
  const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  store.orders.push({ id, table: +table, items, total: +total, status: 'pending', time });
  closeModal('order-modal');
  renderOrders(orderFilter);
  renderDashboard();
}

// ── SEARCH ───────────────────────────────────
function searchMenu(q) {
  const grid = document.getElementById('menu-grid');
  const items = q
    ? store.menu.filter(m => m.name.toLowerCase().includes(q.toLowerCase()) || m.cat.toLowerCase().includes(q.toLowerCase()))
    : store.menu;
  if (!q) { renderMenu(); return; }
  grid.innerHTML = items.map(m => `
    <div class="menu-card">
      <div class="menu-card-img">${m.emoji}</div>
      <div class="menu-card-body">
        <div class="menu-card-name">${m.name}</div>
        <div class="menu-card-cat">${m.cat}</div>
        <div class="menu-card-footer">
          <span class="price">${rupee(m.price)}</span>
          <button class="btn btn-outline btn-sm" onclick="editMenuItem(${m.id})">✏️</button>
        </div>
      </div>
    </div>
  `).join('');
}

// ── CLOCK ────────────────────────────────────
function updateClock() {
  const el = document.getElementById('live-clock');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
    + '  ·  '
    + now.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

// ── INIT ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderDashboard();
  renderOrders();
  renderMenu();
  renderTables();
  renderInventory();
  renderStaff();
  renderReports();
  updateTableStats();
  updateClock();
  setInterval(updateClock, 1000);
  navigate('dashboard');
});
