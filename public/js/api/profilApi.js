import { myAxios } from "../utils/url.js";

const getAllProfil = async () => {
  const { data } = await myAxios.get("/profil");
  return data;
};
const getOneProfil = async (id) => {
  const { data } = await myAxios.get(`/profil/${id}`);
  return data;
};
const updateProfil = async (title, body) => {
  const { data } = await myAxios.put(`/profil/${title.value}`, { body });
  return data;
};

export { getAllProfil, getOneProfil, updateProfil };
