import { myAxios } from "../utils/url.js";
import { catchAsync, isLoading } from "../utils/helper.js";

(function () {
  const username = document.querySelector("#username");
  const password = document.querySelector("#password");
  const btnLogin = document.querySelector("#btnLogin");

  const handleLogin = catchAsync(async () => {
    isLoading(true);
    await myAxios.post("/auth/login", {
      username: username.value,
      password: password.value,
    });
    location.reload();
  });
  btnLogin.addEventListener("click", handleLogin);
})();
