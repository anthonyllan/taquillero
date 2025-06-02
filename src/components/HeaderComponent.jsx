import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const HeaderComponent = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{ borderBottom: "1px solid #21262d" }}>
      <Container>
        <Navbar.Brand href="/" style={{ fontWeight: 'bold', letterSpacing: 1 }}>
          <i className="bi bi-github me-2" /> Taquillero de lucha libre
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/plazas">
              <Nav.Link>Plazas</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/eventos">
              <Nav.Link>Eventos</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/boletos">
              <Nav.Link>Boletos</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderComponent;