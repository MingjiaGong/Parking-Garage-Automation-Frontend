import axios from "axios";

//  const COMMENTS_API_TEST = 'http://localhost:8080'
const COMMENTS_API_TEST = 'https://garage-backend.up.railway.app'

export const garageDataManagementService = async () => {
  const response = await axios.get(COMMENTS_API_TEST + "/index/garage");
  return response.data;
};