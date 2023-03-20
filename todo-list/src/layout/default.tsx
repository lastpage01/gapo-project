import React from "react";
import { IconIc24Line15CheckMarkCircle } from "@gapo_ui/icon";
import { IconIc24FillChevronLeft } from "@gapo_ui/icon";
import Header from "../components/Header";
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
  child: JSX.Element;
  page: string;
};
const DefaultLayout = ({ child, page }: Layout): JSX.Element => {
  const { title, icon } = titleValueAndIcon(page);
  return (
    <>
      <Header title={title} icon={icon} />
      {child}
    </>
  );
};

export default DefaultLayout;
