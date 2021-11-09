import { myAxios } from "../utils/url.js";
const createPembelajaran = async (
  judul,
  pelajaran,
  tanggal,
  link,
  description
) => {
  const { data } = await myAxios.post("/pembelajaran", {
    judul: judul.value,
    pelajaran: pelajaran.value,
    tanggal: tanggal.value,
    link: link.value,
    description: description.value,
  });
  return data;
};
const updatePembelajaran = async (
  id,
  judul,
  pelajaran,
  tanggal,
  link,
  description
) => {
  const { data } = await myAxios.put(`/pembelajaran/${id.value}`, {
    judul: judul.value,
    pelajaran: pelajaran.value,
    tanggal: tanggal.value,
    link: link.value,
    description: description.value,
  });
  return data;
};
const getAllPembelajaran = async (page, search) => {
  let query = "";
  if (search) query = `&search=${search}`;
  const { data } = await myAxios.get(`/pembelajaran?page=${page}${query}`);
  return data;
};
const getOnePembelajaran = async (id) => {
  const { data } = await myAxios.get(`/pembelajaran/${id}`);
  return data;
};
const deletePembelajaran = async (id) => {
  await myAxios.delete(`/pembelajaran/${id}`);
  return true;
};

export {
  createPembelajaran,
  getAllPembelajaran,
  getOnePembelajaran,
  updatePembelajaran,
  deletePembelajaran,
};
