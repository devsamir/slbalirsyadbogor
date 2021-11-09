import {
  isLoading,
  clearFields,
  catchAsync,
  generateTable,
  toast,
} from "../utils/helper.js";
import {
  createPrestasi,
  deletePrestasi,
  getAllPrestasi,
  getOnePrestasi,
  updatePrestasi,
} from "../api/prestasiApi.js";

(function () {
  const tambahPrestasi = document.querySelector("#tambah-prestasi");
  const tambahFoto = document.querySelector("#tambah-foto");

  const editId = document.querySelector("#edit-id");
  const editPrestasi = document.querySelector("#edit-prestasi");
  const editFoto = document.querySelector("#edit-foto");

  const btnTambah = document.querySelector("#btnTambah");
  const btnUpdate = document.querySelector("#btnUpdate");
  const datatable = document.querySelector("#datatable");
  const search = document.querySelector("#search");
  const pageUi = document.querySelector("#page");

  // TABLE ACTIONS
  const action = `<td>
    <button class="btn btn-info" id="btnEdit"><i class="fa fa-pen"></i></button>
    <button class="btn btn-danger" id="btnDelete"><i class="fa fa-trash"></i></button>
    </td>`;
  let page = 1;
  let maxPage = 1;
  let row = 0;
  // Method Untuk Mendapatkan Semua Guru
  const handleGetPrestasi = catchAsync(async () => {
    isLoading(true);
    const { data, count } = await getAllPrestasi(page, search.value);
    const table = generateTable(
      data,
      ["Prestasi", "Foto"],
      ["prestasi", "foto"],
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
  // Method Untuk Melakukan Request Membuat Prestasi Baru
  const handleCreatePrestasi = catchAsync(async () => {
    isLoading(true);
    await createPrestasi(tambahPrestasi, tambahFoto);
    clearFields(tambahPrestasi, tambahFoto);
    $("#modalTambah").modal("hide");
    toast("success", "Berhasil Menambah Data Prestasi Baru");
    handleGetPrestasi();
  });
  // Method Untuk Membuka Modal Lalu Mengisi Input
  const showEditModal = catchAsync(async (id) => {
    isLoading(true);
    const prestasi = await getOnePrestasi(id);
    editId.value = prestasi.id;
    editPrestasi.value = prestasi.prestasi;
    $("#modalEdit").modal("show");
  });
  // Method Untuk Melakukan Update Prestasi
  const handleUpdatePrestasi = catchAsync(async () => {
    isLoading(true);
    await updatePrestasi(editId.value, editPrestasi, editFoto);
    clearFields(editId, editPrestasi, editFoto);
    $("#modalEdit").modal("hide");
    toast("success", "Berhasil Update Prestasi");
    handleGetPrestasi();
  });
  // Method Untuk Melakukan Hapus Prestasi
  const handleDeletePrestasi = catchAsync(async (id) => {
    await deletePrestasi(id);
    handleGetPrestasi();
    toast("success", "Berhasil Delete Prestasi");
  });
  const handleShowDelete = async (id) => {
    const cek = await swal({
      icon: "warning",
      title: "Apakah Anda Yakin Hendak Menghapus Data Prestasi ?",
      buttons: ["Batal", "Hapus"],
      dangerMode: true,
    });
    if (cek) {
      handleDeletePrestasi(id);
    }
  };
  /////////////////////////
  //   Event Listener   //
  ///////////////////////
  btnTambah.addEventListener("click", handleCreatePrestasi);
  btnUpdate.addEventListener("click", handleUpdatePrestasi);

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
      handleGetPrestasi();
    }
    if (e.target.closest("#btnNext")) {
      if (page < maxPage) page += 1;
      handleGetPrestasi();
    }
  });
  search.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      page = 1;
      handleGetPrestasi();
    }
  });

  // IIFE (Immediately Invoked Function Expression)
  handleGetPrestasi();
  document.querySelector("#prestasi").classList.add("active-nav");
})();
