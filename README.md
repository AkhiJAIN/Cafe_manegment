# ☕ Roast & Rest — Café Management Suite

A fully functional, single-folder café management website.
No frameworks, no build tools — just open `index.html` in any browser.

## 📁 Folder Structure

```
cafe-management/
├── index.html          ← Main app (open this)
├── css/
│   └── style.css       ← All styles & theme
├── js/
│   └── app.js          ← All logic & data
└── README.md
```

## 🧭 Pages & Features

| Page        | Features |
|-------------|----------|
| Dashboard   | Live revenue, orders, occupied tables, activity feed, top items, on-duty staff |
| Orders      | Filter by status, update order status, print receipt, add new orders |
| Menu        | Search, filter by category, add/edit items with emoji, price, availability |
| Tables      | Visual 12-table grid, click to cycle Free → Occupied → Reserved |
| Inventory   | Stock levels with visual bars, low-stock alerts, restock prompt |
| Staff       | Team list, shift info, duty toggle, add new staff |
| Reports     | Weekly revenue bar chart, order breakdown, top revenue items |

## 🚀 How to Run

```bash
# Simply open in a browser
open index.html

# Or with a local server
npx serve .
python -m http.server 8080
```

## 🎨 Design

- **Theme:** Warm espresso tones — cream, caramel, rust, sage
- **Fonts:** Playfair Display (headings), Libre Baskerville (body), DM Mono (labels)
- **UI:** Sidebar navigation, stat cards, modals, tables, badge system
- **Currency:** Indian Rupees (₹)
