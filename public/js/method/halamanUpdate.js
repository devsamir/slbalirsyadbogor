import { isLoading, catchAsync, toast } from "../utils/helper.js";
import { getOneHalaman, updateHalaman } from "../api/halamanApi.js";

(function () {
  tinymce.init({
    selector: "#body",
    setup: function (editor) {
      editor.on("init", async function (e) {
        const id = window.location.pathname.split("/")[3];
        const halaman = await getOneHalaman(id);
        editor.setContent(halaman.body);
      });
    },
  });
  const title = document.querySelector("#title");
  const foto = document.querySelector("#foto");
  const btnUpdate = document.querySelector("#btnUpdate");

  const handlePopulate = catchAsync(async () => {
    const id = window.location.pathname.split("/")[3];
    const halaman = await getOneHalaman(id);
    title.value = halaman.halaman;
  });
  const handleUpdate = catchAsync(async () => {
    const body = tinyMCE.get("body").getContent();
    isLoading(true);
    await updateHalaman(title, body, foto);
    window.location.replace("/admin/halaman");
  });
  btnUpdate.addEventListener("click", handleUpdate);

  handlePopulate();
  document.querySelector("#halaman").classList.add("active-nav");
})();
