import { useState } from 'react';
import { Form, Button, Alert, Modal} from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const crud_address = process.env.REACT_APP_CRUD_PATH || 'http://localhost:3001';

function UpdateGenreButton({ genre_id, genre_name, refreshData }) {
    const [userFormData, setUserFormData] = useState({ genreName: genre_name });
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
            fetch(crud_address + '/api/genres/' + genre_id, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    genre_name: userFormData.genreName,
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
            genreName: '',
        });
      };

    return (
        <>
            <Button variant="outline-primary me-2" onClick={handleShow}>
                <i className="bi bi-pencil-fill"></i>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Genre</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor='genreName'>Genre Name</Form.Label>
                            <Form.Control
                            type='text'
                            placeholder={genre_name}
                            name='genreName'
                            onChange={handleInputChange}
                            value={userFormData.genreName}
                            required
                            />
                            <Form.Control.Feedback type='invalid'>Genre name is required!</Form.Control.Feedback>
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

export default UpdateGenreButton;