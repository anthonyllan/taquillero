import React from 'react';
import './App.css';
import './github-theme.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import { PlazaComponent } from './components/PlazaComponent';
import { EventoComponent } from './components/EventoComponent';
import { BoletoComponent } from './components/BoletoComponent';

function App() {
  return (
    <BrowserRouter>
    <div>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<PlazaComponent />} /> {/* <FooterComponent /> */}
        <Route path="/plazas" element={<PlazaComponent />} />
        <Route path="/eventos" element={<EventoComponent />} />
        <Route path="/boletos" element={<BoletoComponent />} />
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;