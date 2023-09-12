import axios from 'axios';

//  const COMMENTS_API_TEST = 'http://localhost:8080'
const COMMENTS_API_TEST = 'https://garage-backend.up.railway.app'

export const checkUsernameService = async (json) => {
    console.log(json)
    const response = await axios.post(COMMENTS_API_TEST+"/forget", json)
    return response.data;
}

export const changePasswordService = async (json) => {

    const user={
        username : json.username
    }
    const url = "/forget/changePassword?newPassword="+json.password
    console.log(user)
    console.log(url)
    const response = await axios.post(COMMENTS_API_TEST+url, user)
    return response.data;
}