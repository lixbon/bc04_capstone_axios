import {
  kiemTraValidator,
  layThongTinTuForm,
  removeSpancontent,
  renderDSSP,
  showThongTinLenForm,
} from "./admin.controller.js";
import { batLoading, tatLoading } from "./controller.js";
const BASE_URL = "https://62db6caad1d97b9e0c4f33ef.mockapi.io";

let getDSSP = () => {
  batLoading();
  axios({
    url: `${BASE_URL}/phoneshop`,
    method: "GET",
  })
    .then(function (res) {
      tatLoading();
      renderDSSP(res.data);
    })
    .catch(function (err) {
      tatLoading();
    });
};
getDSSP();
document.getElementById("btnThemSP").addEventListener("click", () => {
  document.getElementById("themSP-btn").style.display = "block";
  document.getElementById("capNhatSP-btn").style.display = "none";
});
//Thêm sản phẩm
const themSP = () => {
  document.getElementById("themSP-btn").removeAttribute("data-dismiss");
  let newSP = layThongTinTuForm();
  if (kiemTraValidator()) {
    document.getElementById("themSP-btn").setAttribute("data-dismiss", "modal");
    batLoading();
    axios({
      url: `${BASE_URL}/phoneshop`,
      method: "POST",
      data: newSP,
    })
      .then(function (res) {
        tatLoading();
        getDSSP();
      })
      .catch(function (err) {
        tatLoading();
        console.log(err);
      });
  }
};
window.themSP = themSP;

//Xóa Sản Phẩm

const xoaSP = (id) => {
  batLoading();
  axios({
    url: `${BASE_URL}/phoneshop/${id}`,
    method: "DELETE",
  })
    .then(function (res) {
      tatLoading();
      getDSSP();
    })
    .catch(function (err) {
      tatLoading();
      console.log(err);
    });
};
window.xoaSP = xoaSP;

/// Sửa và cập nhật sinh viên
const showToForm = (id) => {
  removeSpancontent();
  axios({
    url: `${BASE_URL}/phoneshop/${id}`,
    method: "GET",
  })
    .then(function (res) {
      tatLoading();
      showThongTinLenForm(res.data);
    })
    .catch(function (err) {
      tatLoading();
    });
  document.getElementById("themSP-btn").style.display = "none";
  document.getElementById("capNhatSP-btn").style.display = "block";
};
window.showToForm = showToForm;
const capNhatSP = (id) => {
  document.getElementById("capNhatSP-btn").removeAttribute("data-dismiss");
  let newSP = layThongTinTuForm();
  id = newSP.id;
  if (kiemTraValidator()) {
    document
      .getElementById("capNhatSP-btn")
      .setAttribute("data-dismiss", "modal");
    batLoading();
    axios({
      url: `${BASE_URL}/phoneshop/${id}`,
      method: "PUT",
      data: newSP,
    })
      .then(function (res) {
        tatLoading();
        getDSSP();
      })
      .catch(function (err) {
        tatLoading();
        console.log(err);
      });
  }
};
window.capNhatSP = capNhatSP;
