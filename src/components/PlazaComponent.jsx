import React, { useEffect, useState } from 'react';
import { listplazas, guardarPlaza, actualizarPlaza, eliminarPlaza } from '../services/PlazaService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';

export const PlazaComponent = () => {
  const [plazas, setPlazas] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [currentPlaza, setCurrentPlaza] = useState({
    idPlaza: '',
    nombrePlaza: '',
    ubicacionPlaza: '',
    capacidadPlaza: 0
  });

  useEffect(() => {
    listplazas()
      .then((response) => setPlazas(response.data))
      .catch((err) => setError(err.message));
  }, []);

  const handleShowModal = (type, plaza = {}) => {
    setModalType(type);
    setCurrentPlaza(plaza);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPlaza({ ...currentPlaza, [name]: value });
  };

  const handleSubmit = () => {
    if (modalType === 'add') {
      guardarPlaza(currentPlaza)
        .then((response) => {
          setPlazas([...plazas, response.data]);
          handleCloseModal();
        })
        .catch((err) => setError(err.message));
    } else if (modalType === 'edit') {
      actualizarPlaza(currentPlaza.idPlaza, currentPlaza)
        .then((response) => {
          const updatedPlazas = plazas.map((plaza) =>
            plaza.idPlaza === currentPlaza.idPlaza ? response.data : plaza
          );
          setPlazas(updatedPlazas);
          handleCloseModal();
        })
        .catch((err) => setError(err.message));
    }
  };

  const handleDelete = (id) => {
    eliminarPlaza(id)
      .then(() => {
        setPlazas(plazas.filter((plaza) => plaza.idPlaza !== id));
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Plazas</h2>
      {error && <p className="text-danger">Error: {error}</p>}
      <Button variant="primary" onClick={() => handleShowModal('add')}>Agregar Plaza</Button>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Identificador</th>
            <th>Nombre</th>
            <th>Ubicación</th>
            <th>Capacidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {plazas.map((plaza) => (
            <tr key={plaza.idPlaza}>
              <td>{plaza.idPlaza}</td>
              <td>{plaza.nombrePlaza}</td>
              <td>{plaza.ubicacionPlaza}</td>
              <td>{plaza.capacidadPlaza}</td>
              <td>
                <Button variant="warning" onClick={() => handleShowModal('edit', plaza)}>Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(plaza.idPlaza)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === 'add' ? 'Agregar Plaza' : 'Editar Plaza'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombrePlaza">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombrePlaza"
                value={currentPlaza.nombrePlaza}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formUbicacionPlaza">
              <Form.Label>Ubicación</Form.Label>
              <Form.Control
                type="text"
                name="ubicacionPlaza"
                value={currentPlaza.ubicacionPlaza}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formCapacidadPlaza">
              <Form.Label>Capacidad</Form.Label>
              <Form.Control
                type="number"
                name="capacidadPlaza"
                value={currentPlaza.capacidadPlaza}
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