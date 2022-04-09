import "./categories.style.scss";
// import Directory from './components/directory/directory.component';
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";

import { Routes, Route } from "react-router-dom";
import SignIn from "./routes/sign-in/sign-in.component";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;
