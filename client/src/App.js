import { Routes, Route } from "react-router-dom";
import { GoogleLoginButton } from "./login/GoogleLoginButton";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<GoogleLoginButton />} />
    </Routes>
  );
}

export default App;
