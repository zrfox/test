import { useState } from 'react';
import { Form, Button, Alert, Modal} from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const crud_address = process.env.REACT_APP_CRUD_PATH || 'http://localhost:3001';

function AddGenreAlbumButton({ genresData, albumDetailsData, refreshData }) {
    const [userFormData, setUserFormData] = useState({ 
        new_genre_id: null,
        new_album_details_id: null}); //set to '' since no default placeholder value. Issue using '' for parseInt data? 
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
            fetch(crud_address + '/api/genre-album-details/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    new_genre_id: userFormData.new_genre_id,
                    new_album_details_id: userFormData.new_album_details_id,
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
            new_genre_id: userFormData.new_genre_id,
            new_album_details_id: userFormData.new_album_details_id,
        });
      };

    return (
        <>
            <Button variant="outline-primary" onClick={handleShow}>
                Add Genre
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Genre Album</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                                    <Form.Label htmlFor='new_genre_id'>Genre Name</Form.Label>
                            <Form.Select
                            placeholder='Genre Name'
                            name='new_genre_id'
                            onChange={handleInputChange}
                            value={userFormData.new_genre_id || ''}
                            required
                            >
                            <option value="" disabled hidden>Select a Genre</option>
                            {genresData.map((item, index) => (
                                <option key={index} value={item.genre_id}>{item.genre_name}</option> // double-check album_id and album_name is correct for genresData
                                ))}
                            </Form.Select>
                        <Form.Control.Feedback type='invalid'>Genre name is required!</Form.Control.Feedback>
                        <Form.Label htmlFor='new_album_details_id'>Album Name</Form.Label>
                            <Form.Select                        
                            placeholder='Album Name'
                            name='new_album_details_id'
                            onChange={handleInputChange}
                            value={userFormData.new_album_details_id || ''}
                            required
                            >
                            <option value="" disabled hidden>Select an Album</option>
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

export default AddGenreAlbumButton;