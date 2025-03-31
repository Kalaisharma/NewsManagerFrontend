import { NewsClient } from "../Client/Client";

export const Newsservice = async () => {
    const API_KEY = process.env.NEWS_API_KEY;
    const response = await NewsClient(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`, 'GET');
    return response;
}

export const FeedbackData = async (data: any) => {
    const response = await NewsClient(`http://localhost:5000/news/start`, 'POST',data);
    return response;
}