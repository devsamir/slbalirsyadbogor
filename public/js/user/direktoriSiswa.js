import { myAxios } from "../utils/url.js";

(function () {
  const search = document.querySelector("#search");
  const tableContainer = document.querySelector("#table-container");
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
  const handleGetStudent = async () => {
    try {
      isLoading(true);
      let query = "";
      if (search.value) query += `?search=${search.value}`;
      const { data } = await myAxios.get(`/home/student${query}`);
      const html = data
        .map(
          (item, index) => `
        <tr>
        <td>${index + 1}</td>
        <td>${item.nisn}</td>
        <td>${item.nama}</td>
        <td>${item.kebutuhan}</td>
        </tr>
      `
        )
        .join("");
      tableContainer.innerHTML = html;
    } catch (err) {
      const error = err?.response?.data?.message || err.message;
      toast("error", error);
    } finally {
      isLoading(false);
    }
  };
  handleGetStudent();
  search.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      handleGetStudent();
    }
  });
  document.querySelector("#kesiswaan-nav").classList.add("active-link");
})();
