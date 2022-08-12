const emptycart = `<span class="empty-cart"
>Looks Like You Haven't Added Any Product In The Cart</span
>`;
//Bật loading
export let batLoading = () => {
  document.getElementById("loading").style.display = "flex";
};
//Tắt Loading
export let tatLoading = () => {
  document.getElementById("loading").style.display = "none";
};
//Đếm tổng sản phẩm trong giỏ hàng:
export let demTongsp = (e) => {
  let tongsp = 0;
  e.forEach((item) => {
    tongsp += item.quantily;
  });
  document.getElementById("total-qty").innerText = tongsp;
};
//Render nút mũi tên tăng giảm trong giỏ hàng
export const renderChangeqtyButton = (soluong, id) => {
  let itemid = "addItem" + id;
  document.getElementById(itemid).innerHTML = `
  <div>
    <button class="btn-qty" id="sub${id}" onclick="qtyChange(${id},'sub')"><i class="fas fa-chevron-left"></i></button>
    <p class="qty" id="qty${id}">${soluong}</p>
    <button class="btn-qty" id="add${id}" onclick="qtyChange(${id},'add')"><i class="fas fa-chevron-right"></i></button>
  </div>
  `;
};
//Render button AddItem
export const renderAddItemButton = (id) => {
  let itemid = "addItem" + id;
  document.getElementById(itemid).innerHTML = `
    <div>
      <button onclick="addItem('${id}')" class="add-btn">
      Add <i class="fas fa-chevron-right"></i>
      </button>
    </div
    `;
};
export let chonSanPham = (cart, list) => {
  let sp = document.getElementById("chonSP").value;
  let ItemList = [];
  list.forEach((item) => {
    if (item.type == sp) {
      ItemList.push(item);
    }
  });

  if (ItemList.length > 0) {
    renderItems(cart, ItemList);
  } else {
    renderItems(cart, list);
  }
};
//Redner sản phẩm từ database hoặc từ Cache
export const renderItems = (cart, list) => {
  let contentHTML = "";
  list.forEach((item) => {
    let logoicon = "";
    if (item.type == "apple") {
      logoicon = `<i class="fab fa-apple"></i>`;
    } else {
      logoicon = `<p>SAMSUNG</p>`;
    }
    let contentItems = `
    <div class="col-md-6 col-xl-3 justify-content-center">
      <div class="card">
            <div class="top-bar">
              ${logoicon}
              <em class="stocks">In Stock</em>
            </div>
            <div class="img-container">
              <img
                class="product-img"
                src="${item.img}"
                alt=""
              />
            </div>
            <div class="details text-white">
              <div class="name-fav">
                <strong class="product-name">${item.name}</strong>
                <button onclick='this.classList.toggle("fav")' class="heart">
                  <i class="fas fa-heart"></i>
                </button>
              </div>
              <div class="wrapper">
                <p>Camera trước: ${item.frontCamera} <br>
                Camera sau: ${item.backCamera}
                </p>
           
                <p>
                ${item.desc}
                </p>
              </div>
              <div class="purchase">
                <p class="product-price">$${item.price}</p>
                <span class="btn-add" id="addItem${item.id}">
                  <div>
                    <button onclick="addItem(${item.id})" class="add-btn">
                      Add <i class="fas fa-chevron-right"></i>
                    </button>
                    </div
                ></span>
              </div>
            </div>
          </div>
        </div>
      `;
    contentHTML += contentItems;
  });
  document.getElementById("main-cart").innerHTML = contentHTML;
  if (cart.length > 0) {
    list.forEach((item) => {
      let vitritrongcart1 = null;
      let count1 = 0;
      cart.forEach((i) => {
        if (item.id == i.id) {
          count1++;
          vitritrongcart1 = cart.indexOf(i);
        }
      });
      if (count1 != 0) {
        renderChangeqtyButton(cart[vitritrongcart1].quantily, item.id);
      }
    });
  }
};
//Chọn sản phẩm theo hãng

//render sản phẩm rong giỏ hàng
export const renderItemsInCart = (cart, list) => {
  let contentHTML = "";
  let TongTien = 0;
  if (cart.length > 0) {
    cart.forEach((e) => {
      list.forEach((item) => {
        if (e.id == item.id) {
          let contentTr = `
          <div class="cart-item">
          <div class="cart-img">
            <img src="${item.img}" alt="">
          </div>
          <strong class="name">${item.name}</strong>
          <span class="qty-change">
        <div>
          <button class="btn-qty" onclick="qtyChange(${
            item.id
          },'sub')"><i class="fas fa-chevron-left"></i></button>
          <p class="qty">${e.quantily}</p>
          <button class="btn-qty" onclick="qtyChange(${
            item.id
          },'add')"><i class="fas fa-chevron-right"></i></button>
        </div>
        </span>
          <p class="price" ">$${item.price * e.quantily}</p>
          <button onclick="removeItem('${
            item.id
          }')"><i class="fas fa-trash"></i></button>
        </div>
          `;
          let tongtiensp = item.price * e.quantily;
          TongTien += tongtiensp;
          contentHTML += contentTr;
        }
      });
    });
    document.getElementById("cart-items").innerHTML = contentHTML;
    document.getElementById("tongtien").innerHTML = TongTien;
  } else {
    document.getElementById("cart-items").innerHTML = emptycart;
    document.getElementById("tongtien").innerHTML = 0;
  }
};

export let renderItemsPurchase = (cart, list) => {
  let contentName = "";
  let contentPrice = "";
  let TongTien = 0;
  cart.forEach((i) => {
    list.forEach((item) => {
      if (i.id == item.id) {
        let contentItemname = `
        <span>${i.quantily} x ${item.name}</span>
              `;
        contentName += contentItemname;
        let contentItemprice = `
        <span>$${item.price * i.quantily}</span>
              `;
        contentPrice += contentItemprice;
        let tongtiensp = item.price * i.quantily;
        TongTien += tongtiensp;
      }
    });
  });
  let contentHTML = `
  <div class="invoice">
  <div class="shipping-items">
   <div class="item-names">${contentName}</div>
    <div class="items-price">${contentPrice}</div>
        </div>
              <hr>
  <div class="payment">
  <em>payment</em>
  <div>
    <p>total amount to be paid:</p><span class="pay">$ ${TongTien}</span>
  </div>
</div>
<div class="order">
  <button onclick="order()" class="btn-order btn">Order Now</button>
  <button onclick="buy(0)" class="btn-cancel btn">Cancel</button>
</div>
</div>

  `;
  document.getElementById("oder-now").innerHTML = contentHTML;
};

export const rendderBill = (cart, list) => {
  let TongTien = 0;
  cart.forEach((i) => {
    list.forEach((item) => {
      if (i.id == item.id) {
        let tongtiensp = item.price * i.quantily;
        TongTien += tongtiensp;
      }
    });
  });
  let contentHTML = `<div class="invoice" style="height: 500px; width: 400px;">
  <div>
    <div class="order-details">
      <em>your order has been placed</em>
      <p>your order will be delivered to you in 3-5 working days</p>
      <p>you can pay <span style="color:red">$${TongTien}</span> by card or any online transaction method after the products have been dilivered to you</p>
      <p>Thank you so much!</p>
    </div>
    <button onclick="goHomepage()" class="btn-ok">Go Home Page</button>
  </div></div>
  `;
  document.getElementById("oder-now").innerHTML = contentHTML;
};
