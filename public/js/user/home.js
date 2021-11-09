import { myAxios } from "../utils/url.js";
(function () {
  const mainTitle = document.querySelector("#main-title");
  const mainCaption = document.querySelector("#main-caption");
  const home = document.querySelector("#home");
  const artikelContainer = document.querySelector("#artikel-container");
  const beritaContainer = document.querySelector("#berita-container");
  // Helper

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
  //   Method
  const getAllProfil = async () => {
    try {
      const { data } = await myAxios.get("/home/profil");
      mainTitle.textContent = data["judul website"].keterangan1;
      mainCaption.textContent = data["judul website"].keterangan2;
      home.style.backgroundImage = `url('${data["background judul"].keterangan1
        .split("\\")
        .join("/")}')`;
    } catch (err) {
      const error = err?.response?.data?.message || err.message;
      toast("error", `Slider Error : ${error}`);
    }
  };
  const getLatestArtikel = async () => {
    try {
      const { data } = await myAxios.get("/home/latest-post/artikel");
      const postCards = data
        .map((item) => {
          return `<div class="col-10 col-lg-4 mx-auto my-3 extra-item" style="cursor:pointer" id="artikel-one" data-id="${item.id}">
        <div class="card single-item">
          <div class="img-container">
            <img
              src="${item.thumbnail}"
              class="card-img-top post-img"
              alt="Post Foto"
            />
            <span class="extra-item-icon">
              <i class="fa fa-search"></i>
            </span>
          </div>
          <div class="card-body">
            <div class="card-text d-flex flex-column">
              <h2
                id="extra-item-name"
                class="text-success font-weight-bold"
              >${item.title}</h5>
              <div class="d-flex align-items-center">
                <i class="fas fa-clock"></i>
                <span class="mx-4">${item.tanggal}</span>
              </div>
              <p class="my-2">${item.desc} <span class="text-success">Baca Selengkapnya...</span></p>
            </div>
          </div>
        </div>
      </div>`;
        })
        .join("");
      artikelContainer.innerHTML = postCards;
    } catch (err) {
      const error = err?.response?.data?.message || err.message;
      toast("error", `Slider Error : ${error}`);
    }
  };
  const getLatestBerita = async () => {
    try {
      const { data } = await myAxios.get("/home/latest-post/berita");
      const postCards = data
        .map((item) => {
          return `<div class="col-10 col-lg-4 mx-auto my-3 extra-item" style="cursor:pointer" id="artikel-one" data-id="${item.id}">
        <div class="card single-item">
          <div class="img-container">
            <img
              src="${item.thumbnail}"
              class="card-img-top post-img"
              alt="Post Foto"
            />
            <span class="extra-item-icon">
              <i class="fa fa-search"></i>
            </span>
          </div>
          <div class="card-body">
            <div class="card-text d-flex flex-column">
              <h2
                id="extra-item-name"
                class="text-success font-weight-bold"
              >${item.title}</h5>
              <div class="d-flex align-items-center">
                <i class="fas fa-clock"></i>
                <span class="mx-4">${item.tanggal}</span>
              </div>
              <p class="my-2">${item.desc} <br><span class="text-success">Baca Selengkapnya...</span></p>
            </div>
          </div>
        </div>
      </div>`;
        })
        .join("");
      beritaContainer.innerHTML = postCards;
    } catch (err) {
      const error = err?.response?.data?.message || err.message;
      toast("error", `Slider Error : ${error}`);
    }
  };
  const getAll = async () => {
    try {
      isLoading(true);
      await Promise.all([
        getAllProfil(),
        getLatestArtikel(),
        getLatestBerita(),
      ]);
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
  artikelContainer.addEventListener("click", (e) => {
    if (e.target.closest("#artikel-one")) {
      const id = e.target.closest("#artikel-one").dataset.id;
      handleShowArtikel(id);
    }
  });
  beritaContainer.addEventListener("click", (e) => {
    if (e.target.closest("#artikel-one")) {
      const id = e.target.closest("#artikel-one").dataset.id;
      handleShowArtikel(id);
    }
  });
  getAll();
  document.querySelector("#home-nav").classList.add("active-link");
})();
