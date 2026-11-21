(() => {
  const STORAGE_KEY = "hossnyProducts";
  const CATEGORY_KEY = "hossnyCategories";
  const HOME_KEY = "hossnyHome";
  const SECTIONS_KEY = "hossnyHomeSections";
  const defaultCategories = [
    {id:"cat-shirts",name:"T-Shirts",nameAr:"تيشيرتات"},
    {id:"cat-hoodies",name:"Hoodies",nameAr:"هوديز"},
    {id:"cat-pants",name:"Pants",nameAr:"بناطيل"},
    {id:"cat-accessories",name:"Accessories",nameAr:"إكسسوارات"}
  ];
  let categories = loadJSON(CATEGORY_KEY, defaultCategories);
  let homeContent = loadJSON(HOME_KEY, {});
  let customSections = loadJSON(SECTIONS_KEY, []);
  function loadJSON(key, fallback) {
    try { const v = JSON.parse(localStorage.getItem(key)); return v ?? fallback; }
    catch { return fallback; }
  }
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

  function saveCategories() {
    localStorage.setItem(CATEGORY_KEY, JSON.stringify(categories));
    populateProductCategories();
    renderCategories();
    render();
  }
  function populateProductCategories() {
    const select = $("productCategory");
    const current = select.value;
    select.innerHTML = categories.map(c => `<option value="${escapeHTML(c.name)}">${escapeHTML(c.name)}</option>`).join("");
    if (categories.some(c => c.name === current)) select.value = current;
  }
  function renderCategories() {
    $("categoriesManager").innerHTML = categories.length ? categories.map(c => `
      <div class="category-row">
        <div><strong>${escapeHTML(c.name)}</strong><small>${escapeHTML(c.nameAr || "Arabic name not set")}</small></div>
        <div class="category-actions"><button type="button" data-category-edit="${escapeHTML(c.id)}">EDIT</button><button type="button" class="delete-btn" data-category-delete="${escapeHTML(c.id)}">DELETE</button></div>
      </div>`).join("") : '<div class="empty-state">No categories yet. Add your first category above.</div>';
    $("totalCategories").textContent = categories.length;
  }
  function loadHomeForm() {
    const defaults = {
      heroEyebrow:"HOSSNY® / NEW SEASON 026", heroTitle:"OWN\\nYOUR\\nSTREET.",
      heroDescription:"Built for the everyday. Made to stand out. Discover the latest essentials from HOSSNY streetwear.",
      heroButton:"SHOP THE DROP", heroImage:"",
      collectionEyebrow:"THE COLLECTION", collectionTitle:"FRESH PICKS", collectionDescription:"Everyday pieces. Different energy.",
      bannerEyebrow:"NOT HERE TO BLEND IN", bannerTitle:"MAKE\\nYOUR\\nMOVE.",
      bannerDescription:"Streetwear is more than what you wear. It's how you show up. Find your fit and make it yours.",
      bannerButton:"EXPLORE THE COLLECTION", bannerImage:""
    };
    homeContent = {...defaults, ...homeContent};
    Object.entries(homeContent).forEach(([key,value]) => { const field = $(key); if(field) field.value = value || ""; });
  }
  function saveHomeForm(event) {
    event.preventDefault();
    ["heroEyebrow","heroTitle","heroDescription","heroButton","heroImage","collectionEyebrow","collectionTitle","collectionDescription","bannerEyebrow","bannerTitle","bannerDescription","bannerButton","bannerImage"].forEach(id => homeContent[id] = $(id).value.trim());
    localStorage.setItem(HOME_KEY, JSON.stringify(homeContent));
    $("homeMessage").textContent = "Homepage content saved in this browser. Refresh the storefront to preview it.";
  }
  function renderCustomSections() {
    $("homeSectionsManager").innerHTML = customSections.length ? customSections.map((s,i) => `
      <div class="category-row">
        <div><strong>${escapeHTML(s.title)}</strong><small>${escapeHTML(s.description || "No description")} · ${s.image ? "Image added" : "No image"}</small></div>
        <div class="category-actions"><button type="button" data-section-edit="${i}">EDIT</button><button type="button" class="delete-btn" data-section-delete="${i}">DELETE</button></div>
      </div>`).join("") : '<div class="empty-state">No extra homepage sections yet.</div>';
  }
  function resetSectionForm() {
    $("sectionForm").reset();
    $("sectionForm").dataset.editIndex = "";
    $("sectionForm").querySelector('button[type="submit"]').textContent = "ADD HOMEPAGE SECTION";
  }
  function fillSectionForm(index) {
    const s = customSections[index]; if(!s) return;
    $("sectionTitle").value = s.title || "";
    $("sectionTitleAr").value = s.titleAr || "";
    $("sectionDescription").value = s.description || "";
    $("sectionImage").value = s.image || "";
    $("sectionButton").value = s.button || "";
    $("sectionForm").dataset.editIndex = String(index);
    $("sectionForm").querySelector('button[type="submit"]').textContent = "UPDATE HOMEPAGE SECTION";
    window.scrollTo({top:document.getElementById("sectionForm").getBoundingClientRect().top + window.scrollY - 30,behavior:"smooth"});
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
    renderOrders(orders);
    renderDashboardOrders(orders);
  }

  function productImageFor(item) {
    if (item.img) return item.img;
    const match = products.find(p => String(p.id) === String(item.id) || p.name === item.name);
    return match?.img || fallbackImage;
  }
  function renderOrders(orders = loadOrders()) {
    $("sidebarOrderCount").textContent = orders.length;
    $("customerOrders").innerHTML = orders.length ? orders.map(order => `
      <article class="order-card">
        <div class="order-card-head">
          <div><span class="order-id">${escapeHTML(order.id)}</span><small>${order.createdAt ? new Date(order.createdAt).toLocaleString("en-GB") : "—"}</small></div>
          <select class="order-status-select" data-order-status="${escapeHTML(order.id)}">
            ${["Pending","Processing","Shipped","Delivered","Cancelled"].map(status => `<option value="${status}" ${(order.status || "Pending") === status ? "selected" : ""}>${status}</option>`).join("")}
          </select>
        </div>
        <div class="order-card-body">
          <div class="order-customer"><strong>${escapeHTML(order.customer?.name || "Customer")}</strong><span>${escapeHTML(order.customer?.phone || "—")}</span><span>${escapeHTML(order.customer?.email || "—")}</span><small>${escapeHTML(order.customer?.address || "—")}</small></div>
          <div class="order-items">${(order.items || []).map(item => `
            <div class="order-item">
              <img src="${escapeHTML(productImageFor(item))}" alt="${escapeHTML(item.name)}" onerror="this.src='${fallbackImage}'">
              <div class="order-item-info"><strong>${escapeHTML(item.name)}</strong><small>Size: ${escapeHTML(item.size || "—")} · Qty: ${Number(item.quantity || 1)}</small><b>${money(item.price)}</b></div>
            </div>`).join("")}
          </div>
          <div class="order-total"><small>${escapeHTML(order.paymentMethod || "Payment method")}</small><strong>${money(order.total || 0)}</strong></div>
        </div>
      </article>`).join("") : '<div class="empty-state">No orders have been placed yet.</div>';
  }
  function renderDashboardOrders(orders = loadOrders()) {
    $("dashboardRecentOrders").innerHTML = orders.length ? orders.slice(0,4).map(order => `
      <div class="recent-order-row">
        <div><strong>${escapeHTML(order.customer?.name || "Customer")}</strong><small>${escapeHTML(order.id)} · ${order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-GB") : ""}</small></div>
        <strong>${money(order.total || 0)}</strong>
        <span class="recent-status">${escapeHTML(order.status || "Pending")}</span>
      </div>`).join("") : '<div class="empty-state">No recent orders yet.</div>';
  }
  function updateOrderStatus(id, status) {
    const orders = loadOrders().map(order => order.id === id ? {...order,status} : order);
    localStorage.setItem("hossnyOrders", JSON.stringify(orders));
    renderOrders(orders);
    renderDashboardOrders(orders);
  }



  populateProductCategories();
  renderCategories();
  loadHomeForm();
  renderCustomSections();

  $("categoryForm").addEventListener("submit", event => {
    event.preventDefault();
    const name = $("categoryName").value.trim();
    const nameAr = $("categoryNameAr").value.trim();
    if (!name) return;
    if (categories.some(c => c.name.toLowerCase() === name.toLowerCase())) {
      $("categoryMessage").textContent = "This category already exists."; return;
    }
    categories.push({id:"cat-"+Date.now(),name,nameAr});
    localStorage.setItem(CATEGORY_KEY, JSON.stringify(categories));
    $("categoryForm").reset();
    $("categoryMessage").textContent = "Category added. It is now available in the product form and storefront filters.";
    saveCategories();
  });
  $("categoriesManager").addEventListener("click", event => {
    const edit = event.target.closest("[data-category-edit]");
    const del = event.target.closest("[data-category-delete]");
    if (edit) {
      const category = categories.find(c => c.id === edit.dataset.categoryEdit);
      if (!category) return;
      const newName = prompt("Category name:", category.name);
      if (newName === null || !newName.trim()) return;
      const newArabic = prompt("Arabic category name (optional):", category.nameAr || "") ?? category.nameAr;
      const oldName = category.name;
      category.name = newName.trim();
      category.nameAr = newArabic.trim();
      products = products.map(p => p.cat === oldName ? {...p,cat:category.name} : p);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      saveCategories();
    }
    if (del) {
      const category = categories.find(c => c.id === del.dataset.categoryDelete);
      if (!category) return;
      if (products.some(p => p.cat === category.name)) {
        alert("Move or edit the products in this category before deleting it."); return;
      }
      if (!confirm(`Delete category "${category.name}"?`)) return;
      categories = categories.filter(c => c.id !== category.id);
      saveCategories();
    }
  });
  $("homeForm").addEventListener("submit", saveHomeForm);
  $("resetHomeButton").addEventListener("click", () => {
    if (!confirm("Reset homepage text and image settings to defaults?")) return;
    localStorage.removeItem(HOME_KEY); homeContent = {}; loadHomeForm();
    $("homeMessage").textContent = "Homepage settings reset. Save them to apply defaults.";
  });
  $("sectionForm").addEventListener("submit", event => {
    event.preventDefault();
    const item = {
      title:$("sectionTitle").value.trim(), titleAr:$("sectionTitleAr").value.trim(),
      description:$("sectionDescription").value.trim(), image:$("sectionImage").value.trim(),
      button:$("sectionButton").value.trim()
    };
    const editIndex = $("sectionForm").dataset.editIndex;
    if (editIndex !== "") customSections[Number(editIndex)] = item;
    else customSections.push(item);
    localStorage.setItem(SECTIONS_KEY, JSON.stringify(customSections));
    resetSectionForm(); renderCustomSections();
    $("sectionMessage").textContent = "Homepage section saved. Refresh the storefront to preview it.";
  });
  $("homeSectionsManager").addEventListener("click", event => {
    const edit = event.target.closest("[data-section-edit]");
    const del = event.target.closest("[data-section-delete]");
    if (edit) fillSectionForm(Number(edit.dataset.sectionEdit));
    if (del) {
      const index = Number(del.dataset.sectionDelete);
      if (!confirm("Delete this homepage section?")) return;
      customSections.splice(index,1);
      localStorage.setItem(SECTIONS_KEY, JSON.stringify(customSections));
      renderCustomSections();
    }
  });


  const viewTitles = {dashboard:"Dashboard",products:"Products",categories:"Categories",orders:"Orders",customers:"Customers",homepage:"Homepage"};
  function showAdminView(viewName) {
    document.querySelectorAll("[data-view-panel]").forEach(panel => panel.classList.toggle("active", panel.dataset.viewPanel === viewName));
    document.querySelectorAll("[data-admin-view]").forEach(button => button.classList.toggle("active", button.dataset.adminView === viewName));
    $("activeViewTitle").textContent = viewTitles[viewName] || "Dashboard";
    localStorage.setItem("hossnyAdminView", viewName);
    document.body.classList.remove("sidebar-open");
    window.scrollTo({top:0,behavior:"smooth"});
  }
  document.querySelectorAll("[data-admin-view]").forEach(button => button.addEventListener("click", () => showAdminView(button.dataset.adminView)));
  document.querySelectorAll("[data-go-view]").forEach(button => button.addEventListener("click", () => showAdminView(button.dataset.goView)));
  $("sidebarMobileToggle").addEventListener("click", () => document.body.classList.toggle("sidebar-open"));
  document.addEventListener("click", event => {
    const statusSelect = event.target.closest("[data-order-status]");
    if (statusSelect) updateOrderStatus(statusSelect.dataset.orderStatus, statusSelect.value);
    if (document.body.classList.contains("sidebar-open") && !event.target.closest(".admin-sidebar") && !event.target.closest("#sidebarMobileToggle")) {
      document.body.classList.remove("sidebar-open");
    }
  });

  $("todayLabel").textContent = new Date().toLocaleDateString("en-GB", {
    weekday:"short", day:"2-digit", month:"short", year:"numeric"
  });
  render();
  renderCustomers();
  showAdminView(localStorage.getItem("hossnyAdminView") || "dashboard");
})();