import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import DefaultLayout from "./layout/default";
import Authentication from "./pages/authentication";
import { configRouter } from "./routers/config.router";
import PrivateRouter from "./routers/private.router";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Authentication />} />
          {configRouter.map((page) => {
            const Page = page.component;
            return (
              <Route
                key={page.path}
                path={page.path}
                element={
                  <PrivateRouter>
                    <DefaultLayout page={page.pageName}>
                      <Page />
                    </DefaultLayout>
                  </PrivateRouter>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </>
  );
}

export default App;
