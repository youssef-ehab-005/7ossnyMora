(() => {
  const LANG_KEY = "hossnyLanguage";
  const THEME_KEY = "hossnyTheme";
  const translations = {
    "FREE SHIPPING ON ORDERS OVER EGP 2,000 · NEW DROP OUT NOW":"شحن مجاني للطلبات فوق 2,000 جنيه · المجموعة الجديدة وصلت",
    "Shop all":"تسوق الكل","T-shirts":"تيشيرتات","T-shirts":"تيشيرتات","Hoodies":"هوديز","New drop":"أحدث مجموعة",
    "♡":"♡","BAG":"السلة","OWN":"امتلك","YOUR":"أسلوبك","STREET.":"في الشارع.",
    "Built for the everyday. Made to stand out. Discover the latest essentials from HOSSNY streetwear.":"مصممة ليومك العادي، ومميزة لتعبّر عنك. اكتشف أحدث قطع HOSSNY.",
    "SHOP THE DROP":"تسوق المجموعة","THE COLLECTION":"المجموعة","FRESH PICKS":"اختياراتنا الجديدة",
    "Everyday pieces. Different energy.":"قطع يومية بروح مختلفة.","08 PRODUCTS":"08 منتجات","All pieces":"كل المنتجات",
    "Pants":"بناطيل","Accessories":"إكسسوارات","NOT HERE TO BLEND IN":"مش معمول علشان تكون عادي",
    "MAKE":"اصنع","YOUR":"أسلوبك","MOVE.":"بنفسك.",
    "Streetwear is more than what you wear. It's how you show up. Find your fit and make it yours.":"ملابس الشارع مش مجرد لبس؛ دي طريقة تعبر بيها عن نفسك. اختار القطعة اللي شبهك.",
    "EXPLORE THE COLLECTION":"اكتشف المجموعة","Secure checkout":"دفع آمن","Safe and simple checkout experience.":"تجربة شراء سهلة وآمنة.",
    "Easy returns":"استرجاع سهل","Hassle-free support for your order.":"دعم سهل وسريع بخصوص طلبك.",
    "Made for your move":"مصممة لحركتك","Street essentials with everyday comfort.":"أساسيات يومية تجمع بين الراحة والستايل.",
    "Everyday essentials. Street attitude.":"أساسيات يومية بروح الشارع.","Wear your own story.":"عبّر عن حكايتك بطريقتك.",
    "EXPLORE":"اكتشف","Shop all":"تسوق الكل","New arrivals":"وصل حديثاً","Best sellers":"الأكثر مبيعاً",
    "NEED HELP?":"تحتاج مساعدة؟","Track your order":"تتبع طلبك","Contact us":"تواصل معنا",
    "Shipping & returns":"الشحن والاسترجاع","ALL RIGHTS RESERVED.":"جميع الحقوق محفوظة.",
    "ADMIN":"الإدارة","YOUR BAG":"سلة مشترياتك","SAVED PIECES":"المنتجات المحفوظة",
    "QUICK ADD +":"أضف سريعاً +","SELECT SIZE":"اختر المقاس","ADD TO BAG":"أضف إلى السلة",
    "REMOVE":"حذف","SUBTOTAL":"الإجمالي الفرعي","CONTINUE TO CHECKOUT":"إتمام الشراء",
    "Your bag is empty. Find your next favorite piece.":"سلتك فارغة. اكتشف قطعتك المفضلة التالية.",
    "No saved pieces yet.":"لا توجد منتجات محفوظة حتى الآن.",
    "CHECKOUT":"إتمام الشراء","Enter your delivery details to place a demo order.":"أدخل بيانات التوصيل لإتمام طلب تجريبي.",
    "Enter your delivery details. This is a front-end demo; no payment will be processed.":"أدخل بيانات التوصيل. هذه نسخة تجريبية ولن تتم معالجة أي مدفوعات.",
    "Full name":"الاسم بالكامل","Phone number":"رقم الهاتف","Email address (optional)":"البريد الإلكتروني (اختياري)",
    "Full delivery address":"عنوان التوصيل بالتفصيل","Cash on delivery":"الدفع عند الاستلام",
    "Online payment (integration required)":"الدفع الإلكتروني (يتطلب الربط)","TOTAL":"الإجمالي",
    "PLACE DEMO ORDER":"تأكيد الطلب التجريبي","PLACE ORDER":"تأكيد الطلب",
    "Please enter your name, phone number and address.":"من فضلك أدخل الاسم ورقم الهاتف والعنوان.",
    "Please complete your name, phone and address.":"من فضلك أكمل الاسم ورقم الهاتف والعنوان.",
    "THANK YOU!":"شكراً لك!","Your demo order has been saved in this browser. HOSSNY will contact you to confirm it.":"تم حفظ طلبك التجريبي على هذا المتصفح. سيتواصل معك HOSSNY لتأكيد الطلب.",
    "An everyday essential. Relaxed fit, premium feel, made to move with you.":"قطعة أساسية ليومك. قصة مريحة وخامة مميزة تناسب حركتك.",
    "Order tracking UI is planned. Connect an order database and tracking status API to enable live tracking.":"خدمة تتبع الطلبات ستتوفر بعد ربط قاعدة بيانات الطلبات.",
    "STORE MANAGEMENT":"إدارة المتجر","LOCAL DEMO ADMIN":"لوحة إدارة تجريبية","VIEW STORE":"عرض المتجر",
    "STORE MANAGEMENT":"إدارة المتجر","Dashboard.":"لوحة التحكم.","Manage your HOSSNY products from one place.":"أدر منتجات HOSSNY من مكان واحد.",
    "TOTAL PRODUCTS":"إجمالي المنتجات","PRODUCT CATEGORIES":"تصنيفات المنتجات","STORAGE":"التخزين",
    "THIS BROWSER":"هذا المتصفح","CATALOGUE":"الكتالوج","Add a product":"إضافة منتج",
    "NEW ITEM":"منتج جديد","EDITING ITEM":"تعديل منتج","Product name":"اسم المنتج",
    "Price (EGP)":"السعر (جنيه)","Category":"التصنيف","Product label":"شارة المنتج",
    "NEW / BEST SELLER (optional)":"جديد / الأكثر مبيعاً (اختياري)","Image URL":"رابط الصورة",
    "SAVE PRODUCT":"حفظ المنتج","UPDATE PRODUCT":"تحديث المنتج","CLEAR FORM":"مسح الحقول",
    "YOUR COLLECTION":"مجموعتك","Product inventory.":"مخزون المنتجات.","Search products...":"ابحث عن المنتجات...",
    "CUSTOMER DATABASE":"قاعدة بيانات العملاء","Customer details.":"بيانات العملاء",
    "Search name / phone / email...":"ابحث بالاسم أو الهاتف أو البريد...",
    "ORDER HISTORY":"سجل الطلبات","Customer orders.":"طلبات العملاء",
    "Demo mode:":"الوضع التجريبي:","Product changes are saved in this browser's LocalStorage only. They are not shared with customers on other devices yet. We will connect Firebase next for shared products, secure admin login and customer orders.":"يتم حفظ تعديلات المنتجات على هذا المتصفح فقط، ولا تتم مشاركتها مع العملاء على أجهزة أخرى. سنربط Firebase لاحقاً لمزامنة المنتجات وتأمين الإدارة وحفظ الطلبات.",
    "BACK TO STORE":"العودة إلى المتجر","ALL RIGHTS RESERVED.":"جميع الحقوق محفوظة.",
    "Search products...":"ابحث عن المنتجات...","No products found. Add a product or change your search.":"لا توجد منتجات. أضف منتجاً أو غيّر كلمات البحث.",
    "Product updated in this browser.":"تم تحديث المنتج على هذا المتصفح.","Product added to this browser.":"تمت إضافة المنتج على هذا المتصفح.",
    "Enter a valid product name and price.":"أدخل اسم منتج وسعراً صحيحاً.","Product deleted.":"تم حذف المنتج.",
    "Delete":"حذف","Edit":"تعديل","PRODUCT":"المنتج","CATEGORY":"التصنيف","PRICE":"السعر",
    "LABEL":"الشارة","ACTIONS":"الإجراءات","CUSTOMER":"العميل","PHONE":"الهاتف","EMAIL":"البريد الإلكتروني",
    "ORDERS":"الطلبات","TOTAL SPENT":"إجمالي المشتريات","ORDER ID":"رقم الطلب","ITEMS":"المنتجات",
    "STATUS":"الحالة","DATE":"التاريخ","No customer records yet. Customer details will appear here after a demo checkout is submitted.":"لا توجد بيانات عملاء بعد. ستظهر بيانات العميل هنا بعد إتمام طلب تجريبي.",
    "No orders have been placed yet.":"لم يتم تسجيل أي طلبات حتى الآن.","customers recorded from demo orders":"عميل مسجل من الطلبات التجريبية",
    "Address not provided":"لم يتم إدخال العنوان","Pending":"قيد الانتظار","Processing":"قيد التجهيز","Shipped":"تم الشحن",
    "Delivered":"تم التوصيل","Cancelled":"ملغي","BLACK / WHITE":"أسود / أبيض","CONTROL CENTER":"لوحة التحكم","Dashboard":"لوحة التحكم","Products":"المنتجات","Categories":"التصنيفات","Orders":"الطلبات","Customers":"العملاء","Homepage":"الصفحة الرئيسية","LOCAL DEMO MODE":"وضع تجريبي محلي","LATEST ACTIVITY":"أحدث النشاطات","Recent orders":"أحدث الطلبات","VIEW ALL ORDERS":"عرض كل الطلبات","VIEW STORE":"عرض المتجر","LOCAL DEMO ADMIN":"إدارة تجريبية محلية","Pending":"قيد الانتظار","Processing":"قيد التجهيز","Shipped":"تم الشحن","Delivered":"تم التوصيل","Cancelled":"ملغي","Payment method":"طريقة الدفع","Customer":"العميل","Size:":"المقاس:","Qty:":"الكمية:","BEST SELLER":"الأكثر مبيعاً","NEW DROP":"مجموعة جديدة","LIMITED":"كمية محدودة","NEW":"جديد","HOT":"الأكثر طلباً","YOUR BAG":"سلة مشترياتك","PRODUCTS":"منتجات"
  };

  let language = localStorage.getItem(LANG_KEY) || "en";
  let theme = localStorage.getItem(THEME_KEY) || "light";
  const originalText = new WeakMap();
  const originalAttrs = new WeakMap();

  function translateText(value) {
    let result = value;
    const keys = Object.keys(translations).sort((a,b) => b.length-a.length);
    for (const key of keys) {
      if (result.includes(key)) result = result.split(key).join(translations[key]);
    }
    return result;
  }
  function translateElement(root=document) {
    if (language !== "ar") return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!node.nodeValue.trim()) continue;
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      node.nodeValue = translateText(originalText.get(node));
    }
    root.querySelectorAll?.("input,textarea,button,a,option,[title],[aria-label]").forEach(el => {
      ["placeholder","title","aria-label"].forEach(attr => {
        if (!el.hasAttribute(attr)) return;
        let store = originalAttrs.get(el);
        if (!store) { store = {}; originalAttrs.set(el, store); }
        if (!(attr in store)) store[attr] = el.getAttribute(attr);
        el.setAttribute(attr, translateText(store[attr]));
      });
    });
  }
  function restoreEnglish() {
    // Reloading restores text generated by scripts too, without losing cart/products.
    location.reload();
  }
  function applyLanguage() {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("is-ar", language === "ar");
    document.querySelectorAll("[data-language-toggle]").forEach(button => {
      button.textContent = language === "ar" ? "EN" : "AR";
      button.title = language === "ar" ? "Switch to English" : "التغيير إلى العربية";
      button.setAttribute("aria-label", button.title);
    });
    if (language === "ar") translateElement();
    else restoreEnglish();
  }
  function applyTheme() {
    document.body.classList.toggle("dark-theme", theme === "dark");
    document.querySelectorAll("[data-theme-toggle] .theme-icon").forEach(icon => {
      icon.textContent = theme === "dark" ? "☀" : "☾";
    });
    document.querySelectorAll("[data-theme-toggle]").forEach(button => {
      button.title = theme === "dark" ? (language === "ar" ? "الوضع الفاتح" : "Light mode") : (language === "ar" ? "الوضع الداكن" : "Dark mode");
      button.setAttribute("aria-label", button.title);
    });
  }

  document.addEventListener("click", event => {
    const languageButton = event.target.closest("[data-language-toggle]");
    const themeButton = event.target.closest("[data-theme-toggle]");
    if (languageButton) {
      language = language === "en" ? "ar" : "en";
      localStorage.setItem(LANG_KEY, language);
      location.reload();
    }
    if (themeButton) {
      theme = theme === "light" ? "dark" : "light";
      localStorage.setItem(THEME_KEY, theme);
      applyTheme();
    }
  });

  // Apply saved theme immediately; language reload ensures all dynamically generated UI is translated.
  applyTheme();
  if (language === "ar") {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
    document.body.classList.add("is-ar");
    document.querySelectorAll("[data-language-toggle]").forEach(button => button.textContent = "EN");
    translateElement();
    const observer = new MutationObserver(records => {
      records.forEach(record => {
        record.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) translateElement(node);
          else if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()) {
            if (!originalText.has(node)) originalText.set(node,node.nodeValue);
            node.nodeValue = translateText(originalText.get(node));
          }
        });
      });
    });
    observer.observe(document.body, {childList:true,subtree:true});
  }
})();