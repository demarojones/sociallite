import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

const NavBar = () => {
  return (
    <Menu inverted borderless fixed="top">
      <Container text>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" />
          <header className="App-header">REACTIVITIES</header>
        </Menu.Item>
        <Menu.Item header>Activities</Menu.Item>
        <Menu.Item>
          <Button positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
