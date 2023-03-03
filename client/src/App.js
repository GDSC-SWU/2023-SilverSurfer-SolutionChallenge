import { Routes, Route } from "react-router-dom";
import { GoogleLogin } from "./login/GoogleLogin";
import { HomePage } from "./main/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<GoogleLogin />} />
      <Route path="/home/*" element={<HomePage />} />
    </Routes>
  );
}

export default App;
