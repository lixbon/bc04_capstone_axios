import { Item } from "./model.js";
import { validator } from "./validator.admin.js";

export const renderDSSP = (list) => {
  let contentHTML = "";
  list.forEach((item) => {
    let contentTr = `
    <tr>
    <td>${item.id}</td>
    <td>${item.name}</td>
    <td>${item.price}</td>
    <td><img src="${item.img}" alt=""></td>
    <td>${item.desc}</td>
    <td>
    <button class="btn btn-danger" onclick="xoaSP('${item.id}')"> Xóa</button>
    <button class="btn btn-success" onclick="showToForm('${item.id}')" data-toggle="modal"
    data-target="#myModal"> Sửa</button>
    </td>
    </tr>
    `;
    contentHTML += contentTr;
  });
  document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
};
export const layThongTinTuForm = () => {
  const id = document.getElementById("IDSP").value;
  const name = document.getElementById("TenSP").value;
  const price = document.getElementById("GiaSP").value;
  const screen = document.getElementById("screenSP").value;
  const backCamera = document.getElementById("camsauSP").value;
  const frontCamera = document.getElementById("camtruocSP").value;
  const img = document.getElementById("HinhSP").value;
  const desc = document.getElementById("MoTa").value;
  const type = document.getElementById("hangsxSP").value;

  return new Item(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );
};
export const showThongTinLenForm = (sp) => {
  document.getElementById("IDSP").value = sp.id;
  document.getElementById("TenSP").value = sp.name;
  document.getElementById("GiaSP").value = sp.price;
  document.getElementById("screenSP").value = sp.screen;
  document.getElementById("camsauSP").value = sp.backCamera;
  document.getElementById("camtruocSP").value = sp.frontCamera;
  document.getElementById("HinhSP").value = sp.img;
  document.getElementById("MoTa").value = sp.desc;
  document.getElementById("hangsxSP").value = sp.type;
};
export const kiemTraValidator = () => {
  let sanpham = layThongTinTuForm();
  //Kiểm tra ID
  //Kiểm tra tên sản phẩm OK
  let isValidTenSP =
    validator.kiemTraRong(
      sanpham.name,
      "spanName",
      "Tên sản phẩm không được để trống"
    ) &&
    validator.kiemTraDoDai(
      sanpham.name,
      "spanName",
      "Tên phải từ 4 đến 50 ký tự",
      4,
      50
    );
  //Kiểm tra giá sản phẩm OK
  let isValidGiaSP =
    validator.kiemTraRong(
      sanpham.price,
      "spanPrice",
      "Giá sản phẩm không được để trống"
    ) &&
    validator.kiemTraSo(sanpham.price, "spanPrice", "Giá phải là số") &&
    validator.kiemTraDoLon(
      sanpham.price,
      "spanPrice",
      "Giá sản phẩm không được nhỏ hơn 10$",
      10
    );
  //Kiểm tra type sản phẩm OK
  let isValidType = validator.kiemTraHangSX(
    sanpham.type,
    "spanType",
    "Hãng sản xuất chưa được chọn"
  );
  //Kiểm tra kích thước màn hình sản phẩm OK
  let isValidScreen = validator.kiemTraRong(
    sanpham.screen,
    "spanScreen",
    "Kích thước màn hìnhkhông được để trống"
  );
  //Kiểm tra cam sau OK
  let isValidbackCam = validator.kiemTraRong(
    sanpham.backCamera,
    "spanbackCamera",
    "Độ phân giải Camera sau không được để trống"
  );
  //Kiểm tra cam trước OK
  let isValidfrontCam = validator.kiemTraRong(
    sanpham.frontCamera,
    "spanfrontCamera",
    "Độ phân giải Camera trước không được để trống"
  );
  //Kiểm tra mô tả OK
  let isValidDesc =
    validator.kiemTraRong(
      sanpham.desc,
      "spandesc",
      "Mô tả sản phẩm không được để trống"
    ) &&
    validator.kiemTraDoDai(
      sanpham.desc,
      "spandesc",
      "Mô tả phải từ 10 đến 200 ký tự",
      10,
      200
    );
  //Kiểm tra link hình ảnh
  let isValidImg = validator.kiemTraRong(
    sanpham.img,
    "spanimg",
    "Link hình ảnh sản phẩm không được để trống"
  );
  //End
  // Kiểm tra toàn bộ
  let isValid =
    isValidTenSP &
    isValidGiaSP &
    isValidScreen &
    isValidbackCam &
    isValidfrontCam &
    isValidDesc &
    isValidImg &
    isValidType;
  return isValid;
};
export const removeSpancontent = () => {
  document.getElementById("spanName").innerText = "";
  document.getElementById("spanPrice").innerText = "";
  document.getElementById("spanimg").innerText = "";
  document.getElementById("spandesc").innerText = "";
  document.getElementById("spanfrontCamera").innerText = "";
  document.getElementById("spanbackCamera").innerText = "";
  document.getElementById("spanScreen").innerText = "";
  document.getElementById("spanType").innerText = "";
};
