import { Routes, Route } from "react-router-dom";
import { GoogleLogin } from "./login/GoogleLogin";
import { HomePage } from "./main/HomePage";
import { GuidePage } from "./Content/GuidePage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<GoogleLogin />} />
      <Route path="/home/*" element={<HomePage />} />
      <Route path="/guide" element={<GuidePage />} />
    </Routes>
  );
}

export default App;
