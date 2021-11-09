import {
  catchAsync,
  generateTable,
  isLoading,
  toast,
} from "../utils/helper.js";
import { getAllProfil } from "../api/profilApi.js";
(function () {
  const datatable = document.querySelector("#datatable");
  // TABLE ACTIONS
  const action = `<td>
  <button class="btn btn-info" id="btnEdit"><i class="fa fa-pen"></i></button>
  </td>`;
  // Method Untuk Mendapatkan Semua Profil
  const handleGetProfil = catchAsync(async () => {
    isLoading(true);
    const data = await getAllProfil();

    const table = generateTable(
      data,
      ["Halaman", "Isi"],
      ["title", "body"],
      "id",
      action
    );
    datatable.innerHTML = table;
  });

  const handleUpdateProfil = (id) => {
    window.location = `/admin/profil/${id}`;
  };

  // Anon Event Listener
  datatable.addEventListener("click", (e) => {
    if (e.target.closest("#btnEdit")) {
      const id =
        e.target.closest("#btnEdit").parentElement.parentElement.dataset.id;
      handleUpdateProfil(id);
    }
  });
  handleGetProfil();

  document.querySelector("#profil").classList.add("active-nav");
})();
