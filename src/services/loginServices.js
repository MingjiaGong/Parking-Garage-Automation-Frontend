import axios from 'axios';

//  const COMMENTS_API_TEST = 'http://localhost:8080'
const COMMENTS_API_TEST = 'https://garage-backend.up.railway.app'

export const login = async (json) => {
    const response = await axios.post(COMMENTS_API_TEST+"/login", json)
    return response.data;
}
