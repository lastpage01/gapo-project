import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import DefaultLayout from "./layout/default";
import Authentication from "./pages/authentication";
import Home from "./pages/home";
import Setting from "./pages/setting";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/home"
            element={<DefaultLayout child={<Home />} page={"home"} />}
          />
          <Route
            path="/setting"
            element={<DefaultLayout child={<Setting />} page={"setting"} />}
          />
          <Route path="/" element={<Authentication />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
