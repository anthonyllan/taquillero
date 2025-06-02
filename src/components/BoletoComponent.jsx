import React, { useEffect, useState } from 'react';
import { listBoletos, guardarBoleto, actualizarBoleto, eliminarBoleto } from '../services/BoletoService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';

export const BoletoComponent = () => {
  const [boletos, setBoletos] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [currentBoleto, setCurrentBoleto] = useState({
    idBoleto: '',
    numeroAsiento: '',
    precio: 0,
    fechaCompra: '',
    idEvento: ''
  });

  useEffect(() => {
    listBoletos()
      .then((response) => setBoletos(response.data))
      .catch((err) => setError(err.message));
  }, []);

  const handleShowModal = (type, boleto = {}) => {
    setModalType(type);
    setCurrentBoleto(boleto);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBoleto({ ...currentBoleto, [name]: value });
  };

  const handleSubmit = () => {
    if (modalType === 'add') {
      guardarBoleto(currentBoleto)
        .then((response) => {
          setBoletos([...boletos, response.data]);
          handleCloseModal();
        })
        .catch((err) => setError(err.message));
    } else if (modalType === 'edit') {
      actualizarBoleto(currentBoleto.idBoleto, currentBoleto)
        .then((response) => {
          const updatedBoletos = boletos.map((boleto) =>
            boleto.idBoleto === currentBoleto.idBoleto ? response.data : boleto
          );
          setBoletos(updatedBoletos);
          handleCloseModal();
        })
        .catch((err) => setError(err.message));
    }
  };

  const handleDelete = (id) => {
    eliminarBoleto(id)
      .then(() => {
        setBoletos(boletos.filter((boleto) => boleto.idBoleto !== id));
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Boletos</h2>
      {error && <p className="text-danger">Error: {error}</p>}
      <Button variant="primary" onClick={() => handleShowModal('add')}>Agregar Boleto</Button>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Número de Asiento</th>
            <th>Precio</th>
            <th>Fecha de Compra</th>
            <th>Evento ID</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {boletos.map((boleto) => (
            <tr key={boleto.idBoleto}>
              <td>{boleto.idBoleto}</td>
              <td>{boleto.fechaCompra}</td>
              <td>${boleto.precioBoleto}</td>
              <td>{boleto.idPago}</td>
              <td>{boleto.idEvento}</td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => handleShowModal('edit', boleto)}>
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(boleto.idBoleto)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === 'add' ? 'Agregar Boleto' : 'Editar Boleto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNumeroAsiento" className="mb-3">
              <Form.Label>Número de Asiento</Form.Label>
              <Form.Control
                type="text"
                name="numeroAsiento"
                value={currentBoleto.numeroAsiento}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPrecio" className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="precio"
                value={currentBoleto.precio}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formFechaCompra" className="mb-3">
              <Form.Label>Fecha de Compra</Form.Label>
              <Form.Control
                type="date"
                name="fechaCompra"
                value={currentBoleto.fechaCompra}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formIdEvento" className="mb-3">
              <Form.Label>ID Evento</Form.Label>
              <Form.Control
                type="number"
                name="idEvento"
                value={currentBoleto.idEvento}
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