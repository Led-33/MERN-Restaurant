import axios from "axios";

const API_URL = "http://localhost:5000/api/settings";

export const getSettings = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const updateSettings = async (formData) => {
  const res = await axios.put(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};