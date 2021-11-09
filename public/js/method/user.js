import {
  isLoading,
  clearFields,
  catchAsync,
  generateTable,
  toast,
} from "../utils/helper.js";
import {
  createUser,
  deleteUser,
  getAllUser,
  updateUser,
} from "../api/userApi.js";

(function () {
  // TAMBAH
  const tambahUsername = document.querySelector("#tambah-username");
  const tambahPassword = document.querySelector("#tambah-password");
  const tambahRepassword = document.querySelector("#tambah-repassword");
  const tambahEmail = document.querySelector("#tambah-email");
  // EDIT

  const editId = document.querySelector("#edit-id");
  const editUsername = document.querySelector("#edit-username");
  const editOldPassword = document.querySelector("#edit-oldPassword");
  const editPassword = document.querySelector("#edit-password");
  const editRepassword = document.querySelector("#edit-repassword");
  const editEmail = document.querySelector("#edit-email");

  const fields = document.querySelectorAll(".form-control");
  const btnTambah = document.querySelector("#btnTambah");
  const btnUpdate = document.querySelector("#btnUpdate");
  const datatable = document.querySelector("#datatable");

  // TABLE ACTIONS
  const action = `<td>
  <button class="btn btn-info" id="btnEdit"><i class="fa fa-pen"></i></button>
  <button class="btn btn-danger" id="btnDelete"><i class="fa fa-trash"></i></button>
  </td>`;
  // Method Untuk Mendapatkan Semua User
  const handleGetUser = catchAsync(async () => {
    isLoading(true);
    const data = await getAllUser();

    const table = generateTable(
      data,
      ["Username", "Email"],
      ["username", "email"],
      "id",
      action
    );
    datatable.innerHTML = table;
  });
  // Method Untuk Melakukan Request Membuat User Baru
  const handleCreateUser = catchAsync(async () => {
    isLoading(true);
    await createUser(
      tambahUsername,
      tambahPassword,
      tambahRepassword,
      tambahEmail
    );
    clearFields(...fields);
    $("#modalTambah").modal("hide");
    toast("success", "Berhasil Menambah User Baru");
    handleGetUser();
  });
  // Method Untuk Membuka Modal Lalu Mengisi Input
  const showEditModal = catchAsync(async (id) => {
    isLoading(true);
    const data = await getAllUser();
    const user = data.find((item) => item.id == id);
    editId.value = user.id;
    editUsername.value = user.username;
    editEmail.value = user.email;
    $("#modalEdit").modal("show");
  });
  // Method Untuk Melakukan Update User
  const handleUpdateUser = catchAsync(async () => {
    isLoading(true);
    await updateUser(
      editId,
      editUsername,
      editOldPassword,
      editPassword,
      editRepassword,
      editEmail
    );
    clearFields(...fields);
    $("#modalEdit").modal("hide");
    toast("success", "Berhasil Update User Baru");
    handleGetUser();
  });
  // Method Untuk Melakukan Hapus User
  const handleDeleteUser = catchAsync(async (id) => {
    await deleteUser(id);
    handleGetUser();
  });
  // Method Untuk Menampilkan Dialog Confirm Delete
  const handleShowDelete = async (id) => {
    const cek = await swal({
      icon: "warning",
      title: "Apakah Anda Yakin Hendak Menghapus Data User ?",
      buttons: ["Batal", "Hapus"],
      dangerMode: true,
    });
    if (cek) {
      handleDeleteUser(id);
    }
  };
  /////////////////////////
  //   Event Listener   //
  ///////////////////////
  btnTambah.addEventListener("click", handleCreateUser);
  btnUpdate.addEventListener("click", handleUpdateUser);

  // Anon Event Listener
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
  // IIFE (Immediately Invoked Function Expression)
  handleGetUser();

  document.querySelector("#user").classList.add("active-nav");
})();
