import React, { useEffect } from "react";
import { IconIc24Line15CheckMarkCircle } from "@gapo_ui/icon";
import { IconIc24FillChevronLeft } from "@gapo_ui/icon";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { getMe } from "../store/slices/userSlice";
import { useNavigate } from "react-router";
// import { useSelector } from "react-redux";
// import { RootState } from "../store";
const titleValueAndIcon = (
  page: string
): { title: string; icon: JSX.Element | null } => {
  switch (page) {
    case "home":
      return {
        title: "Task Management",
        icon: <IconIc24Line15CheckMarkCircle />,
      };
    case "setting":
      return {
        title: "Setting",
        icon: <IconIc24FillChevronLeft />,
      };
    default:
      return {
        title: "",
        icon: null,
      };
  }
};
type Layout = {
  children: JSX.Element;
  page: string;
};
const DefaultLayout = ({ children, page }: Layout): JSX.Element => {
  const { title, icon } = titleValueAndIcon(page);
  // const { isLoggedIn } = useSelector((state: RootState) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe({ onErr: () => navigate("/login") }));
  }, [dispatch, navigate]);
  return (
    <>
      <Header title={title} icon={icon} />
      {children}
    </>
  );
};

export default DefaultLayout;
