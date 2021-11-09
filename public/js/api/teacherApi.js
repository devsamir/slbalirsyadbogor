import { myAxios } from "../utils/url.js";
const createTeacher = async (
  fullName,
  nuptk,
  kelamin,
  jabatan,
  pelajaran,
  teacher
) => {
  const formData = new FormData();
  formData.append("fullName", fullName.value);
  formData.append("nuptk", nuptk.value);
  formData.append("kelamin", kelamin.value);
  formData.append("jabatan", jabatan.value);
  formData.append("pelajaran", pelajaran.value);
  formData.append("teacher", teacher.files[0]);
  const { data } = await myAxios.post("/teacher", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
const updateTeacher = async (
  id,
  fullName,
  nuptk,
  kelamin,
  jabatan,
  pelajaran,
  teacher
) => {
  const formData = new FormData();
  formData.append("fullName", fullName.value);
  formData.append("nuptk", nuptk.value);
  formData.append("kelamin", kelamin.value);
  formData.append("jabatan", jabatan.value);
  formData.append("pelajaran", pelajaran.value);
  formData.append("teacher", teacher.files[0]);
  const { data } = await myAxios.put(`/teacher/${id.value}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
const getAllTeacher = async (page, search) => {
  let query = "";
  if (search) query = `&search=${search}`;
  const { data } = await myAxios.get(`/teacher?page=${page}${query}`);
  return data;
};
const getOneTeacher = async (id) => {
  const { data } = await myAxios.get(`/teacher/${id}`);
  return data;
};
const deleteTeacher = async (id) => {
  await myAxios.delete(`/teacher/${id}`);
  return true;
};

export {
  createTeacher,
  getAllTeacher,
  getOneTeacher,
  updateTeacher,
  deleteTeacher,
};
