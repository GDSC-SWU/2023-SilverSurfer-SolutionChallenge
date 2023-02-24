import { Routes, Route } from "react-router-dom";
import { GoogleLogin } from "./login/GoogleLogin";
import { Container } from "./GlobalStyle";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/login" element={<GoogleLogin />} />
      </Routes>
    </Container>
  );
}

export default App;
