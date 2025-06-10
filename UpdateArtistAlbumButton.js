import { useState, useEffect } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const crud_address = process.env.REACT_APP_CRUD_PATH || 'http://localhost:3001';

function UpdateArtistAlbumButton({ artist_id, album_details_id, refreshData }) {
  const [userFormData, setUserFormData] = useState({ artistID: artist_id, albumID: album_details_id });
  const [show, setShow] = useState(false);
  const [artistsData, setArtists] = useState([]);
  const [albumDetailsData, setAlbumDetails] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const fetchData = async () => {
      try {
        // inconsistent end slashes in array, problem? 
  
        const urlsToFetch = ['/api/artists/', '/api/album-details/']
  
        const promises = urlsToFetch.map(url => {
          return fetch(crud_address + url, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
          })
        })
        const responses = await Promise.allSettled(promises);
  
        const fulfilledResponses = await Promise.all(responses.filter(r => r.status === "fulfilled")
          .map(r => r.value.json()));
  
        const [artistsData = [], albumDetailsData = []] = fulfilledResponses;
        //const json = await response.json();
        setArtists(artistsData);
        setAlbumDetails(albumDetailsData);
      }
      catch (e) {
  
      }
      finally {
  
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);

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
      fetch(crud_address + '/api/artist-album-details', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          artist_id: artist_id,
          album_details_id: album_details_id,
          new_artist_id: userFormData.artistID,
          new_album_details_id: userFormData.albumID
        }),
      })
        .then(response => response.text())
        .then((result) => {
          refreshData();
        });
    } catch (err) {
      console.error(err);
    }

  };

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        <i className="bi bi-pencil-fill"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Artist-Album Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor='artistID'>Select an Artist</Form.Label>
              <Form.Select name='artistID' value={userFormData.artistID} onChange={handleInputChange}>
                {artistsData !== null ? artistsData.map((item, index) => (
                  <option key={item.artist_id} value={item.artist_id}>ID: {item.artist_id}, {item.artist_name}</option>
                )) : <></>}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor='albumID'>Select an Album</Form.Label>
              <Form.Select name='albumID' value={userFormData.albumID} onChange={handleInputChange}>
                {albumDetailsData !== null ? albumDetailsData.map((item, index) => (
                  <option key={item.album_details_id} value={item.album_details_id}>ID: {item.album_details_id}, {item.album_name}</option>
                )) : <></>}
              </Form.Select>
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

export default UpdateArtistAlbumButton;