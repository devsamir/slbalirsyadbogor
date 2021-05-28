const generateTable = (data, header, body, id, action) => {
  let row = `<table class="table table-bordered table-hover" id="datatable">
                      <thead>
                          <tr>`;
  header.forEach((item) => (row += `<th>${item}</th>`));
  row += `<th>Action</th></tr></thead><tbody>`;
  data.forEach((item) => {
    row += `<tr data-id='${item[id]}'>`;
    body.forEach((col) => {
      if (col === "avatar") {
        row += `<td><img src="/${item[col]}" alt="avatar" style="height:120px" /></td>`;
      } else {
        row += `<td>${item[col]}</td>`;
      }
    });
    row += action;
    row += `</tr>`;
  });
  row += `</body></table>`;
  return row;
};
const generateTableSpecial = (data, header, body, id) => {
  let row = `<table class="table table-bordered table-hover" id="datatable">
                      <thead>
                          <tr>`;
  header.forEach((item) => (row += `<th>${item}</th>`));
  row += `<th>Action</th></tr></thead><tbody>`;
  data.forEach((item) => {
    row += `<tr data-id='${item[id]}'>`;
    body.forEach((col) => (row += `<td>${item[col]}</td>`));
    if (item.terlayani === "belum") {
      row += `<td style="display:flex;justify-content:center"><button class="btn btn-success" id="btn-status"><i class="fa fa-check"></i></button></td>`;
    } else if (item.terlayani === "sudah") {
      row += `<td style="display:flex;justify-content:center"><button class="btn btn-link text-danger" id="btn-status">belum</button></td>`;
    }
    row += `</tr>`;
  });
  row += `</body></table>`;
  return row;
};
const toast = (variant, message) => {
  toastr[variant](message);

  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: true,
    progressBar: true,
    positionClass: "toast-top-right",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };
};
const isLoading = (status) => {
  const loading = document.querySelector(".loading-container");
  if (status) {
    loading.classList.remove("none");
  } else {
    loading.classList.add("none");
  }
};
const isFieldsEmpty = (...fields) => {
  return fields.reduce((acc, curr) => {
    if (!curr.value.trim()) acc = true;
    return acc;
  }, false);
};
const clearFields = (...fields) => {
  fields.forEach((field) => (field.value = ""));
};
const getFieldsValue = (fields, keys) => {
  return keys.reduce((acc, curr, index) => {
    acc[curr] = fields[index].value.trim();
    return acc;
  }, {});
};
const catchAsync = (fn) => {
  return async (...params) => {
    try {
      await fn(...params);
    } catch (err) {
      let error = err?.response?.data?.message || err.message;
      toast("error", error);
      console.log(err);
    } finally {
      isLoading(false);
    }
  };
};
const getDayNow = () => {
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let day = new Date().getDate();
  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${day}`;
  return `${year}-${month}-${day}`;
};

export {
  generateTable,
  isLoading,
  isFieldsEmpty,
  clearFields,
  getFieldsValue,
  catchAsync,
  getDayNow,
  generateTableSpecial,
  toast,
};
