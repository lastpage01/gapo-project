import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";

import DefaultLayout from "./layout/default";
import Authentication from "./pages/authentication";
import Home from "./pages/home";
import Setting from "./pages/setting";
import { RootState } from "./store";
import { getMe } from "./store/slices/userSlice";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.users);
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

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
          <Route path="/" element={ !isLoggedIn?<Authentication />:<Navigate to={'/home'}/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
