import { myAxios } from "../utils/url.js";
(function () {
  const btnLoadImage = document.querySelector("#btn-load-image");
  const galleryContainer1 = document.querySelector("#gallery-container-1");
  const galleryContainer2 = document.querySelector("#gallery-container-2");
  const galleryContainer3 = document.querySelector("#gallery-container-3");
  const modalImg = document.querySelector("#modal-img");
  const modalTitle = document.querySelector("#modal-title");
  const modalText = document.querySelector("#modal-text");
  const modalJenis = document.querySelector("#modal-jenis");
  const filterJenis = document.querySelector("#filter-jenis");
  const btnView = document.querySelector("#btnView");

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
  let images = [];
  const generateImageCard = (data) => {
    return data.map((item) => {
      return `
          <div class="position-relative img-gallery">
              <span class="badge badge-pill badge-success position-absolute top-4 left-2">${item.jenis}</span>
              <img src="/${item.photo}" class="img-fluid rounded" />
              <div class="img-overlay rounded">
                  <h3 class="text-white text-center">${item.title}</h3>
                  <button class="btn btn-success" data-id="${item.id}" id="btnView">Lihat</button>
              </div>
          </div>
      `;
    });
  };

  const getAllGallery = async () => {
    try {
      isLoading(true);
      page += 1;
      const {
        data: { gallery, count },
      } = await myAxios.post(`/home/gallery/${page}`, {
        jenis: filterJenis.value,
      });
      images = gallery;
      if (gallery.length === count) {
        btnLoadImage.style.display = "none";
      }
      const html = generateImageCard(gallery);
      const split = Math.ceil(html.length / 3);
      let gallery1 = "";
      let gallery2 = "";
      let gallery3 = "";

      html.forEach((item, index) => {
        if (index < split) {
          gallery1 += item;
        } else if (index < split * 2) {
          gallery2 += item;
        } else if (index < split * 3) {
          gallery3 += item;
        }
      });
      galleryContainer1.innerHTML = gallery1;
      galleryContainer2.innerHTML = gallery2;
      galleryContainer3.innerHTML = gallery3;
    } catch (err) {
      const error = err?.response?.data?.message || err.message;
      toast("error", `Slider Error : ${error}`);
    } finally {
      isLoading(false);
    }
  };
  btnLoadImage.addEventListener("click", getAllGallery);
  document.querySelector(".row-custom").addEventListener("click", (e) => {
    if (e.target.id === "btnView") {
      const img = images.find((item) => item.id == e.target.dataset.id);
      modalImg.src = `/${img.photo}`;
      modalTitle.textContent = img.title;
      modalText.textContent = img.description;
      modalJenis.textContent = img.jenis;
      $("#modelView").modal("show");
    }
  });
  filterJenis.addEventListener("change", () => {
    page = 0;
    getAllGallery();
  });

  getAllGallery();
})();
