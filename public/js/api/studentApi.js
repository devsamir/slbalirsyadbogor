import { myAxios } from "../utils/url.js";
const createStudent = async (nisn, nama, kebutuhan) => {
  const { data } = await myAxios.post("/student", {
    nisn: nisn.value,
    nama: nama.value,
    kebutuhan: kebutuhan.value,
  });
  return data;
};
const updateStudent = async (id, nisn, nama, kebutuhan) => {
  const { data } = await myAxios.put(`/student/${id.value}`, {
    nisn: nisn.value,
    nama: nama.value,
    kebutuhan: kebutuhan.value,
  });
  return data;
};
const getAllStudent = async (page, search) => {
  let query = "";
  if (search) query = `&search=${search}`;
  const { data } = await myAxios.get(`/student?page=${page}${query}`);
  return data;
};
const getOneStudent = async (id) => {
  const { data } = await myAxios.get(`/student/${id}`);
  return data;
};
const deleteStudent = async (id) => {
  await myAxios.delete(`/student/${id}`);
  return true;
};

export {
  createStudent,
  getAllStudent,
  getOneStudent,
  updateStudent,
  deleteStudent,
};
