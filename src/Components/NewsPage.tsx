import React, { useContext, useEffect, useState } from "react";
import { Newsservice } from "../Service/NewsServics";
import "../Stylesheet/NewsPagestyle.css";
import FeedbackForm from "./FeedBack";
import { FeedbackContext } from "../App";
import Newsdata from '../NewsJSON/NewsJson.json';
const App: React.FC = () => {
  useEffect(() => {
    
    }, []);
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
const feedback_Context = useContext(FeedbackContext);
if (!feedback_Context) {
  throw new Error("MyComponent must be used within a FeedbackProvider");
}

  const { feedBackview, setfeedbackView } = feedback_Context;
  const [currentPage, setCurrentPage] = useState(1);
  const [newsData, setNewsdata] = useState([]);
  const itemsPerPage = 6;
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    });
  };
  const newsdata:any = Newsdata;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Newsservice();
        if ((response.status ===200)) {
          console.log(response.data.articles);
          setNewsdata(response.data.articles);
        }
      } catch (error) {
        setNewsdata(newsdata);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [newsData]);
  

  const toggleView = (mode: "card" | "list") => setViewMode(mode);
  const paginatedData = newsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  console.log(paginatedData, "paginated");

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="profile-card">
          <img
            src="https://th.bing.com/th/id/OIP.3EI6ZQqf6ws0Rv2mVHkHlwHaHa?rs=1&pid=ImgDetMain"
            alt="Profile"
          />
          <div>
            <p>Hi Reader,</p>
            <p>Here's your News!</p>
          </div>
        </div>

        <div className="toggle-view">
          <p>View Toggle</p>
          <div className="toggle-buttons">
            <button
              className={viewMode === "card" ? "active" : ""}
              onClick={() => toggleView("card")}
            >
              📦
            </button>
            <button
              className={viewMode === "list" ? "active" : ""}
              onClick={() => toggleView("list")}
            >
              📄
            </button>
          </div>
        </div>

        <div className="feedback">
          <p>Have a Feedback?</p>
          <button
            className="feedback-button"
            onClick={() => setfeedbackView(true)}
          >
            We're Listening!
          </button>
        </div>
      </aside>
      {viewMode === "card" && (
        <main className={viewMode}>
          {paginatedData?.map((item: any, index: number) => (
            <div key={index} className={`news-item-${viewMode}`}>
              <div className={`close-btn-${viewMode}`}>
                <button>❌</button>
              </div>
              <div className="card-content">
                <h4>{item.title}</h4>
                <p>
                  {item.description === null
                    ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia aut magni debitis dolores dicta amet eum, quam sed, quia perferendis modi! Doloremque illo magnam porro non quod? Asperiores, similique repudiandae"
                    : item.description}
                </p>
                <p>{formatDate(item.publishedAt)}</p>
                <img
                  src={
                    item.urlToImage === null
                      ? "https://sawa-construction.co.jp/wp-content/uploads/2018/09/No-Image.png"
                      : item.urlToImage
                  }
                  alt="News"
                  className={`news-image-${viewMode}`}
                />
              </div>
            </div>
          ))}
        </main>
      )}
      {viewMode === "list" && (
        <main className={viewMode}>
          {paginatedData?.map((item: any, index: number) => (
            <div key={index} className={`news-item-${viewMode}`}>
              <img
                src={
                  item.urlToImage === null
                    ? "https://sawa-construction.co.jp/wp-content/uploads/2018/09/No-Image.png"
                    : item.urlToImage
                }
                alt="News"
                className={`news-image-${viewMode}`}
              />
              <div>
                <h4>{item.title}</h4>
                <p>
                  {item.description === null
                    ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia aut magni debitis dolores dicta amet eum, quam sed, quia perferendis modi! Doloremque illo magnam porro non quod? Asperiores, similique repudiandae"
                    : item.description}
                </p>
                <p>{formatDate(item.publishedAt)}</p>
              </div>
              <div className={`close-btn-${viewMode}`}>
                <button className="close-btn">❌</button>
              </div>
            </div>
          ))}
        </main>
      )}

      <footer className="pagination">
        {[1, 2, 3].map((page) => (
          <button
            key={page}
            className={currentPage === page ? "active" : ""}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </footer>
      {feedBackview && (
        <div className="feeback-form">
          <FeedbackForm />
        </div>
      )}
    </div>
  );
};

export default App;
