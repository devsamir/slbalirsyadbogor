import {
  catchAsync,
  generateTableSuggest,
  isLoading,
  toast,
} from "../utils/helper.js";
import { getAllSuggestion, checkSuggestion } from "../api/suggestionApi.js";

(function () {
  const datatable = document.querySelector("#datatable");
  const search = document.querySelector("#search");
  const pageUi = document.querySelector("#page");
  // TABLE ACTIONS
  let page = 1;
  let maxPage = 1;
  let row = 0;
  const handleGetSuggestion = catchAsync(async () => {
    isLoading(true);
    const { data, count } = await getAllSuggestion(page, search.value);
    const table = generateTableSuggest(
      data,
      ["Nama", "Email", "No Telpon", "Saran"],
      ["name", "email", "phone", "saran"],
      "id"
    );
    datatable.innerHTML = table;
    maxPage = Math.ceil(count / 10);
    row = count;
    pageUi.innerHTML = `${page} / ${maxPage} Page (Total ${row} Data)`;
    if (page > 1) {
      document.querySelector("#btnBefore").classList.remove("hidden");
    } else {
      document.querySelector("#btnBefore").classList.add("hidden");
    }
    if (page < maxPage) {
      document.querySelector("#btnNext").classList.remove("hidden");
    } else {
      document.querySelector("#btnNext").classList.add("hidden");
    }
  });
  document.querySelector(".pagination").addEventListener("click", (e) => {
    if (e.target.closest("#btnBefore")) {
      if (page > 1) page -= 1;
      handleGetSuggestion();
    }
    if (e.target.closest("#btnNext")) {
      console.log("asu");
      if (page < maxPage) page += 1;
      handleGetSuggestion();
    }
  });
  search.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      page = 1;
      handleGetSuggestion();
    }
  });
  const handleCheckSuggestion = catchAsync(async (id) => {
    isLoading(true);
    await checkSuggestion(id);
    handleGetSuggestion();
  });

  datatable.addEventListener("click", (e) => {
    if (e.target.closest("#btnCheck")) {
      const id =
        e.target.closest("#btnCheck").parentElement.parentElement.dataset.id;
      handleCheckSuggestion(id);
    }
  });
  document.querySelector("#saran").classList.add("active-nav");
  handleGetSuggestion();
})();
