import { isLoading, catchAsync, toast } from "../utils/helper.js";
import { getOnePost, updatePost } from "../api/postApi.js";
(function () {
  tinymce.init({
    selector: "#body",
    setup: function (editor) {
      editor.on("init", async function (e) {
        const id = window.location.pathname.split("/")[4];
        const post = await getOnePost(id);
        editor.setContent(post.body);
      });
    },
  });
  const idUpdate = document.querySelector("#id");
  const title = document.querySelector("#title");
  const thumbnail = document.querySelector("#thubmnail");
  const status = document.querySelector("#status");
  const jenis = document.querySelector("#jenis");
  const btnUpdate = document.querySelector("#btnUpdate");

  const handlePopulate = catchAsync(async () => {
    const id = window.location.pathname.split("/")[4];
    const post = await getOnePost(id);
    idUpdate.value = post.id;
    title.value = post.title;
    status.value = post.status;
    jenis.value = post.jenis;
  });
  const handleUpdate = catchAsync(async () => {
    const body = tinyMCE.get("body").getContent();
    isLoading(true);
    await updatePost(idUpdate.value, title, body, status, thumbnail, jenis);
    window.location.replace("/admin/post");
  });

  btnUpdate.addEventListener("click", handleUpdate);

  handlePopulate();
  document.querySelector("#post").classList.add("active-nav");
})();
