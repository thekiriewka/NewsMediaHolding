import axios from 'axios';

const LIMIT = 10;
const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchPostsApi = async (skip = 0) => {
  const res = await axios.get(`${BASE_URL}/posts?limit=${LIMIT}&skip=${skip}`);
  return res.data;
};
