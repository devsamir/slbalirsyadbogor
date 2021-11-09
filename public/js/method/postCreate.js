import { isLoading, catchAsync, toast } from "../utils/helper.js";
import { createPost } from "../api/postApi.js";
(function () {
  const title = document.querySelector("#title");
  const thumbnail = document.querySelector("#thubmnail");
  const status = document.querySelector("#status");
  const jenis = document.querySelector("#jenis");
  const btnTambah = document.querySelector("#btnTambah");

  const handleTambah = catchAsync(async () => {
    const body = tinyMCE.get("body").getContent();
    isLoading(true);
    await createPost(title, body, status, thumbnail, jenis);
    window.location.replace("/admin/post");
  });

  //   Event Listener
  btnTambah.addEventListener("click", handleTambah);
  document.querySelector("#post").classList.add("active-nav");
})();
