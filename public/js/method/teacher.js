import {
  isLoading,
  clearFields,
  catchAsync,
  generateTable,
  toast,
} from "../utils/helper.js";
import {
  createTeacher,
  deleteTeacher,
  getAllTeacher,
  getOneTeacher,
  updateTeacher,
} from "../api/teacherApi.js";

(function () {
  const tambahNama = document.querySelector("#tambah-nama");
  const tambahNuptk = document.querySelector("#tambah-nuptk");
  const tambahKelamin = document.querySelector("#tambah-kelamin");
  const tambahJabatan = document.querySelector("#tambah-jabatan");
  const tambahPelajaran = document.querySelector("#tambah-pelajaran");
  const tambahFoto = document.querySelector("#tambah-foto");

  const editId = document.querySelector("#edit-id");
  const editNama = document.querySelector("#edit-nama");
  const editNuptk = document.querySelector("#edit-nuptk");
  const editKelamin = document.querySelector("#edit-kelamin");
  const editJabatan = document.querySelector("#edit-jabatan");
  const editPelajaran = document.querySelector("#edit-pelajaran");
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
  const handleGetTeacher = catchAsync(async () => {
    isLoading(true);
    const { data, count } = await getAllTeacher(page, search.value);
    const table = generateTable(
      data,
      ["Nama Guru", "NUPTK", "JK", "Jabatan", "Pelajaran", "Foto"],
      ["fullName", "nuptk", "kelamin", "jabatan", "pelajaran", "photo"],
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
  // Method Untuk Melakukan Request Membuat Teacher Baru
  const handleCreateTeacher = catchAsync(async () => {
    isLoading(true);
    await createTeacher(
      tambahNama,
      tambahNuptk,
      tambahKelamin,
      tambahJabatan,
      tambahPelajaran,
      tambahFoto
    );
    clearFields(
      tambahNama,
      tambahNuptk,
      tambahKelamin,
      tambahJabatan,
      tambahPelajaran,
      tambahFoto
    );
    $("#modalTambah").modal("hide");
    toast("success", "Berhasil Menambah Data Guru Baru");
    handleGetTeacher();
  });
  // Method Untuk Membuka Modal Lalu Mengisi Input
  const showEditModal = catchAsync(async (id) => {
    isLoading(true);
    const teacher = await getOneTeacher(id);
    editId.value = teacher.id;
    editNama.value = teacher.fullName;
    editNuptk.value = teacher.nuptk;
    editKelamin.value = teacher.kelamin;
    editJabatan.value = teacher.jabatan;
    editPelajaran.value = teacher.pelajaran;
    $("#modalEdit").modal("show");
  });
  // Method Untuk Melakukan Update Teacher
  const handleUpdateTeacher = catchAsync(async () => {
    isLoading(true);
    await updateTeacher(
      editId,
      editNama,
      editNuptk,
      editKelamin,
      editJabatan,
      editPelajaran,
      editFoto
    );
    clearFields(
      editId,
      editNama,
      editNuptk,
      editKelamin,
      editJabatan,
      editPelajaran,
      editFoto
    );
    $("#modalEdit").modal("hide");
    toast("success", "Berhasil Update Guru");
    handleGetTeacher();
  });
  // Method Untuk Melakukan Hapus Teacher
  const handleDeleteTeacher = catchAsync(async (id) => {
    await deleteTeacher(id);
    handleGetTeacher();
    toast("success", "Berhasil Delete Guru");
  });
  const handleShowDelete = async (id) => {
    const cek = await swal({
      icon: "warning",
      title: "Apakah Anda Yakin Hendak Menghapus Data Guru ?",
      buttons: ["Batal", "Hapus"],
      dangerMode: true,
    });
    if (cek) {
      handleDeleteTeacher(id);
    }
  };
  /////////////////////////
  //   Event Listener   //
  ///////////////////////
  btnTambah.addEventListener("click", handleCreateTeacher);
  btnUpdate.addEventListener("click", handleUpdateTeacher);

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
      handleGetTeacher();
    }
    if (e.target.closest("#btnNext")) {
      if (page < maxPage) page += 1;
      handleGetTeacher();
    }
  });
  search.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      page = 1;
      handleGetTeacher();
    }
  });

  // IIFE (Immediately Invoked Function Expression)
  handleGetTeacher();
  document.querySelector("#teacher").classList.add("active-nav");
})();
