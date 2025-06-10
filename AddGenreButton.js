import { useState } from 'react';
import { Form, Button, Alert, Modal} from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const crud_address = process.env.REACT_APP_CRUD_PATH || 'http://localhost:3001';

function AddGenreButton({ refreshData }) {
    const [userFormData, setUserFormData] = useState({ genreName: '' });
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
            fetch(crud_address + '/api/genres/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    genre_name: userFormData.genreName,
                }),
            })
            .then(response => response.text())
            .then((result) => {
                console.log(result);
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
            <Button variant="outline-primary" onClick={handleShow}>
                Add Genre
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Genre</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor='genreName'>Genre Name</Form.Label>
                            <Form.Control
                            type='text'
                            placeholder='Genre Name'
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
                    Add
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>            
        </>
    )
}

export default AddGenreButton;