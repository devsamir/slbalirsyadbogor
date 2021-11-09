import { myAxios } from "../utils/url.js";
const createExtra = async (nameExtracurricular, description, extra) => {
  const formData = new FormData();
  formData.append("nameExtracurricular", nameExtracurricular.value);
  formData.append("description", description.value);
  formData.append("extra", extra.files[0]);
  const { data } = await myAxios.post("/extra", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
const updateExtra = async (id, nameExtracurricular, description, extra) => {
  const formData = new FormData();

  formData.append("nameExtracurricular", nameExtracurricular.value);
  formData.append("description", description.value);
  formData.append("extra", extra.files[0]);
  const { data } = await myAxios.put(`/extra/${id.value}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
const getAllExtra = async (page, search) => {
  let query = "";
  if (search) query = `&search=${search}`;
  const { data } = await myAxios.get(`/extra?page=${page}${query}`);
  return data;
};
const getOneExtra = async (id) => {
  const { data } = await myAxios.get(`/extra/${id}`);
  return data;
};
const deleteExtra = async (id) => {
  await myAxios.delete(`/extra/${id}`);
  return true;
};

export { createExtra, getAllExtra, getOneExtra, updateExtra, deleteExtra };
