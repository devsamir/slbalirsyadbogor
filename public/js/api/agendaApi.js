import { myAxios } from "../utils/url.js";
const createAgenda = async (tanggal, acara, kegiatan) => {
  const { data } = await myAxios.post("/agenda", {
    tanggal: tanggal.value,
    acara: acara.value,
    kegiatan: kegiatan.value,
  });
  return data;
};
const updateAgenda = async (id, tanggal, acara, kegiatan) => {
  const { data } = await myAxios.put(`/agenda/${id.value}`, {
    tanggal: tanggal.value,
    acara: acara.value,
    kegiatan: kegiatan.value,
  });
  return data;
};
const getAllAgenda = async (page, search) => {
  let query = "";
  if (search) query = `&search=${search}`;
  const { data } = await myAxios.get(`/agenda?page=${page}${query}`);
  return data;
};
const getOneAgenda = async (id) => {
  const { data } = await myAxios.get(`/agenda/${id}`);
  return data;
};
const deleteAgenda = async (id) => {
  await myAxios.delete(`/agenda/${id}`);
  return true;
};

export { createAgenda, getAllAgenda, getOneAgenda, updateAgenda, deleteAgenda };
