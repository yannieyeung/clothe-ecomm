import "./categories.style.scss";
// import Directory from './components/directory/directory.component';
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";

import { Routes, Route } from "react-router-dom";
import Authentication from "./routes/authentication/authentication.component";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
}

export default App;
