import { myAxios } from "../utils/url.js";
const createPost = async (title, body, status, post, jenis) => {
  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("body", body);
  formData.append("status", status.value);
  formData.append("post", post.files[0]);
  formData.append("jenis", jenis.value);
  const { data } = await myAxios.post("/post", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
const getAllPost = async (page, search) => {
  let query = "";
  if (search) query = `&search=${search}`;
  const { data } = await myAxios.get(`/post?page=${page}${query}`);
  return data;
};
const deletePost = async (id) => {
  await myAxios.delete(`/post/${id}`);
  return true;
};
const getOnePost = async (id) => {
  const { data } = await myAxios.get(`/post/${id}`);
  return data;
};
const updatePost = async (id, title, body, status, post, jenis) => {
  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("body", body);
  formData.append("status", status.value);
  formData.append("post", post.files[0]);
  formData.append("jenis", jenis.value);
  const { data } = await myAxios.put(`/post/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
export { createPost, getAllPost, deletePost, getOnePost, updatePost };
