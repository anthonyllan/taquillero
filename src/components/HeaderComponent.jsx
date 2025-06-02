import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const HeaderComponent = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <i className="bi bi-calendar-event me-2"></i>
            Sistema de Eventos y Boletos
          </Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/plazas">
              <Nav.Link>
                <i className="bi bi-building me-1"></i>
                Plazas
              </Nav.Link>
            </LinkContainer>
            
            <LinkContainer to="/eventos">
              <Nav.Link>
                <i className="bi bi-calendar-event me-1"></i>
                Eventos
              </Nav.Link>
            </LinkContainer>
            
            <LinkContainer to="/boletos">
              <Nav.Link>
                <i className="bi bi-ticket-perforated me-1"></i>
                Boletos
              </Nav.Link>
            </LinkContainer>
          </Nav>
          
          <Nav className="ms-auto">
            <Nav.Text className="text-light">
              <i className="bi bi-person-circle me-1"></i>
              Bienvenido, {import.meta.env.VITE_USER_NAME || 'Anthony'}
            </Nav.Text>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderComponent;