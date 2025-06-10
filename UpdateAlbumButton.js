import { useState } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const crud_address = process.env.REACT_APP_CRUD_PATH || 'http://localhost:3001';

function UpdateAlbumButton({ album_details_id, album_name, refreshData }) {
  const [userFormData, setUserFormData] = useState({ albumName: album_name });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setShow(false);

    try {
      fetch(crud_address + '/api/album-details/' + album_details_id, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          album_name: userFormData.albumName,
        }),
      })
        .then(response => response.json())
        .then((result) => {
          refreshData();
        });
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      albumName: '',
    });
  };

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        <i className="bi bi-pencil-fill"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Album Detsils</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor='albumName'>Album Name</Form.Label>
              <Form.Control
                type='text'
                placeholder={album_name}
                name='albumName'
                onChange={handleInputChange}
                value={userFormData.albumName}
                required
              />
              <Form.Control.Feedback type='invalid'>Album name is required!</Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Update
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default UpdateAlbumButton;