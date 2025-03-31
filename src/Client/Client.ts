import axios from 'axios';
export const NewsClient = async (url: string, method: string, payload = null) => {
    console.log(payload,"payload");
    
    const data = {
        url: url,
        method: method,
        data: payload
    }
    const response = await axios(data);
    return response;
}