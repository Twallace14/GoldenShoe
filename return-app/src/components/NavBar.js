import ResponsiveNav from '@rsuite/responsive-nav';
import React from 'react';
import { Navbar, Nav } from 'rsuite';
import '../App.css';

const NavBar = () => {
  return (
    <Navbar>
      <Navbar.Body>
        <ResponsiveNav>
          <Nav.Item>Mens</Nav.Item>
          <Nav.Item>Women</Nav.Item>
          <Nav.Item>Brands</Nav.Item>
          <Nav.Item>FAQ</Nav.Item>
          <Nav.Item>Stores</Nav.Item>
        </ResponsiveNav>
      </Navbar.Body>
    </Navbar>
  );
};

export default NavBar;
