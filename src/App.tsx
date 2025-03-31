import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewsPage from "./Components/NewsPage";
import FeedbackForm from "./Components/FeedBack";
import { createContext, useState } from "react";

interface FeedbackContextType {
  feedBackview: boolean;
  setfeedbackView: React.Dispatch<React.SetStateAction<boolean>>;
}
export const FeedbackContext = createContext<FeedbackContextType|undefined>(undefined);
function App() {
  const [feedBackview, setfeedbackView] = useState<boolean>(false);
  return (
    <FeedbackContext.Provider value={{ feedBackview, setfeedbackView }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NewsPage />} />
          <Route path="/feedback" element={<FeedbackForm />} />
        </Routes>
      </BrowserRouter>
    </FeedbackContext.Provider>
  );
}

export default App;
