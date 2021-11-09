const url = "https://slbalirsyadbogor.com/api";
// url local
// const url = "http://192.168.100.88:4000/api";
// const url = "http://192.168.137.25:4000/api";

export const myAxios = axios.create({
  baseURL: url,
  withCredentials: true,
});

export default url;
