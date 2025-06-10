import { useState } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const crud_address = process.env.REACT_APP_CRUD_PATH || 'http://localhost:3001';

function UpdateArtistButton({ artist_id, artist_name, refreshData }) {
  const [userFormData, setUserFormData] = useState({ artistName: artist_name });
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
      fetch(crud_address + '/api/artists/' + artist_id, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          artist_name: userFormData.artistName,
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
      artistName: '',
    });
  };

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        <i className="bi bi-pencil-fill"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Artist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor='artistName'>Artist Name</Form.Label>
              <Form.Control
                type='text'
                placeholder={artist_name}
                name='artistName'
                onChange={handleInputChange}
                value={userFormData.artistName}
                required
              />
              <Form.Control.Feedback type='invalid'>Artist name is required!</Form.Control.Feedback>
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

export default UpdateArtistButton;