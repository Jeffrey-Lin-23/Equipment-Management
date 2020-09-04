import React from "react";
import { Container } from "reactstrap";
import { NavCopy } from "./NavCopy";

const Layout = ({ children }) => {
  return (
    <div>
      <NavCopy />
      <Container>{children}</Container>
    </div>
  );
};

export default Layout;
