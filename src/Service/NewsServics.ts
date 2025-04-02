import { NewsClient } from "../Client/Client";
export const Newsservice = async () => {
    const response = await NewsClient(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=d3a13558d2714ec6b5c5fc99385becd3`, 'GET');
    console.log(response,"response");
    return response;
}
//localhost: http://localhost:5000/news/start
export const FeedbackData = async (data: any) => {
    const response = await NewsClient(`https://news-manager-backend-he1g.onrender.com`, 'POST',data);
    return response;
}