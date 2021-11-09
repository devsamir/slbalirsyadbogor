import {
  catchAsync,
  generateTable,
  isLoading,
  toast,
} from "../utils/helper.js";
import { getAllHalaman } from "../api/halamanApi.js";
(function () {
  const datatable = document.querySelector("#datatable");
  // TABLE ACTIONS
  const action = `<td>
    <button class="btn btn-info" id="btnEdit"><i class="fa fa-pen"></i></button>
    </td>`;
  // Method Untuk Mendapatkan Semua Halaman
  const handleGetHalaman = catchAsync(async () => {
    isLoading(true);
    const data = await getAllHalaman();

    const table = generateTable(
      data,
      ["Halaman", "Foto", "Isi"],
      ["halaman", "foto", "body"],
      "id",
      action
    );
    datatable.innerHTML = table;
  });

  const handleUpdateHalaman = (id) => {
    window.location = `/admin/halaman/${id}`;
  };

  // Anon Event Listener
  datatable.addEventListener("click", (e) => {
    if (e.target.closest("#btnEdit")) {
      const id =
        e.target.closest("#btnEdit").parentElement.parentElement.dataset.id;
      handleUpdateHalaman(id);
    }
  });
  handleGetHalaman();

  document.querySelector("#halaman").classList.add("active-nav");
})();
