import axios from 'axios';

//  const COMMENTS_API_TEST = 'http://localhost:8080'
const COMMENTS_API_TEST = 'https://garage-backend.up.railway.app'

export const getFeeService = async (json) => {
    const response = await axios.post(COMMENTS_API_TEST+"/check/index/check/checkIn/checkPrice",json)
    return response.data;
}


export const setFeeService = async (json) => {
    const response = await axios.post(COMMENTS_API_TEST+"/check/index/check/checkIn/changePrice",json)
    return response.data;
}

