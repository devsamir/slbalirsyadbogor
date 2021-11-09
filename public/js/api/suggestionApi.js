import { myAxios } from "../utils/url.js";

const getAllSuggestion = async (page, search) => {
  let query = "";
  if (search) query = `&search=${search}`;
  const { data } = await myAxios.get(`/suggestion?page=${page}${query}`);
  return data;
};
const checkSuggestion = async (id) => {
  await myAxios.put(`/suggestion/${id}`);
  return false;
};

export { getAllSuggestion, checkSuggestion };
