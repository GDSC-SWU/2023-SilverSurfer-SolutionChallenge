import { Routes, Route } from "react-router-dom";
import { GoogleLoginButton } from "./login/GoogleLoginButton";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<GoogleLoginButton />} />
      </Routes>
    </div>
  );
}

export default App;
