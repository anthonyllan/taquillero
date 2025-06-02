import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import { PlazaComponent } from './components/PlazaComponent';
import { EventoComponent } from './components/EventoComponent';
import { BoletoComponent } from './components/BoletoComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Componente de página de inicio
const HomePage = () => (
  <div className="container mt-5">
    <div className="row">
      <div className="col-12 text-center">
        <h1 className="display-4 mb-4">
          <i className="bi bi-calendar-event text-primary me-3"></i>
          Sistema de Gestión de Eventos y Boletos
        </h1>
        <p className="lead text-muted mb-5">
          Administra plazas, eventos y boletos desde una sola plataforma
        </p>
      </div>
    </div>
    
    <div className="row g-4">
      <div className="col-md-4">
        <div className="card h-100 shadow-sm">
          <div className="card-body text-center">
            <i className="bi bi-building display-1 text-primary mb-3"></i>
            <h5 className="card-title">Gestión de Plazas</h5>
            <p className="card-text">
              Administra las plazas donde se realizarán los eventos
            </p>
            <a href="/plazas" className="btn btn-primary">
              Ver Plazas
            </a>
          </div>
        </div>
      </div>
      
      <div className="col-md-4">
        <div className="card h-100 shadow-sm">
          <div className="card-body text-center">
            <i className="bi bi-calendar-event display-1 text-success mb-3"></i>
            <h5 className="card-title">Gestión de Eventos</h5>
            <p className="card-text">
              Crea y administra eventos en las diferentes plazas
            </p>
            <a href="/eventos" className="btn btn-success">
              Ver Eventos
            </a>
          </div>
        </div>
      </div>
      
      <div className="col-md-4">
        <div className="card h-100 shadow-sm">
          <div className="card-body text-center">
            <i className="bi bi-ticket-perforated display-1 text-warning mb-3"></i>
            <h5 className="card-title">Gestión de Boletos</h5>
            <p className="card-text">
              Administra la venta y distribución de boletos
            </p>
            <a href="/boletos" className="btn btn-warning">
              Ver Boletos
            </a>
          </div>
        </div>
      </div>
    </div>
    
    <div className="row mt-5">
      <div className="col-12">
        <div className="alert alert-info">
          <h5>
            <i className="bi bi-info-circle me-2"></i>
            Estado de los Microservicios
          </h5>
          <div className="row">
            <div className="col-md-6">
              <p className="mb-1">
                <strong>Microservicio Evento:</strong> 
                <span className="badge bg-success ms-2">En línea</span>
              </p>
              <small className="text-muted">104.209.2.74 - Puerto 1000</small>
            </div>
            <div className="col-md-6">
              <p className="mb-1">
                <strong>Microservicio Boleto:</strong> 
                <span className="badge bg-success ms-2">En línea</span>
              </p>
              <small className="text-muted">20.253.194.237 - Puerto 1003</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Componente para páginas no encontradas
const NotFound = () => (
  <div className="container mt-5 text-center">
    <div className="row">
      <div className="col-12">
        <i className="bi bi-exclamation-triangle display-1 text-warning"></i>
        <h1 className="mt-3">404 - Página no encontrada</h1>
        <p className="lead">La página que buscas no existe</p>
        <a href="/" className="btn btn-primary">
          <i className="bi bi-house me-2"></i>
          Ir al inicio
        </a>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <div className="min-vh-100 bg-light">
        <HeaderComponent />
        
        <main>
          <Routes>
            {/* Página de inicio */}
            <Route path="/" element={<HomePage />} />
            
            {/* Rutas de los microservicios */}
            <Route path="/plazas" element={<PlazaComponent />} />
            <Route path="/eventos" element={<EventoComponent />} />
            <Route path="/boletos" element={<BoletoComponent />} />
            
            {/* Redirecciones adicionales */}
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/index" element={<Navigate to="/" replace />} />
            
            {/* Página 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        {/* Footer opcional */}
        <footer className="bg-dark text-light text-center py-3 mt-5">
          <div className="container">
            <p className="mb-0">
              <i className="bi bi-c-circle me-1"></i>
              2025 Sistema de Eventos y Boletos - Anthony Llanganate
            </p>
            <small className="text-muted">
              Microservicios desplegados en Azure Kubernetes Service
            </small>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;