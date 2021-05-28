import { myAxios } from "../utils/url.js";
const createUser = async (username, password, repassword, email, avatar) => {
  const formData = new FormData();
  formData.append("username", username.value);
  formData.append("password", password.value);
  formData.append("repassword", repassword.value);
  formData.append("email", email.value);
  formData.append("avatar", avatar.files[0]);
  const { data } = await myAxios.post("/user", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
const updateUser = async (
  id,
  username,
  oldPassword,
  password,
  repassword,
  email,
  avatar
) => {
  const formData = new FormData();
  formData.append("username", username.value);
  formData.append("oldPassword", oldPassword.value);
  formData.append("password", password.value);
  formData.append("repassword", repassword.value);
  formData.append("email", email.value);
  formData.append("avatar", avatar.files[0]);
  const { data } = await myAxios.put(`/user/${id.value}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
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
