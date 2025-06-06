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
    fechaCompra: '',
    precioBoleto: 0,
    idPago: '',
    idEvento: ''
  });

  useEffect(() => {
    listBoletos()
      .then((response) => setBoletos(response.data))
      .catch((err) => setError(err.message));
  }, []);

  const handleShowModal = (type, boleto = {}) => {
    setModalType(type);
    if (type === 'add') {
      setCurrentBoleto({
        idBoleto: '',
        fechaCompra: '',
        precioBoleto: 0,
        idPago: '',
        idEvento: ''
      });
    } else {
      // Para editar, convertir la fecha al formato correcto para el input date
      const fechaFormateada = boleto.fechaCompra ? 
        new Date(boleto.fechaCompra).toISOString().split('T')[0] : '';
      setCurrentBoleto({
        ...boleto,
        fechaCompra: fechaFormateada
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Convertir precio a número
    const finalValue = name === 'precioBoleto' ? parseFloat(value) || 0 : value;
    setCurrentBoleto({ ...currentBoleto, [name]: finalValue });
  };

  const handleSubmit = () => {
    // Preparar el objeto para enviar al backend
    const boletoParaEnviar = {
      ...currentBoleto,
      // Convertir la fecha al formato que espera el backend
      fechaCompra: currentBoleto.fechaCompra ? new Date(currentBoleto.fechaCompra).toISOString() : null,
      // Asegurar que el precio sea un número
      precioBoleto: parseFloat(currentBoleto.precioBoleto) || 0
    };

    if (modalType === 'add') {
      guardarBoleto(boletoParaEnviar)
        .then((response) => {
          setBoletos([...boletos, response.data]);
          handleCloseModal();
        })
        .catch((err) => setError(err.message));
    } else if (modalType === 'edit') {
      actualizarBoleto(currentBoleto.idBoleto, boletoParaEnviar)
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

  // Función para formatear la fecha para mostrar
  const formatearFecha = (fecha) => {
    if (!fecha) return '';
    return new Date(fecha).toLocaleDateString('es-ES');
  };

  // Función para formatear el precio
  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(precio || 0);
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
            <th>Fecha de Compra</th>
            <th>Precio</th>
            <th>ID Pago</th>
            <th>ID Evento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {boletos.map((boleto) => (
            <tr key={boleto.idBoleto}>
              <td>{boleto.idBoleto}</td>
              <td>{formatearFecha(boleto.fechaCompra)}</td>
              <td>{formatearPrecio(boleto.precioBoleto)}</td>
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
            <Form.Group controlId="formFechaCompra" className="mb-3">
              <Form.Label>Fecha de Compra</Form.Label>
              <Form.Control
                type="date"
                name="fechaCompra"
                value={currentBoleto.fechaCompra}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPrecioBoleto" className="mb-3">
              <Form.Label>Precio del Boleto</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                min="0"
                name="precioBoleto"
                value={currentBoleto.precioBoleto}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formIdPago" className="mb-3">
              <Form.Label>ID Pago</Form.Label>
              <Form.Control
                type="number"
                name="idPago"
                value={currentBoleto.idPago}
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