import { myAxios } from "../utils/url.js";
(function () {
  // Helper
  const prestasiContainer = document.querySelector("#prestasi-container");
  const btnLoadPrestasi = document.querySelector("#btn-load-prestasi");
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
  const generatePrestasiCard = (post) => {
    const html = post
      .map((item) => {
        return `${
          item.foto && `<img src="/${item.foto}" style="width:360px" />`
        } 
        <li class="list-group-item">${item.prestasi}</li>`;
      })
      .join("");
    return html;
  };
  const getPrestasi = async () => {
    try {
      isLoading(true);
      page += 1;
      const {
        data: { prestasi, count },
      } = await myAxios.get(`/home/prestasi/${page}`);
      if (prestasi.length === count) {
        btnLoadPrestasi.style.display = "none";
      }
      const prestasiList = generatePrestasiCard(prestasi);
      prestasiContainer.innerHTML = prestasiList;
    } catch (err) {
      const error = err?.response?.data?.message || err.message;
      toast("error", `Slider Error : ${error}`);
    } finally {
      isLoading(false);
    }
  };
  btnLoadPrestasi.addEventListener("click", getPrestasi);
  getPrestasi();
  document.querySelector("#kesiswaan-nav").classList.add("active-link");
})();
