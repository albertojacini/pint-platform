// import useShop from "@saleor/hooks/useShop";
import React from "react";
import { Helmet } from "react-helmet";

interface WindowTitleProps {
  title: string;
}

export const WindowTitle: React.FC<WindowTitleProps> = ({ title }) => {
  // const shop = useShop();

  return !title ? null : (
    <Helmet title={`${title}`} />
  );
};