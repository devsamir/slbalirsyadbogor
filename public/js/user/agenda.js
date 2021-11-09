import { myAxios } from "../utils/url.js";
(function () {
  const selectBulan = document.querySelector("#select-bulan");
  const selectTahun = document.querySelector("#select-tahun");
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
  const setSelectFirst = (cb) => {
    const tahun = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    selectBulan.value = month;
    selectTahun.value = tahun;
    cb();
  };
  const getAgenda = async () => {
    try {
      isLoading(true);
      const { data } = await myAxios.get(
        `/home/agenda/${selectTahun.value}/${selectBulan.value}`
      );
      const html = data.map(
        (item, index) => `
        <tr>
        <td>${index + 1}</td>
        <td>${item.tanggal}</td>
        <td>${item.acara}</td>
        <td>${item.kegiatan}</td>
        </tr>
      `
      );
      tableContainer.innerHTML = html;
    } catch (err) {
      const error = err?.response?.data?.message || err.message;
      toast("error", error);
    } finally {
      isLoading(false);
    }
  };
  selectBulan.addEventListener("change", getAgenda);
  selectTahun.addEventListener("change", getAgenda);
  setSelectFirst(getAgenda);
})();
