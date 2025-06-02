import React, { useEffect, useState } from 'react';
import { listEventos, guardarEvento, actualizarEvento, eliminarEvento } from '../services/EventoService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';

export const EventoComponent = () => {
  const [eventos, setEventos] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [currentEvento, setCurrentEvento] = useState({
    idEvento: '',
    tipoEvento: '',
    fechaHora: '',
    idPlaza: ''
  });

  useEffect(() => {
    listEventos()
      .then((response) => setEventos(response.data))
      .catch((err) => setError(err.message));
  }, []);

  const handleShowModal = (type, evento = {}) => {
    setModalType(type);
    if (type === 'add') {
      setCurrentEvento({
        idEvento: '',
        tipoEvento: '',
        fechaHora: '',
        idPlaza: ''
      });
    } else {
      // Para editar, convertir la fecha al formato correcto para el input datetime-local
      const fechaFormateada = evento.fechaHora ? 
        new Date(evento.fechaHora).toISOString().slice(0, 16) : '';
      setCurrentEvento({
        ...evento,
        fechaHora: fechaFormateada
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvento({ ...currentEvento, [name]: value });
  };

  const handleSubmit = () => {
    // Preparar el objeto para enviar al backend
    const eventoParaEnviar = {
      ...currentEvento,
      // Convertir la fecha al formato que espera el backend (Date)
      fechaHora: currentEvento.fechaHora ? new Date(currentEvento.fechaHora).toISOString() : null
    };

    if (modalType === 'add') {
      guardarEvento(eventoParaEnviar)
        .then((response) => {
          setEventos([...eventos, response.data]);
          handleCloseModal();
        })
        .catch((err) => setError(err.message));
    } else if (modalType === 'edit') {
      actualizarEvento(currentEvento.idEvento, eventoParaEnviar)
        .then((response) => {
          const updatedEventos = eventos.map((evento) =>
            evento.idEvento === currentEvento.idEvento ? response.data : evento
          );
          setEventos(updatedEventos);
          handleCloseModal();
        })
        .catch((err) => setError(err.message));
    }
  };

  const handleDelete = (id) => {
    eliminarEvento(id)
      .then(() => {
        setEventos(eventos.filter((evento) => evento.idEvento !== id));
      })
      .catch((err) => setError(err.message));
  };

  // Función para formatear la fecha para mostrar
  const formatearFecha = (fecha) => {
    if (!fecha) return '';
    return new Date(fecha).toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Eventos</h2>
      {error && <p className="text-danger">Error: {error}</p>}
      <Button variant="primary" onClick={() => handleShowModal('add')}>Agregar Evento</Button>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo evento</th>
            <th>Fecha y Hora</th>
            <th>Plaza ID</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {eventos.map((evento) => (
            <tr key={evento.idEvento}>
              <td>{evento.idEvento}</td>
              <td>{evento.tipoEvento}</td>
              <td>{formatearFecha(evento.fechaHora)}</td>
              <td>{evento.idPlaza}</td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => handleShowModal('edit', evento)}>
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(evento.idEvento)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === 'add' ? 'Agregar Evento' : 'Editar Evento'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTipoEvento" className="mb-3">
              <Form.Label>Tipo de Evento</Form.Label>
              <Form.Control
                type="text"
                name="tipoEvento"
                value={currentEvento.tipoEvento}
                onChange={handleInputChange}
                placeholder="Ej: Concierto, Conferencia, etc."
              />
            </Form.Group>
            <Form.Group controlId="formFechaHora" className="mb-3">
              <Form.Label>Fecha y Hora</Form.Label>
              <Form.Control
                type="datetime-local"
                name="fechaHora"
                value={currentEvento.fechaHora}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formIdPlaza" className="mb-3">
              <Form.Label>ID Plaza</Form.Label>
              <Form.Control
                type="number"
                name="idPlaza"
                value={currentEvento.idPlaza}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {modalType === 'add' ? 'Agregar' : 'Guardar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};