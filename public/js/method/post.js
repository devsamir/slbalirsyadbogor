import {
  catchAsync,
  generateTable,
  isLoading,
  toast,
} from "../utils/helper.js";
import { getAllPost, deletePost } from "../api/postApi.js";
(function () {
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
  const handleGetPost = catchAsync(async () => {
    isLoading(true);
    const { data, count } = await getAllPost(page, search.value);
    const table = generateTable(
      data,
      ["Judul Artikel", "Thumbnail", "Viewer", "Status", "Penulis", "Jenis"],
      ["title", "thumbnail", "viewer", "status", "username", "jenis"],
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

  // Method Untuk Melakukan Hapus Post
  const handleDeletePost = catchAsync(async (id) => {
    await deletePost(id);
    handleGetPost();
    toast("success", "Berhasil Delete Post");
  });
  const handleShowDelete = async (id) => {
    const cek = await swal({
      icon: "warning",
      title: "Apakah Anda Yakin Hendak Menghapus Post ?",
      buttons: ["Batal", "Hapus"],
      dangerMode: true,
    });
    if (cek) {
      handleDeletePost(id);
    }
  };
  datatable.addEventListener("click", (e) => {
    if (e.target.closest("#btnEdit")) {
      const id =
        e.target.closest("#btnEdit").parentElement.parentElement.dataset.id;
      window.location.replace(`/admin/post/update/${id}`);
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
      handleGetPost();
    }
    if (e.target.closest("#btnNext")) {
      console.log("asu");
      if (page < maxPage) page += 1;
      handleGetPost();
    }
  });
  search.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      page = 1;
      handleGetPost();
    }
  });

  document.querySelector("#post").classList.add("active-nav");
  handleGetPost();
})();
