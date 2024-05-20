import axios from "axios";

const VITE_APP_BASE_URL = "http://localhost:3000/api";
const baseUrl = VITE_APP_BASE_URL + "/trainee";

const getAllTrainees = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getOneTrainee = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const createTrainee = async (trainee) => {
  const response = await axios.post(baseUrl, trainee);
  return response.data;
};


const updateTrainee = async (id, trainee) => {
  const response = await axios.put(`${baseUrl}/${id}`, trainee);
  return response.data;
};

const removeTrainee = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default {
  getAllTrainees,
  getOneTrainee,
  createTrainee,
  removeTrainee,
  updateTrainee,
};
