import { myAxios } from "../utils/url.js";
import { catchAsync } from "../utils/helper.js";
(function () {
  const suggestionCount = document.querySelector("#suggestion-count");
  const getCountSuggestion = catchAsync(async () => {
    const { data } = await myAxios("/suggestion/count");
    suggestionCount.textContent = data;
  });
  getCountSuggestion();
})();
