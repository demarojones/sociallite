import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
interface IProps {
  openCreateForm: () => void;
}
const NavBar: React.FC<IProps> = ({ openCreateForm }) => {
  return (
    <Menu inverted borderless fixed="top">
      <Container text>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
          <header className="App-header">REACTIVITIES</header>
        </Menu.Item>
        <Menu.Item header>Activities</Menu.Item>
        <Menu.Item>
          <Button
            onClick={() => openCreateForm()}
            positive
            content="Create Activity"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
