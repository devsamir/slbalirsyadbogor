import { myAxios } from "../utils/url.js";
(function () {
  // Helper
  const mainPostImage = document.querySelector("#main-post-image");
  const mainPostTitle = document.querySelector("#main-post-title");
  const mainPostDate = document.querySelector("#main-post-date");
  const mainPostJenis = document.querySelector("#main-post-jenis");
  const latestPostContainer = document.querySelector("#latest-post-container");
  const btnLoadPost = document.querySelector("#btn-load-post");
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
  let page = 0;
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
  const getPost = async () => {
    try {
      isLoading(true);
      page += 1;
      const {
        data: { post, count },
      } = await myAxios.get(`/home/post/${page}`);
      if (post.length === count) {
        btnLoadPost.style.display = "none";
      }
      mainPostImage.style.backgroundImage = `linear-gradient(
        to top,
        rgba(51, 51, 51, 0.8),
        rgba(51, 51, 51, 0)
      ),
      url("/${post[0].thumbnail.split("\\").join("/")}")`;
      mainPostTitle.textContent = post[0].title;
      mainPostDate.textContent = post[0].tanggal;
      mainPostJenis.textContent = post[0].jenis;
      mainPostImage.dataset.id = post[0].id;
      const latestPost = post.slice(1);
      const postCard = generatePostCard(latestPost);
      latestPostContainer.innerHTML = postCard;
    } catch (err) {
      const error = err?.response?.data?.message || err.message;
      toast("error", `Slider Error : ${error}`);
    } finally {
      isLoading(false);
    }
  };
  const handleShowArtikel = (id) => {
    window.location = `/informasi/berita/${id}`;
  };
  latestPostContainer.addEventListener("click", (e) => {
    if (e.target.closest("#artikel-one")) {
      const id = e.target.closest("#artikel-one").dataset.id;
      handleShowArtikel(id);
    }
  });

  mainPostImage.addEventListener("click", (e) => {
    if (e.target.closest("#main-post-image")) {
      window.location = `/informasi/berita/${
        e.target.closest("#main-post-image").dataset.id
      }`;
    }
  });
  btnLoadPost.addEventListener("click", getPost);
  getPost();
  document.querySelector("#informasi-nav").classList.add("active-link");
})();
