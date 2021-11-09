import { myAxios } from "../utils/url.js";

const getAllHalaman = async () => {
  const { data } = await myAxios.get("/halaman");
  return data;
};
const getOneHalaman = async (id) => {
  const { data } = await myAxios.get(`/halaman/${id}`);
  return data;
};
const updateHalaman = async (title, body, foto) => {
  const formData = new FormData();
  formData.append("body", body);
  formData.append("foto", foto.files[0]);
  const { data } = await myAxios.put(`/halaman/${title.value}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export { getAllHalaman, getOneHalaman, updateHalaman };
