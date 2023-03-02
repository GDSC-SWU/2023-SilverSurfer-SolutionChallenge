import { Routes, Route } from "react-router-dom";
import { GoogleLogin } from "./login/GoogleLogin";
import { Container } from "./GlobalStyle";
import { HomePage } from "./main/HomePage";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/login" element={<GoogleLogin />} />
        <Route path="/home/*" element={<HomePage />} />
      </Routes>
    </Container>
  );
}

export default App;
