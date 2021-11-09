import { myAxios } from "../utils/url.js";
(function () {
  const otherPostContainer = document.querySelector("#other-post-container");
  const isLoading = (status) => {
    const loading = document.querySelector(".loading-container");
    if (status) {
      loading.classList.remove("none");
    } else {
      loading.classList.add("none");
    }
  };
  const toast = (variant, message) => {
    toastr[variant](message);

    toastr.options = {
      closeButton: true,
      debug: false,
      newestOnTop: true,
      progressBar: true,
      positionClass: "toast-top-right",
      preventDuplicates: false,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };
  };
  const generatePostCard = (post) => {
    const html = post
      .map((item) => {
        return `<div class="d-flex flex-column flex-md-row my-6 align-items-start" id="artikel-one" data-id="${
          item.id
        }"  style="cursor:pointer">
          <img src="/${item.thumbnail}"
              style="width: 270px;" class="img-fluid rounded" alt="" />
        <div class="pl-md-4 pt-4 pt-md-0" style="word-break: break-all ">
          
          <h4 class="font-weight-700">${item.title}</h4>
          <p class="text-muted">${item.body
            .replace(/&nbsp;/g, " ")
            .split(" ")
            .slice(0, 20)
            .join(" ")}</p>
            <div class="text-success mb-4">Baca Selengkapnya...</div>
            <span class="badge badge-pill badge-success mb-2">${
              item.jenis
            }</span>
          <span class="d-flex align-items-center"><i class="fa fa-clock"></i> <small
                  class="mx-2">${item.tanggal}</small></span>
          </div>
      </div>`;
      })
      .join("");
    return html;
  };
  const getOtherPost = async () => {
    try {
      isLoading(true);
      const id = window.location.pathname.split("/")[3];
      const { data } = await myAxios.get(`/home/other-post/${id}`);
      const html = generatePostCard(data);
      otherPostContainer.innerHTML = html;
    } catch (err) {
      const error = err?.response?.data?.message || err.message;
      toast("error", `Slider Error : ${error}`);
    } finally {
      isLoading(false);
    }
  };
  getOtherPost();
})();
