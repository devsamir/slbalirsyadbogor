import {
  isLoading,
  clearFields,
  catchAsync,
  generateTable,
  toast,
} from "../utils/helper.js";
import {
  createExtra,
  deleteExtra,
  getAllExtra,
  getOneExtra,
  updateExtra,
} from "../api/extraApi.js";
(function () {
  const tambahNama = document.querySelector("#tambah-nama");
  const tambahDescription = document.querySelector("#tambah-description");
  const tambahFoto = document.querySelector("#tambah-foto");

  const editId = document.querySelector("#edit-id");
  const editNama = document.querySelector("#edit-nama");
  const editDescription = document.querySelector("#edit-description");
  const editFoto = document.querySelector("#edit-foto");
  // TABLE ACTIONS
  const fields = document.querySelectorAll(".form-control");
  const btnTambah = document.querySelector("#btnTambah");
  const btnUpdate = document.querySelector("#btnUpdate");
  const datatable = document.querySelector("#datatable");
  const search = document.querySelector("#search");
  const pageUi = document.querySelector("#page");

  const action = `<td>
  <button class="btn btn-info" id="btnEdit"><i class="fa fa-pen"></i></button>
  <button class="btn btn-danger" id="btnDelete"><i class="fa fa-trash"></i></button>
  </td>`;

  let page = 1;
  let maxPage = 1;
  let row = 0;

  // Method Untuk Mendapatkan Semua Extracurriculer
  const handleGetExtra = catchAsync(async () => {
    isLoading(true);
    const { data, count } = await getAllExtra(page, search.value);
    const table = generateTable(
      data,
      ["Nama Ekstrakulikuler", "Foto"],
      ["nameExtracurricular", "thumbnail"],
      "id",
      action
    );
    datatable.innerHTML = table;
    maxPage = Math.ceil(count / 10);
    row = count;
    pageUi.innerHTML = `${page} / ${maxPage} Page (Total ${row} Data)`;
    if (page > 1) {
      document.querySelector("#btnBefore").classList.remove("hidden");
    } else {
      document.querySelector("#btnBefore").classList.add("hidden");
    }
    if (page < maxPage) {
      document.querySelector("#btnNext").classList.remove("hidden");
    } else {
      document.querySelector("#btnNext").classList.add("hidden");
    }
  });
  // Method Untuk Melakukan Request Membuat Extra Baru
  const handleCreateExtra = catchAsync(async () => {
    isLoading(true);
    await createExtra(tambahNama, tambahDescription, tambahFoto);
    clearFields(...fields);
    $("#modalTambah").modal("hide");
    toast("success", "Berhasil Menambah Data Ekstrakulikuler Baru");
    handleGetExtra();
  });
  // Method Untuk Membuka Modal Lalu Mengisi Input
  const showEditModal = catchAsync(async (id) => {
    isLoading(true);
    const extra = await getOneExtra(id);
    editId.value = extra.id;
    editNama.value = extra.nameExtracurricular;
    editDescription.value = extra.description;
    $("#modalEdit").modal("show");
  }); // Method Untuk Melakukan Update Extra
  const handleUpdateExtra = catchAsync(async () => {
    isLoading(true);
    await updateExtra(editId, editNama, editDescription, editFoto);
    clearFields(...fields);
    $("#modalEdit").modal("hide");
    toast("success", "Berhasil Update Data Ekstrakulikuler");
    handleGetExtra();
  });
  // Method Untuk Melakukan Hapus Extra
  const handleDeleteExtra = catchAsync(async (id) => {
    await deleteExtra(id);
    handleGetExtra();
    toast("success", "Berhasil Delete Ekstrakulikuler");
  });
  const handleShowDelete = async (id) => {
    const cek = await swal({
      icon: "warning",
      title: "Apakah Anda Yakin Hendak Menghapus Data Ekstrakulikuler ?",
      buttons: ["Batal", "Hapus"],
      dangerMode: true,
    });
    if (cek) {
      handleDeleteExtra(id);
    }
  };
  /////////////////////////
  //   Event Listener   //
  ///////////////////////
  btnTambah.addEventListener("click", handleCreateExtra);
  btnUpdate.addEventListener("click", handleUpdateExtra);

  datatable.addEventListener("click", (e) => {
    if (e.target.closest("#btnEdit")) {
      const id =
        e.target.closest("#btnEdit").parentElement.parentElement.dataset.id;
      showEditModal(id);
    }
    if (e.target.closest("#btnDelete")) {
      const id =
        e.target.closest("#btnDelete").parentElement.parentElement.dataset.id;
      handleShowDelete(id);
    }
  });
  document.querySelector(".pagination").addEventListener("click", (e) => {
    if (e.target.closest("#btnBefore")) {
      if (page > 1) page -= 1;
      handleGetExtra();
    }
    if (e.target.closest("#btnNext")) {
      if (page < maxPage) page += 1;
      handleGetExtra();
    }
  });
  search.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      page = 1;
      handleGetExtra();
    }
  });
  // IIFE (Immediately Invoked Function Expression)
  handleGetExtra();
  document.querySelector("#extra").classList.add("active-nav");
})();
