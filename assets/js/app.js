const seed=[
{id:1,name:'OVERSIZED CORE TEE',cat:'T-Shirts',price:590,tag:'BEST SELLER',img:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80'},
{id:2,name:'HEAVYWEIGHT HOODIE',cat:'Hoodies',price:1290,tag:'NEW DROP',img:'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80'},
{id:3,name:'UTILITY CARGO PANTS',cat:'Pants',price:1150,tag:'LIMITED',img:'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=900&q=80'},
{id:4,name:'GRAPHIC STREET TEE',cat:'T-Shirts',price:690,tag:'NEW',img:'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=80'},
{id:5,name:'ESSENTIAL ZIP HOODIE',cat:'Hoodies',price:1450,tag:'HOT',img:'https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=900&q=80'},
{id:6,name:'RELAXED FIT DENIM',cat:'Pants',price:1390,tag:'',img:'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80'},
{id:7,name:'HOSSNY LOGO CAP',cat:'Accessories',price:420,tag:'',img:'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=80'},
{id:8,name:'DAILY CROSSBODY',cat:'Accessories',price:750,tag:'NEW',img:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80'}
];
let products=JSON.parse(localStorage.getItem('hossnyProducts')||'null')||seed;
let cart=[],wishlist=[],activeFilter='All',selectedProduct=null,selectedSize='M';
const money=n=>'EGP '+Number(n).toLocaleString('en-EG');
function render(){let shown=products.filter(p=>activeFilter==='All'||p.cat===activeFilter);document.getElementById('products').innerHTML=shown.map(p=>`<article class="product"><div class="photo"><img src="${p.img}" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80'">${p.tag?`<span class="tag">${p.tag}</span>`:''}<button class="heart ${wishlist.includes(p.id)?'saved':''}" onclick="toggleWish(${p.id})">${wishlist.includes(p.id)?'♥':'♡'}</button><button class="quick" onclick="openProduct(${p.id})">QUICK ADD +</button></div><div class="pmeta"><div class="pname">${p.name}</div><div class="price">${money(p.price)}</div></div><div class="submeta">${p.cat} · BLACK / WHITE</div></article>`).join('');document.getElementById('resultCount').textContent=String(shown.length).padStart(2,'0')+' PRODUCTS';document.getElementById('cartCount').textContent=cart.length;document.getElementById('wishCount').textContent=wishlist.length;document.getElementById('adminProducts').textContent=products.length.toString().padStart(2,'0');}
function setFilter(f,el){activeFilter=f;document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('active',b.textContent.toLowerCase().includes(f.toLowerCase())||(f==='All'&&b.textContent==='All pieces')));render()}
function toggleWish(id){wishlist.includes(id)?wishlist=wishlist.filter(x=>x!==id):wishlist.push(id);render()}
function openProduct(id){selectedProduct=products.find(p=>p.id===id);selectedSize='M';document.getElementById('modalContent').innerHTML=`<div class="productdetail"><img src="${selectedProduct.img}"><div><div class="eyebrow">${selectedProduct.cat} / HOSSNY®</div><h2>${selectedProduct.name}</h2><h3>${money(selectedProduct.price)}</h3><p style="font-size:12px;color:#777;line-height:1.7">An everyday essential. Relaxed fit, premium feel, made to move with you.</p><b style="font-size:11px">SELECT SIZE</b><div class="sizes">${['S','M','L','XL','XXL'].map(s=>`<button class="size ${s===selectedSize?'selected':''}" onclick="chooseSize('${s}',this)">${s}</button>`).join('')}</div><button class="full" onclick="addToCart()">ADD TO BAG — ${money(selectedProduct.price)}</button></div></div>`;document.getElementById('modal').classList.add('show')}
function chooseSize(s,el){selectedSize=s;document.querySelectorAll('.size').forEach(x=>x.classList.remove('selected'));el.classList.add('selected')}
function addToCart(){cart.push({...selectedProduct,size:selectedSize});closeModal();openCart()}
function openCart(){document.getElementById('drawerTitle').textContent='YOUR BAG ('+cart.length+')';document.getElementById('drawerContent').innerHTML=cart.length?cart.map((p,i)=>`<div class="cartrow"><img src="${p.img}"><div><b>${p.name}</b><small>Size: ${p.size}</small><b>${money(p.price)}</b><br><button onclick="removeCart(${i})">REMOVE</button></div></div>`).join('')+`<div class="total"><span>SUBTOTAL</span><span>${money(cart.reduce((a,p)=>a+p.price,0))}</span></div><button class="full" onclick="checkout()">CONTINUE TO CHECKOUT ↗</button>`:'<p style="padding:30px 0;color:#777">Your bag is empty. Find your next favorite piece.</p>';showDrawer()}
function removeCart(i){cart.splice(i,1);openCart();render()}
function openWishlist(){document.getElementById('drawerTitle').textContent='SAVED PIECES';let items=products.filter(p=>wishlist.includes(p.id));document.getElementById('drawerContent').innerHTML=items.length?items.map(p=>`<div class="cartrow"><img src="${p.img}"><div><b>${p.name}</b><small>${money(p.price)}</small><button onclick="openProduct(${p.id})">VIEW PRODUCT</button></div></div>`).join(''):'<p style="padding:30px 0;color:#777">No saved pieces yet.</p>';showDrawer()}
function showDrawer(){document.getElementById('overlay').classList.add('show');document.getElementById('drawer').classList.add('open')}
function closePanels(){document.getElementById('overlay').classList.remove('show');document.getElementById('drawer').classList.remove('open')}
function closeModal(){document.getElementById('modal').classList.remove('show')}
function checkout(){
 document.getElementById('drawerContent').innerHTML=`<h3>CHECKOUT</h3><p style="font-size:12px;color:#777">Enter your delivery details to place a demo order.</p><input class="field" id="checkoutName" placeholder="Full name"><input class="field" id="checkoutPhone" type="tel" placeholder="Phone number"><input class="field" id="checkoutEmail" type="email" placeholder="Email address (optional)"><input class="field" id="checkoutAddress" placeholder="Full delivery address"><select class="field" id="checkoutPayment"><option>Cash on delivery</option><option>Online payment (integration required)</option></select><div class="total"><span>TOTAL</span><span>${money(cart.reduce((a,p)=>a+p.price,0))}</span></div><button class="full" onclick="placeDemoOrder()">PLACE DEMO ORDER</button><p id="checkoutMessage" class="notice"></p>`;
}
function placeDemoOrder(){
 const name=document.getElementById('checkoutName').value.trim();
 const phone=document.getElementById('checkoutPhone').value.trim();
 const email=document.getElementById('checkoutEmail').value.trim();
 const address=document.getElementById('checkoutAddress').value.trim();
 if(!name||!phone||!address){document.getElementById('checkoutMessage').textContent='Please enter your name, phone number and address.';return}
 const orders=JSON.parse(localStorage.getItem('hossnyOrders')||'[]');
 const order={
  id:'HS-'+Date.now(),
  customer:{name,phone,email,address},
  items:cart.map(p=>({id:p.id,name:p.name,price:Number(p.price),size:p.size,quantity:1})),
  total:cart.reduce((a,p)=>a+Number(p.price),0),
  paymentMethod:document.getElementById('checkoutPayment').value,
  status:'Pending',
  createdAt:new Date().toISOString()
 };
 orders.unshift(order);
 localStorage.setItem('hossnyOrders',JSON.stringify(orders));
 cart=[];
 render();
 document.getElementById('drawerContent').innerHTML='<h3>THANK YOU!</h3><p>Your demo order has been saved in this browser. HOSSNY will contact you to confirm it.</p>';
 setTimeout(closePanels,3000);
}
function trackOrder(){alert('Order tracking UI is planned. Connect an order database and tracking status API to enable live tracking.')}
function openAdmin(){document.getElementById('admin').classList.add('show');renderAdmin()}
function closeAdmin(){document.getElementById('admin').classList.remove('show')}
function addProduct(){let name=document.getElementById('newName').value.trim(),price=Number(document.getElementById('newPrice').value),cat=document.getElementById('newCategory').value,img=document.getElementById('newImage').value.trim();if(!name||!price){alert('Enter product name and price');return}products.unshift({id:Date.now(),name:name.toUpperCase(),price,cat,tag:'NEW',img:img||seed[0].img});localStorage.setItem('hossnyProducts',JSON.stringify(products));render();renderAdmin();document.getElementById('newName').value='';document.getElementById('newPrice').value='';document.getElementById('newImage').value=''}
function renderAdmin(){document.getElementById('adminInventory').innerHTML=`<table><thead><tr><th>PRODUCT</th><th>CATEGORY</th><th>PRICE</th><th></th></tr></thead><tbody>${products.map(p=>`<tr><td>${p.name}</td><td>${p.cat}</td><td>${money(p.price)}</td><td><button onclick="deleteProduct(${p.id})">Delete</button></td></tr>`).join('')}</tbody></table>`}
function deleteProduct(id){products=products.filter(p=>p.id!==id);localStorage.setItem('hossnyProducts',JSON.stringify(products));render();renderAdmin()}
render();
