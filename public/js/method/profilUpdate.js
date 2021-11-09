import { isLoading, catchAsync, toast } from "../utils/helper.js";
import { getOneProfil, updateProfil } from "../api/profilApi.js";

(function () {
  tinymce.init({
    selector: "#body",
    setup: function (editor) {
      editor.on("init", async function (e) {
        const id = window.location.pathname.split("/")[3];
        const profil = await getOneProfil(id);
        editor.setContent(profil.body);
      });
    },
  });
  const title = document.querySelector("#title");
  const btnUpdate = document.querySelector("#btnUpdate");

  const handlePopulate = catchAsync(async () => {
    const id = window.location.pathname.split("/")[3];
    const profil = await getOneProfil(id);
    title.value = profil.title;
  });
  const handleUpdate = catchAsync(async () => {
    const body = tinyMCE.get("body").getContent();
    isLoading(true);
    await updateProfil(title, body);
    window.location.replace("/admin/profil");
  });
  btnUpdate.addEventListener("click", handleUpdate);

  handlePopulate();
  document.querySelector("#profil").classList.add("active-nav");
})();
