import { myAxios } from "../utils/url.js";
(function () {
  const filterSearch = document.querySelector("#filter-search");
  const filterPelajaran = document.querySelector("#filter-pelajaran");
  const pembelajaranContainer = document.querySelector(
    "#pembelajaran-container"
  );
  const btnLoadPembelajaran = document.querySelector("#btn-load-pembelajaran");
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
  const generateCard = (post) => {
    const html = post
      .map((item) => {
        return `<div class="d-flex flex-column flex-md-row my-4 align-items-start" id="pembelajaran-one" data-id="${
          item.id
        }"  style="cursor:pointer">
        <img src="https://img.youtube.com/vi/${item.link}/0.jpg"
        style="width: 270px;" class="img-fluid rounded" alt="" />
        <div class="pl-md-4 pt-4 pt-md-0" style="word-break: break-all ">
          <h4 class="font-weight-700">${item.judul}</h4>
          <p class="text-muted">${item.description
            .split(" ")
            .slice(0, 20)
            .join(" ")}</p>
            <span class="badge badge-pill badge-success mb-2">${
              item.pelajaran
            }</span>
          <span class="d-flex align-items-center"><i class="fa fa-clock"></i> <small
                  class="mx-2">${item.tanggal}</small></span>
          </div>
      </div>`;
      })
      .join("");
    return html;
  };
  const handleGetPembelajaran = async () => {
    try {
      isLoading(true);
      page += 1;
      let query = "";
      if (filterPelajaran.value) query = `?pelajaran=${filterPelajaran.value}`;
      if (filterSearch.value) query += `&search=${filterSearch.value}`;

      const {
        data: { data, count },
      } = await myAxios.get(`/home/pembelajaran/${page}${query}`);
      console.log(data, count);
      if (data.length === Number(count)) {
        btnLoadPembelajaran.style.display = "none";
      }
      const html = generateCard(data);
      pembelajaranContainer.innerHTML = html;
    } catch (err) {
      const error = err?.response?.data?.message || err.message;
      toast("error", error);
    } finally {
      isLoading(false);
    }
  };
  const getSelectOption = async () => {
    try {
      isLoading(true);
      const { data } = await myAxios.get(`/home/pembelajaran/pelajaran`);
      const options = data
        .map((item) => `<option value="${item}">${item}</option>`)
        .join("");
      filterPelajaran.innerHTML = `<option value="semua">Semua</option>${options}`;
      handleGetPembelajaran();
    } catch (err) {
      const error = err?.response?.data?.message || err.message;
      toast("error", error);
    } finally {
      isLoading(false);
    }
  };
  filterSearch.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      handleGetPembelajaran();
    }
  });
  filterPelajaran.addEventListener("change", handleGetPembelajaran);
  getSelectOption();
  document.querySelector("#kesiswaan-nav").classList.add("active-link");
  pembelajaranContainer.addEventListener("click", (e) => {
    if (e.target.closest("#pembelajaran-one")) {
      const id = e.target.closest("#pembelajaran-one").dataset.id;
      window.location = `/kesiswaan/pembelajaran/${id}`;
    }
  });
  btnLoadPembelajaran.addEventListener("click", handleGetPembelajaran);
})();
