const url = "http://localhost:4000/api";
export const myAxios = axios.create({
    baseURL: url,
    withCredentials: true,
  });
  
export default url;