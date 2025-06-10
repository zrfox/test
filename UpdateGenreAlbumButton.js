import { useState } from 'react';
import { Form, Button, Alert, Modal, NavItem} from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const crud_address = process.env.REACT_APP_CRUD_PATH || 'http://localhost:3001';

function UpdateGenreAlbumButton({ genre_id, genre_name, album_details_id, album_name, genresData, albumDetailsData, refreshData }) {
    const [userFormData, setUserFormData] = useState({ genre_id: genre_id, 
                                                       album_details_id: album_details_id,
                                                     });
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: parseInt(value) });
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
            fetch(crud_address + '/api/genre-album-details/', { // removed id since bridge tables don't use id currently
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                // include old ids to identify update target, new names will replace old. 
                body: JSON.stringify({
                    genre_id: genre_id,
                    album_details_id: album_details_id,
                    new_genre_id: userFormData.genre_id,
                    new_album_id: userFormData.album_details_id,
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
            genre_id: genre_id,
            album_details_id: album_details_id,
        });
      };

    return (
        <>
            <Button variant="outline-primary me-2" onClick={handleShow}>
                <i className="bi bi-pencil-fill"></i>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Genre Album</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor='genre_id'>Genre Name</Form.Label>
                                <Form.Select
                                placeholder={genre_name}
                                name='genre_id'
                                onChange={handleInputChange}
                                value={userFormData.genre_id}
                                required
                                >
                                {genresData.map((item, index) => (
                                    <option key={index} value={item.genre_id}>{item.genre_name}</option> // double-check album_id and album_name is correct for genresData
                                    ))}
                                </Form.Select>
                            <Form.Control.Feedback type='invalid'>Genre name is required!</Form.Control.Feedback>
                            <Form.Label htmlFor='album_details_id'>Album Name</Form.Label>
                                <Form.Select                        
                                placeholder={album_name}
                                name='album_details_id'
                                onChange={handleInputChange}
                                value={userFormData.album_details_id}
                                required
                                >
                                {albumDetailsData.map((item, index) => (
                                    <option key={index} value={item.album_details_id}>{item.album_name}</option> // double-check album_id and album_name is correct for genresData
                                    ))}
                                </Form.Select>
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

export default UpdateGenreAlbumButton;