import { myAxios } from "../utils/url.js";
const createGallery = async (title, description, jenis, gallery) => {
  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("description", description.value);
  formData.append("jenis", jenis.value);
  formData.append("gallery", gallery.files[0]);
  const { data } = await myAxios.post("/gallery", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
const updateGallery = async (id, title, description, jenis, gallery) => {
  const formData = new FormData();

  formData.append("title", title.value);
  formData.append("description", description.value);
  formData.append("jenis", jenis.value);
  formData.append("gallery", gallery.files[0]);
  const { data } = await myAxios.put(`/gallery/${id.value}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
const getAllGallery = async (page, search) => {
  let query = "";
  if (search) query = `&search=${search}`;
  const { data } = await myAxios.get(`/gallery?page=${page}${query}`);
  return data;
};
const getOneGallery = async (id) => {
  const { data } = await myAxios.get(`/gallery/${id}`);
  return data;
};
const deleteGallery = async (id) => {
  await myAxios.delete(`/gallery/${id}`);
  return true;
};

export {
  createGallery,
  getAllGallery,
  getOneGallery,
  updateGallery,
  deleteGallery,
};
