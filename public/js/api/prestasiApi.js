import { myAxios } from "../utils/url.js";
const createPrestasi = async (prestasi, foto) => {
  const formData = new FormData();
  formData.append("prestasi", prestasi.value);
  formData.append("foto", foto.files[0]);
  const { data } = await myAxios.post("/prestasi", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
const getAllPrestasi = async (page, search) => {
  let query = "";
  if (search) query = `&search=${search}`;
  const { data } = await myAxios.get(`/prestasi?page=${page}${query}`);
  return data;
};
const deletePrestasi = async (id) => {
  await myAxios.delete(`/prestasi/${id}`);
  return true;
};
const getOnePrestasi = async (id) => {
  const { data } = await myAxios.get(`/prestasi/${id}`);
  return data;
};
const updatePrestasi = async (id, prestasi, foto) => {
  const formData = new FormData();
  formData.append("prestasi", prestasi.value);
  formData.append("foto", foto.files[0]);
  const { data } = await myAxios.put(`/prestasi/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
export {
  createPrestasi,
  getAllPrestasi,
  deletePrestasi,
  getOnePrestasi,
  updatePrestasi,
};
