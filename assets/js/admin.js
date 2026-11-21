(() => {
  const STORAGE_KEY = "hossnyProducts";
  const fallbackImage = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80";
  const seedProducts = [
    {id:1,name:"OVERSIZED CORE TEE",cat:"T-Shirts",price:590,tag:"BEST SELLER",img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80"},
    {id:2,name:"HEAVYWEIGHT HOODIE",cat:"Hoodies",price:1290,tag:"NEW DROP",img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80"},
    {id:3,name:"UTILITY CARGO PANTS",cat:"Pants",price:1150,tag:"LIMITED",img:"https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=900&q=80"},
    {id:4,name:"GRAPHIC STREET TEE",cat:"T-Shirts",price:690,tag:"NEW",img:"https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=80"},
    {id:5,name:"ESSENTIAL ZIP HOODIE",cat:"Hoodies",price:1450,tag:"HOT",img:"https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=900&q=80"},
    {id:6,name:"RELAXED FIT DENIM",cat:"Pants",price:1390,tag:"",img:"https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80"},
    {id:7,name:"HOSSNY LOGO CAP",cat:"Accessories",price:420,tag:"",img:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=80"},
    {id:8,name:"DAILY CROSSBODY",cat:"Accessories",price:750,tag:"NEW",img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80"}
  ];
  let products = loadProducts();
  const $ = id => document.getElementById(id);
  const money = n => "EGP " + Number(n).toLocaleString("en-EG");
  const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, char => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[char]));

  function loadProducts() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(saved) ? saved : seedProducts.slice();
    } catch {
      return seedProducts.slice();
    }
  }
  function saveProducts() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    render();
  }
  function render() {
    const query = $("searchProducts").value.trim().toLowerCase();
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.cat.toLowerCase().includes(query)
    );
    $("totalProducts").textContent = products.length;
    $("totalCategories").textContent = new Set(products.map(p => p.cat)).size;
    if (!filtered.length) {
      $("inventory").innerHTML = '<div class="empty-state">No products found. Add a product or change your search.</div>';
      return;
    }
    $("inventory").innerHTML = `
      <table class="inventory-table">
        <thead><tr><th>PRODUCT</th><th>CATEGORY</th><th>PRICE</th><th>LABEL</th><th>ACTIONS</th></tr></thead>
        <tbody>${filtered.map(product => `
          <tr>
            <td><div class="inventory-product">
              <img src="${escapeHTML(product.img || fallbackImage)}" alt="" onerror="this.src='${fallbackImage}'">
              <div>${escapeHTML(product.name)}<small>ID: ${escapeHTML(product.id)}</small></div>
            </div></td>
            <td>${escapeHTML(product.cat)}</td>
            <td>${money(product.price)}</td>
            <td><span class="stock-label">${escapeHTML(product.tag || "—")}</span></td>
            <td><div class="table-actions">
              <button type="button" data-edit="${escapeHTML(product.id)}">EDIT</button>
              <button type="button" class="delete-btn" data-delete="${escapeHTML(product.id)}">DELETE</button>
            </div></td>
          </tr>`).join("")}
        </tbody>
      </table>`;
  }
  function resetForm() {
    $("productForm").reset();
    $("productId").value = "";
    $("formHeading").innerHTML = "Add a product<span>.</span>";
    $("formMode").textContent = "NEW ITEM";
    $("saveButton").textContent = "SAVE PRODUCT";
  }
  function editProduct(id) {
    const product = products.find(item => String(item.id) === String(id));
    if (!product) return;
    $("productId").value = product.id;
    $("productName").value = product.name;
    $("productPrice").value = product.price;
    $("productCategory").value = product.cat;
    $("productTag").value = product.tag || "";
    $("productImage").value = product.img || "";
    $("formHeading").innerHTML = "Edit product<span>.</span>";
    $("formMode").textContent = "EDITING ITEM";
    $("saveButton").textContent = "UPDATE PRODUCT";
    $("formMessage").textContent = "";
    window.scrollTo({top:0,behavior:"smooth"});
  }
  $("productForm").addEventListener("submit", event => {
    event.preventDefault();
    const id = $("productId").value;
    const name = $("productName").value.trim().toUpperCase();
    const price = Number($("productPrice").value);
    const cat = $("productCategory").value;
    const tag = $("productTag").value.trim().toUpperCase();
    const img = $("productImage").value.trim() || fallbackImage;
    if (!name || !Number.isFinite(price) || price <= 0) {
      $("formMessage").textContent = "Enter a valid product name and price.";
      return;
    }
    if (id) {
      products = products.map(product => String(product.id) === String(id)
        ? {...product,name,price,cat,tag,img}
        : product);
      $("formMessage").textContent = "Product updated in this browser.";
    } else {
      products.unshift({id:Date.now(),name,price,cat,tag:tag || "NEW",img});
      $("formMessage").textContent = "Product added to this browser.";
    }
    saveProducts();
    resetForm();
  });
  $("resetButton").addEventListener("click", () => {
    resetForm();
    $("formMessage").textContent = "";
  });
  $("searchProducts").addEventListener("input", render);
  $("inventory").addEventListener("click", event => {
    const editButton = event.target.closest("[data-edit]");
    const deleteButton = event.target.closest("[data-delete]");
    if (editButton) editProduct(editButton.dataset.edit);
    if (deleteButton) {
      const id = deleteButton.dataset.delete;
      const product = products.find(item => String(item.id) === String(id));
      if (!product || !confirm(`Delete "${product.name}"?`)) return;
      products = products.filter(item => String(item.id) !== String(id));
      saveProducts();
      $("formMessage").textContent = "Product deleted.";
    }
  });

  function loadOrders() {
    try {
      const value = JSON.parse(localStorage.getItem("hossnyOrders") || "[]");
      return Array.isArray(value) ? value : [];
    } catch { return []; }
  }
  function renderCustomers() {
    const orders = loadOrders();
    const map = new Map();
    orders.forEach(order => {
      const customer = order.customer || {};
      const key = (customer.phone || customer.email || customer.name || order.id).toLowerCase();
      if (!map.has(key)) map.set(key, { ...customer, orders: 0, spent: 0, lastOrder: order.createdAt });
      const record = map.get(key);
      record.orders += 1;
      record.spent += Number(order.total || 0);
      if (order.createdAt && (!record.lastOrder || order.createdAt > record.lastOrder)) record.lastOrder = order.createdAt;
    });
    const customers = Array.from(map.values());
    const query = $("searchCustomers").value.trim().toLowerCase();
    const filtered = customers.filter(c =>
      [c.name, c.phone, c.email, c.address].join(" ").toLowerCase().includes(query)
    );
    $("customerSummary").textContent = `${customers.length} customer${customers.length === 1 ? "" : "s"} recorded from demo orders`;
    $("customersList").innerHTML = filtered.length ? `
      <table class="inventory-table">
       <thead><tr><th>CUSTOMER</th><th>PHONE</th><th>EMAIL</th><th>ORDERS</th><th>TOTAL SPENT</th></tr></thead>
       <tbody>${filtered.map(c => `<tr>
        <td>${escapeHTML(c.name || "—")}<small class="customer-address">${escapeHTML(c.address || "Address not provided")}</small></td>
        <td>${escapeHTML(c.phone || "—")}</td><td>${escapeHTML(c.email || "—")}</td>
        <td>${c.orders}</td><td>${money(c.spent)}</td>
       </tr>`).join("")}</tbody>
      </table>` : '<div class="empty-state">No customer records yet. Customer details will appear here after a demo checkout is submitted.</div>';
    $("customerOrders").innerHTML = orders.length ? `
      <table class="inventory-table">
       <thead><tr><th>ORDER ID</th><th>CUSTOMER</th><th>ITEMS</th><th>TOTAL</th><th>STATUS</th><th>DATE</th></tr></thead>
       <tbody>${orders.map(o => `<tr>
        <td>${escapeHTML(o.id)}</td><td>${escapeHTML(o.customer?.name || "—")}<small class="customer-address">${escapeHTML(o.customer?.phone || "")}</small></td>
        <td>${(o.items || []).map(i => `${escapeHTML(i.name)} (${escapeHTML(i.size || "")})`).join(", ")}</td>
        <td>${money(o.total)}</td><td>${escapeHTML(o.status || "Pending")}</td>
        <td>${o.createdAt ? new Date(o.createdAt).toLocaleDateString("en-GB") : "—"}</td>
       </tr>`).join("")}</tbody>
      </table>` : '<div class="empty-state">No orders have been placed yet.</div>';
  }

  $("todayLabel").textContent = new Date().toLocaleDateString("en-GB", {
    weekday:"short", day:"2-digit", month:"short", year:"numeric"
  });
  render();
  renderCustomers();
})();