import { Routes, Route } from "react-router-dom";
import GoogleLogin from "./components/GoogleLogin";
import HomePage from "./pages/HomePage";
import GuidePage from "./pages/GuidePage";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<GoogleLogin />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/guide" element={<GuidePage />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
}

export default App;
