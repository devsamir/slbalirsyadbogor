import { myAxios } from "../utils/url.js";
(function () {
  const extraContainer = document.querySelector("#extra-container");
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
  const getAllExtra = async () => {
    try {
      isLoading(true);
      const { data } = await myAxios.get("/home/extra");
      const html = data
        .map(
          (item) =>
            ` <div class="col-10 mx-auto col-md-4 py-4  m-4 shadow>
          <div class="card">
              <div class="img-container">
                  <img src="/${item.thumbnail}" alt="" class="card-img-top" />
              </div>
              <div class="card-body bg-white">
                  <div class="card-text d-flex flex-column">

                      <h2 id="extra-item-name" class="text-success font-weight-bold">${
                        item.nameExtracurricular
                      }</h2>
                      <p class="text-muted my-4">${item.description
                        .split(" ")
                        .slice(0, 10)
                        .join(" ")}</p>
                  </div>
              </div>
              <div class="card-footer">
              <a class="btn btn-outline-success" href="/kesiswaan/ekstrakulikuler/${
                item.id
              }">Selengkapnya</a>
              </div>
          </div>
      </div>`
        )
        .join("");
      extraContainer.innerHTML = html;
    } catch (err) {
      const error = err?.response?.data?.message || err.message;
      toast("error", `${error}`);
    } finally {
      isLoading(false);
    }
  };
  getAllExtra();
  document.querySelector("#kesiswaan-nav").classList.add("active-link");
})();
