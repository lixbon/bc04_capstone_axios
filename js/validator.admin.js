export let validator = {
  kiemTraRong: function (value, idError, message) {
    if (value.length == 0) {
      document.getElementById(idError).innerText = message;
      return false;
    } else {
      document.getElementById(idError).innerText = "";
      return true;
    }
  },
  kiemTraDoDai: function (value, idError, message, min, max) {
    if (value.length < min || value.length > max) {
      document.getElementById(idError).innerText = message;
      return false;
    } else {
      document.getElementById(idError).innerText = "";
      return true;
    }
  },
  kiemTraDoLon: function (value, idError, message, min) {
    if (value < min) {
      document.getElementById(idError).innerText = message;
      return false;
    } else {
      document.getElementById(idError).innerText = "";
      return true;
    }
  },
  kiemTraSo: function (value, idError, message) {
    if (Number.isFinite(value * 1)) {
      document.getElementById(idError).innerText = "";
      return true;
    } else {
      document.getElementById(idError).innerText = message;
      return false;
    }
  },
  kiemTraHangSX: function (value, idError, message) {
    if (value == "0") {
      document.getElementById(idError).innerText = message;
      return false;
    } else {
      document.getElementById(idError).innerText = "";
      return true;
    }
  },
};
