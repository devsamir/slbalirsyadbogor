import {
  isLoading,
  clearFields,
  catchAsync,
  generateTable,
  toast,
} from "../utils/helper.js";
import {
  createAgenda,
  deleteAgenda,
  getAllAgenda,
  getOneAgenda,
  updateAgenda,
} from "../api/agendaApi.js";

(function () {
  const tambahTanggal = document.querySelector("#tambah-tanggal");
  const tambahAcara = document.querySelector("#tambah-acara");
  const tambahKegiatan = document.querySelector("#tambah-kegiatan");

  const editId = document.querySelector("#edit-id");
  const editTanggal = document.querySelector("#edit-tanggal");
  const editAcara = document.querySelector("#edit-acara");
  const editKegiatan = document.querySelector("#edit-kegiatan");

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
  const handleGetAgenda = catchAsync(async () => {
    isLoading(true);
    const { data, count } = await getAllAgenda(page, search.value);
    const table = generateTable(
      data,
      ["Acara", "Tanggal"],
      ["acara", "tanggal"],
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
  // Method Untuk Melakukan Request Membuat Agenda Baru
  const handleCreateAgenda = catchAsync(async () => {
    isLoading(true);
    await createAgenda(tambahTanggal, tambahAcara, tambahKegiatan);
    clearFields(tambahTanggal, tambahAcara, tambahKegiatan);
    $("#modalTambah").modal("hide");
    toast("success", "Berhasil Menambah Data Agenda Baru");
    handleGetAgenda();
  });
  // Method Untuk Membuka Modal Lalu Mengisi Input
  const showEditModal = catchAsync(async (id) => {
    isLoading(true);
    const agenda = await getOneAgenda(id);
    editId.value = agenda.id;
    editTanggal.value = agenda.tanggal;
    editAcara.value = agenda.acara;
    editKegiatan.value = agenda.kegiatan;
    $("#modalEdit").modal("show");
  });
  // Method Untuk Melakukan Update Agenda
  const handleUpdateAgenda = catchAsync(async () => {
    isLoading(true);
    await updateAgenda(editId, editTanggal, editAcara, editKegiatan);
    clearFields(editId, editTanggal, editAcara, editKegiatan);
    $("#modalEdit").modal("hide");
    toast("success", "Berhasil Update Agenda");
    handleGetAgenda();
  });
  // Method Untuk Melakukan Hapus Agenda
  const handleDeleteAgenda = catchAsync(async (id) => {
    await deleteAgenda(id);
    handleGetAgenda();
    toast("success", "Berhasil Delete Agenda");
  });
  const handleShowDelete = async (id) => {
    const cek = await swal({
      icon: "warning",
      title: "Apakah Anda Yakin Hendak Menghapus Data Agenda ?",
      buttons: ["Batal", "Hapus"],
      dangerMode: true,
    });
    if (cek) {
      handleDeleteAgenda(id);
    }
  };
  /////////////////////////
  //   Event Listener   //
  ///////////////////////
  btnTambah.addEventListener("click", handleCreateAgenda);
  btnUpdate.addEventListener("click", handleUpdateAgenda);

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
      handleGetAgenda();
    }
    if (e.target.closest("#btnNext")) {
      if (page < maxPage) page += 1;
      handleGetAgenda();
    }
  });
  search.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      page = 1;
      handleGetAgenda();
    }
  });

  // IIFE (Immediately Invoked Function Expression)
  handleGetAgenda();
  document.querySelector("#agenda").classList.add("active-nav");
})();
