import Home from "../pages/home";
import Setting from "../pages/setting";
export const configRouter = [
  {
    path: "/",
    pageName: "home",
    component: Home,
  },
  {
    path: "/setting",
    pageName: "setting",
    component: Setting,
  }
];
