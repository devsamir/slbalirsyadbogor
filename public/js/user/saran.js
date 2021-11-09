import { myAxios } from "../utils/url.js";
import { clearFields } from "../utils/helper.js";
(function () {
  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const telpon = document.querySelector("#telpon");
  const saran = document.querySelector("#saran");
  const btnSaran = document.querySelector("#btnSaran");
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
  const createSaran = async () => {
    try {
      isLoading(true);
      await myAxios.post("/home/saran", {
        name: name.value,
        email: email.value,
        phone: telpon.value,
        saran: saran.value,
      });
      clearFields(name, email, telpon, saran);
      toast("success", "Tulisan Anda Sudah Tersampaikan");
    } catch (err) {
      const error = err?.response?.data?.message || err.message;
      toast("error", `${error}`);
    } finally {
      isLoading(false);
    }
  };
  btnSaran.addEventListener("click", createSaran);
  document.querySelector("#saran-nav").classList.add("active-link");
})();
