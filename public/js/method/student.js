import {
  isLoading,
  clearFields,
  catchAsync,
  generateTable,
  toast,
} from "../utils/helper.js";
import {
  createStudent,
  deleteStudent,
  getAllStudent,
  getOneStudent,
  updateStudent,
} from "../api/studentApi.js";

(function () {
  const tambahNisn = document.querySelector("#tambah-nisn");
  const tambahNama = document.querySelector("#tambah-nama");
  const tambahKebutuhan = document.querySelector("#tambah-kebutuhan");

  const editId = document.querySelector("#edit-id");
  const editNisn = document.querySelector("#edit-nisn");
  const editNama = document.querySelector("#edit-nama");
  const editKebutuhan = document.querySelector("#edit-kebutuhan");

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
  // Method Untuk Mendapatkan Semua Siswa
  const handleGetStudent = catchAsync(async () => {
    isLoading(true);
    const { data, count } = await getAllStudent(page, search.value);
    const table = generateTable(
      data,
      ["NISN", "Nama Siswa", "Kebutuhan Khusus"],
      ["nisn", "nama", "kebutuhan"],
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
  // Method Untuk Melakukan Request Membuat Student Baru
  const handleCreateStudent = catchAsync(async () => {
    isLoading(true);
    await createStudent(tambahNisn, tambahNama, tambahKebutuhan);
    clearFields(tambahNisn, tambahNama, tambahKebutuhan);
    $("#modalTambah").modal("hide");
    toast("success", "Berhasil Menambah Data Siswa Baru");
    handleGetStudent();
  });
  // Method Untuk Membuka Modal Lalu Mengisi Input
  const showEditModal = catchAsync(async (id) => {
    isLoading(true);
    const student = await getOneStudent(id);
    editId.value = student.id;
    editNisn.value = student.nisn;
    editNama.value = student.nama;
    editKebutuhan.value = student.kebutuhan;
    $("#modalEdit").modal("show");
  });
  // Method Untuk Melakukan Update Student
  const handleUpdateStudent = catchAsync(async () => {
    isLoading(true);
    await updateStudent(editId, editNisn, editNama, editKebutuhan);
    clearFields(editId, editNisn, editNama, editKebutuhan);
    $("#modalEdit").modal("hide");
    toast("success", "Berhasil Update Siswa");
    handleGetStudent();
  });
  // Method Untuk Melakukan Hapus Student
  const handleDeleteStudent = catchAsync(async (id) => {
    await deleteStudent(id);
    handleGetStudent();
    toast("success", "Berhasil Delete Siswa");
  });
  const handleShowDelete = async (id) => {
    const cek = await swal({
      icon: "warning",
      title: "Apakah Anda Yakin Hendak Menghapus Data Siswa ?",
      buttons: ["Batal", "Hapus"],
      dangerMode: true,
    });
    if (cek) {
      handleDeleteStudent(id);
    }
  };
  /////////////////////////
  //   Event Listener   //
  ///////////////////////
  btnTambah.addEventListener("click", handleCreateStudent);
  btnUpdate.addEventListener("click", handleUpdateStudent);

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
      handleGetStudent();
    }
    if (e.target.closest("#btnNext")) {
      if (page < maxPage) page += 1;
      handleGetStudent();
    }
  });
  search.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      page = 1;
      handleGetStudent();
    }
  });

  // IIFE (Immediately Invoked Function Expression)
  handleGetStudent();
  document.querySelector("#student").classList.add("active-nav");
})();
