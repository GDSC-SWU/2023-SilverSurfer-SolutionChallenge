import { Routes, Route } from "react-router-dom";
import GoogleLogin from "./components/GoogleLogin";
import HomePage from "./pages/Home";
import GuidePage from "./pages/Guide";
import MyPage from "./pages/MyPage";
import CardDetail from "./components/Card/CardDetail";
import SearchResult from "./pages/SearchResultPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<GoogleLogin />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/guide" element={<GuidePage />} />
      <Route path="/content/:postId" element={<CardDetail />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/search/*" element={<SearchResult />} />
    </Routes>
  );
}

export default App;
