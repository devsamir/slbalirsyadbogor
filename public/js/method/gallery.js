import {
  isLoading,
  clearFields,
  catchAsync,
  generateTable,
  toast,
} from "../utils/helper.js";

import {
  createGallery,
  deleteGallery,
  getAllGallery,
  getOneGallery,
  updateGallery,
} from "../api/galleryApi.js";

(function () {
  const tambahTitle = document.querySelector("#tambah-title");
  const tambahDescription = document.querySelector("#tambah-description");
  const tambahJenis = document.querySelector("#tambah-jenis");
  const tambahFoto = document.querySelector("#tambah-foto");

  const editId = document.querySelector("#edit-id");
  const editTitle = document.querySelector("#edit-title");
  const editDescription = document.querySelector("#edit-description");
  const editJenis = document.querySelector("#edit-jenis");
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

  // Method Untuk Mendapatkan Semua Gallery
  const handleGetGallery = catchAsync(async () => {
    isLoading(true);
    const { data, count } = await getAllGallery(page, search.value);
    const table = generateTable(
      data,
      ["Judul Foto", "Foto", "Jenis", "Pengupload"],
      ["title", "photo", "jenis", "username"],
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
  // Method Untuk Melakukan Request Membuat Gallery Baru
  const handleCreateGallery = catchAsync(async () => {
    isLoading(true);
    await createGallery(
      tambahTitle,
      tambahDescription,
      tambahJenis,
      tambahFoto
    );
    clearFields(...fields);
    $("#modalTambah").modal("hide");
    toast("success", "Berhasil Menambah Data Gallery Baru");
    handleGetGallery();
  });
  // Method Untuk Membuka Modal Lalu Mengisi Input
  const showEditModal = catchAsync(async (id) => {
    isLoading(true);
    const gallery = await getOneGallery(id);
    editId.value = gallery.id;
    editTitle.value = gallery.title;
    editDescription.value = gallery.description;
    editJenis.value = gallery.jenis;
    $("#modalEdit").modal("show");
  });
  // Method Untuk Melakukan Update Gallery
  const handleUpdateGallery = catchAsync(async () => {
    isLoading(true);
    await updateGallery(
      editId,
      editTitle,
      editDescription,
      editJenis,
      editFoto
    );
    clearFields(...fields);
    $("#modalEdit").modal("hide");
    toast("success", "Berhasil Update Data Gallery");
    handleGetGallery();
  });
  // Method Untuk Melakukan Hapus Gallery
  const handleDeleteGallery = catchAsync(async (id) => {
    await deleteGallery(id);
    handleGetGallery();
    toast("success", "Berhasil Delete Gallery");
  });
  const handleShowDelete = async (id) => {
    const cek = await swal({
      icon: "warning",
      title: "Apakah Anda Yakin Hendak Menghapus Data Gallery ?",
      buttons: ["Batal", "Hapus"],
      dangerMode: true,
    });
    if (cek) {
      handleDeleteGallery(id);
    }
  };
  /////////////////////////
  //   Event Listener   //
  ///////////////////////
  btnTambah.addEventListener("click", handleCreateGallery);
  btnUpdate.addEventListener("click", handleUpdateGallery);

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
      handleGetGallery();
    }
    if (e.target.closest("#btnNext")) {
      if (page < maxPage) page += 1;
      handleGetGallery();
    }
  });
  search.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      page = 1;
      handleGetGallery();
    }
  });
  // IIFE (Immediately Invoked Function Expression)
  handleGetGallery();
  document.querySelector("#gallery").classList.add("active-nav");
})();
