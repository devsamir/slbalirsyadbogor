import { myAxios } from "../utils/url.js";
const createUser = async (username, password, repassword, email) => {
  const { data } = await myAxios.post("/user", {
    username: username.value,
    password: password.value,
    repassword: repassword.value,
    email: email.value,
  });
  return data;
};
const updateUser = async (
  id,
  username,
  oldPassword,
  password,
  repassword,
  email
) => {
  const { data } = await myAxios.put(`/user/${id.value}`, {
    username: username.value,
    oldPassword: oldPassword.value,
    password: password.value,
    repassword: repassword.value,
    email: email.value,
  });
  return data;
};
const getAllUser = async () => {
  const { data } = await myAxios.get("/user");
  return data;
};
const deleteUser = async (id) => {
  await myAxios.delete(`/user/${id}`);
  return true;
};

export { createUser, getAllUser, updateUser, deleteUser };
