import axios from 'axios';

//  const COMMENTS_API_TEST = 'http://localhost:8080'
const COMMENTS_API_TEST = 'https://garage-backend.up.railway.app'

export const parkingRegisterService = async (json) => {
    console.log(json)
    const response = await axios.post(COMMENTS_API_TEST+"/user/register", json)
    return response.data;
}