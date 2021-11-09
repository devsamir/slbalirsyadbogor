import {
  getAllLanding,
  updateLanding,
  updateLandingImage,
} from "../api/landingApi.js";
import { catchAsync, clearFields, isLoading, toast } from "../utils/helper.js";

(function () {
  const editIdImage1 = document.querySelector("#editIdImage1");
  const editFotoImage1 = document.querySelector("#editFotoImage1");
  const editId1 = document.querySelector("#editId1");
  const editKeterangan1 = document.querySelector("#editKeterangan1");
  const editId2 = document.querySelector("#editId2");
  const editTitle2 = document.querySelector("#editTitle2");
  const editKeterangan2 = document.querySelector("#editKeterangan2");

  const generateTableObj = (profil) => {
    const keys = ["background judul", "judul website"];
    let table = `<tr data-id='${keys[0]}'>
                        <td>${profil[keys[0]].id}</td>
                        <td><img src="/${
                          profil[keys[0]].keterangan1
                        }" alt="gambar" style="height:120px" /></td>
                        <td></td>
                        <td></td>
                        <td><button class="btn btn-info" id="btnEditImage1"><i class="fa fa-pen"></i></button></td>
                     </tr>
                    
                     <tr data-id='${keys[1]}'>
                        <td>${profil[keys[1]].id}</td>
                        <td>${profil[keys[1]].keterangan1
                          .split(" ")
                          .slice(0, 8)
                          .join(" ")}</td>
                        <td>${profil[keys[1]].keterangan2
                          .split(" ")
                          .slice(0, 8)
                          .join(" ")}</td>
                        <td></td>
                        <td><button class="btn btn-info" id="btnEdit2"><i class="fa fa-pen"></i></button></td>
                     </tr>
                   
                    `;
    return table;
  };

  const handleGetProfil = catchAsync(async () => {
    isLoading(true);
    const landing = await getAllLanding();
    const table = generateTableObj(landing);
    document.querySelector("#datatable").innerHTML = table;
  });

  const showModalImage1 = catchAsync(async (id) => {
    isLoading(true);
    const landing = await getAllLanding();
    editIdImage1.value = landing[id].id;
    $("#modelEditImage1").modal("show");
  });
  const showModal1 = catchAsync(async (id) => {
    isLoading(true);
    const landing = await getAllLanding();
    editId1.value = landing[id].id;
    editKeterangan1.value = landing[id].keterangan1;
    $("#modelEdit1").modal("show");
  });
  const showModal2 = catchAsync(async (id) => {
    isLoading(true);
    const landing = await getAllLanding();
    editId2.value = landing[id].id;
    editTitle2.value = landing[id].keterangan1;
    editKeterangan2.value = landing[id].keterangan2;
    $("#modelEdit2").modal("show");
  });

  const handleUpdateImage1 = catchAsync(async () => {
    isLoading(true);
    await updateLandingImage(editIdImage1, editFotoImage1);
    $("#modelEditImage1").modal("hide");
    toast("success", "Berhasil Update Landing");
    clearFields(editFotoImage1);
    handleGetLanding();
  });
  const handleUpdate1 = catchAsync(async () => {
    isLoading(true);
    await updateLanding(editId1, editKeterangan1);
    $("#modelEdit1").modal("hide");
    toast("success", "Berhasil Update Landing");
    handleGetLanding();
  });
  const handleUpdate2 = catchAsync(async () => {
    isLoading(true);
    await updateLanding(editId2, editTitle2, editKeterangan2);
    $("#modelEdit2").modal("hide");
    toast("success", "Berhasil Update Landing");
    handleGetLanding();
  });

  //   EVENT LISTENER
  document
    .querySelector("#btnUpdateImage1")
    .addEventListener("click", handleUpdateImage1);
  document
    .querySelector("#btnUpdate1")
    .addEventListener("click", handleUpdate1);
  document
    .querySelector("#btnUpdate2")
    .addEventListener("click", handleUpdate2);
  document.querySelector("#datatable").addEventListener("click", (e) => {
    if (e.target.closest("#btnEditImage1")) {
      const id =
        e.target.closest("#btnEditImage1").parentElement.parentElement.dataset
          .id;
      showModalImage1(id);
    }
    if (e.target.closest("#btnEdit1")) {
      const id =
        e.target.closest("#btnEdit1").parentElement.parentElement.dataset.id;
      showModal1(id);
    }
    if (e.target.closest("#btnEdit2")) {
      const id =
        e.target.closest("#btnEdit2").parentElement.parentElement.dataset.id;
      showModal2(id);
    }
  });

  handleGetProfil();
  document.querySelector("#landing").classList.add("active-nav");
})();
