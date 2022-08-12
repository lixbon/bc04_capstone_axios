import {
  renderItems,
  batLoading,
  tatLoading,
  chonSanPham,
  renderItemsInCart,
  renderItemsPurchase,
  rendderBill,
  demTongsp,
  renderChangeqtyButton,
  renderAddItemButton,
} from "./controller.js";
import { SanPham } from "./model.js";
const CART_LOCALSTORAGE = "CART_LOCALSTORAGE";
const BASE_URL = "https://62db6caad1d97b9e0c4f33ef.mockapi.io";
const datalist = axios({
  url: `${BASE_URL}/phoneshop`,
  method: "GET",
});

let cart = [];
let cartJson = localStorage.getItem(CART_LOCALSTORAGE);

if (cartJson != null) {
  cart = JSON.parse(cartJson);
}
const getItemsList = () => {
  batLoading();
  datalist
    .then(function (res) {
      tatLoading();
      renderItems(cart, res.data);
      renderItemsInCart(cart, res.data);
    })
    .catch(function (err) {
      tatLoading();
    });
};
getItemsList();
demTongsp(cart);

// Lọc sản phẩm theo chủng loại
document.getElementById("chonSP").addEventListener("change", () => {
  datalist
    .then(function (res) {
      chonSanPham(cart, res.data);
    })
    .catch(function (err) {
      console.log("Lỗi chọn sản phẩm");
    });
});

// Đóng mở giỏ hàng
let opensideNav = () => {
  document.getElementById("cover1").style.display = "block";
  document.getElementById("side-nav").style.right = "0px";
};
window.opensideNav = opensideNav;
let closesideNav = () => {
  document.getElementById("cover1").style.display = "none";
  document.getElementById("side-nav").style.right = "-100%";
};
window.closesideNav = closesideNav;

//Thêm sản phẩm vào giỏ hàng
let addItem = (id) => {
  renderChangeqtyButton(1, id);
  let sp = new SanPham(id, 1); //id sản phẩm, số lượng 1
  cart.push(sp);
  cartJson = JSON.stringify(cart);
  localStorage.setItem(CART_LOCALSTORAGE, cartJson);
  datalist
    .then(function (res) {
      renderItemsInCart(cart, res.data);
    })
    .catch(function (err) {
      console.log("Lỗi");
    });
  demTongsp(cart);
};
window.addItem = addItem;

// Thay đổi số lượng item
let qtyChange = (id, method) => {
  let qtyid = "qty" + id;
  let soluongsp = document.getElementById(qtyid).innerText * 1;
  // let tongsp = 0;
  if (soluongsp == 1 && method == "sub") {
    removeItem(id);
  } else if (method == "sub" && soluongsp > 0) {
    soluongsp--;
    document.getElementById(qtyid).innerText = soluongsp;
  } else if (method == "add") {
    soluongsp++;
    document.getElementById(qtyid).innerText = soluongsp;
  }
  cart.forEach((item) => {
    if (item.id == id) {
      item.quantily = soluongsp;
    }
  });
  demTongsp(cart);
  datalist
    .then(function (res) {
      renderItemsInCart(cart, res.data);
    })
    .catch(function (err) {
      console.log("Lỗi");
    });
  cartJson = JSON.stringify(cart);
  localStorage.setItem(CART_LOCALSTORAGE, cartJson);
};
window.qtyChange = qtyChange;

// Xoa san pham
let removeItem = (id) => {
  cart.forEach((item) => {
    if (id == item.id) {
      let itemxoa = cart.indexOf(item);
      cart.splice(itemxoa, 1);
    }
  });
  cartJson = JSON.stringify(cart);
  localStorage.setItem(CART_LOCALSTORAGE, cartJson);
  datalist
    .then(function (res) {
      renderItemsInCart(cart, res.data);
    })
    .catch(function (err) {
      console.log("Lỗi");
    });
  renderAddItemButton(id);
  demTongsp(cart);
};
window.removeItem = removeItem;

//Clear Cart
let clearCart = () => {
  cart = [];
  datalist
    .then(function (res) {
      renderItemsInCart(cart, res.data);
    })
    .catch(function (err) {
      console.log("Lỗi");
    });
  demTongsp(cart);
  getItemsList();
  cartJson = JSON.stringify(cart);
  localStorage.setItem(CART_LOCALSTORAGE, cartJson);
};
window.clearCart = clearCart;

// Mua San pham
let buy = (e) => {
  if (e == 1) {
    document.getElementById("side-nav").style = "right: -100%";
    document.getElementById("cover1").style.display = "none";
    document.getElementById("purchase-cover").style.display = "block";
    datalist
      .then(function (res) {
        renderItemsPurchase(cart, res.data);
      })
      .catch(function (err) {
        console.log("Lỗi");
      });
  } else if (e == 0) {
    document.getElementById("side-nav").style = "right: 0px";
    document.getElementById("cover1").style.display = "block";
    document.getElementById("purchase-cover").style.display = "none";
    document.getElementById("oder-now").innerHTML = "";
  }
};
window.buy = buy;

let order = () => {
  datalist
    .then(function (res) {
      rendderBill(cart, res.data);
    })
    .catch(function (err) {
      console.log("Lỗi");
    });
};
window.order = order;
const goHomepage = () => {
  document.getElementById("oder-now").innerHTML = "";
  document.getElementById("purchase-cover").style.display = "none";
  clearCart();
  getItemsList();
};

window.goHomepage = goHomepage;
