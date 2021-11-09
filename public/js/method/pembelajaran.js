import {
  isLoading,
  clearFields,
  catchAsync,
  generateTable,
  toast,
} from "../utils/helper.js";
import {
  createPembelajaran,
  deletePembelajaran,
  getAllPembelajaran,
  getOnePembelajaran,
  updatePembelajaran,
} from "../api/pembelajaranApi.js";

(function () {
  const tambahJudul = document.querySelector("#tambah-judul");
  const tambahPelajaran = document.querySelector("#tambah-pelajaran");
  const tambahTanggal = document.querySelector("#tambah-tanggal");
  const tambahLink = document.querySelector("#tambah-link");
  const tambahDeskripsi = document.querySelector("#tambah-deskripsi");

  const editId = document.querySelector("#edit-id");
  const editJudul = document.querySelector("#edit-judul");
  const editPelajaran = document.querySelector("#edit-pelajaran");
  const editTanggal = document.querySelector("#edit-tanggal");
  const editLink = document.querySelector("#edit-link");
  const editDeskripsi = document.querySelector("#edit-deskripsi");

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
  // Method Untuk Mendapatkan Semua Pembelajaran
  const handleGetPembelajaran = catchAsync(async () => {
    isLoading(true);
    const { data, count } = await getAllPembelajaran(page, search.value);
    const table = generateTable(
      data,
      ["Judul", "Pelajaran", "Tanggal", "ID Video Youtube"],
      ["judul", "pelajaran", "tanggal", "link"],
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
  // Method Untuk Melakukan Request Membuat Pembelajaran Baru
  const handleCreatePembelajaran = catchAsync(async () => {
    isLoading(true);
    await createPembelajaran(
      tambahJudul,
      tambahPelajaran,
      tambahTanggal,
      tambahLink,
      tambahDeskripsi
    );
    clearFields(
      tambahJudul,
      tambahPelajaran,
      tambahTanggal,
      tambahLink,
      tambahDeskripsi
    );
    $("#modalTambah").modal("hide");
    toast("success", "Berhasil Menambah Data Pembelajaran Baru");
    handleGetPembelajaran();
  });
  // Method Untuk Membuka Modal Lalu Mengisi Input
  const showEditModal = catchAsync(async (id) => {
    isLoading(true);
    const pembelajaran = await getOnePembelajaran(id);
    editId.value = pembelajaran.id;
    editJudul.value = pembelajaran.judul;
    editPelajaran.value = pembelajaran.pelajaran;
    editTanggal.value = pembelajaran.tanggal;
    editDeskripsi.value = pembelajaran.description;
    editLink.value = pembelajaran.link;

    $("#modalEdit").modal("show");
  });
  // Method Untuk Melakukan Update Pembelajaran
  const handleUpdatePembelajaran = catchAsync(async () => {
    isLoading(true);
    await updatePembelajaran(
      editId,
      editJudul,
      editPelajaran,
      editTanggal,
      editLink,
      editDeskripsi
    );
    clearFields(
      editId,
      editJudul,
      editPelajaran,
      editTanggal,
      editLink,
      editDeskripsi
    );
    $("#modalEdit").modal("hide");
    toast("success", "Berhasil Update Pembelajaran");
    handleGetPembelajaran();
  });
  // Method Untuk Melakukan Hapus Pembelajaran
  const handleDeletePembelajaran = catchAsync(async (id) => {
    await deletePembelajaran(id);
    handleGetPembelajaran();
    toast("success", "Berhasil Delete Pembelajaran");
  });
  const handleShowDelete = async (id) => {
    const cek = await swal({
      icon: "warning",
      title: "Apakah Anda Yakin Hendak Menghapus Data Pembelajaran ?",
      buttons: ["Batal", "Hapus"],
      dangerMode: true,
    });
    if (cek) {
      handleDeletePembelajaran(id);
    }
  };
  /////////////////////////
  //   Event Listener   //
  ///////////////////////
  btnTambah.addEventListener("click", handleCreatePembelajaran);
  btnUpdate.addEventListener("click", handleUpdatePembelajaran);

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
      handleGetPembelajaran();
    }
    if (e.target.closest("#btnNext")) {
      if (page < maxPage) page += 1;
      handleGetPembelajaran();
    }
  });
  search.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      page = 1;
      handleGetPembelajaran();
    }
  });

  // IIFE (Immediately Invoked Function Expression)
  handleGetPembelajaran();
  document.querySelector("#pembelajaran").classList.add("active-nav");
})();
