import { myAxios } from "../utils/url.js";

const updateLanding = async (id, keterangan1, keterangan2, keterangan3) => {
  const { data } = await myAxios.put(`/landing`, {
    id: id.value,
    keterangan1: keterangan1.value,
    keterangan2: keterangan2?.value,
    keterangan3: keterangan3?.value,
  });
  return data;
};
const updateLandingImage = async (
  id,
  keterangan1,
  keterangan2,
  keterangan3
) => {
  const formData = new FormData();

  formData.append("id", id.value);
  formData.append("profil", keterangan1.files[0]);
  formData.append("keterangan2", keterangan2?.value);
  formData.append("keterangan3", keterangan3?.value);
  const { data } = await myAxios.put(`/landing/image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
const getAllLanding = async () => {
  const { data } = await myAxios.get(`/landing`);
  return data;
};
export { updateLanding, updateLandingImage, getAllLanding };
