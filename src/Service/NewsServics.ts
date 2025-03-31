import { NewsClient } from "../Client/Client";

export const Newsservice = async() => {
    const response = await NewsClient('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=d3a13558d2714ec6b5c5fc99385becd3', 'GET');
    return response;
}

export const FeedbackData = async (data: any) => {
    const response = await NewsClient(`http://localhost:5000/news/start`, 'POST',data);
    return response;
}