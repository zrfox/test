import { useState, useEffect } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const crud_address = process.env.REACT_APP_CRUD_PATH || 'http://localhost:3001';

function AddInventoryButton({ refreshData }) {
  const [userFormData, setUserFormData] = useState({ albumID: null, mediaID: 1, conditionID: 1, cost: 0, quantity: 0 });
  const [show, setShow] = useState(false);
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

      const urlsToFetch = ['/api/album-details/']

      const promises = urlsToFetch.map(url => {
        return fetch(crud_address + url, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
        })
      })
      let responses;

      responses = await Promise.allSettled(promises);

      const fulfilledResponses = await Promise.all(responses.filter(r => r.status === "fulfilled")
        .map(r => r.value.json()));

      const [albumDetailsData = []] = fulfilledResponses;
      //const json = await response.json();
      const album_default = albumDetailsData[0] ? albumDetailsData[0].album_details_id : null;
      setAlbumDetails(albumDetailsData);
      setUserFormData({ ...userFormData, albumID: album_default });
      console.log("Data initialized.")
    }
    catch (e) {

    }
    finally {

    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(crud_address + '/api/inventory/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        album_id: parseInt(userFormData.albumID),
        media_type: userFormData.mediaID,
        condition_type: userFormData.conditionID,
        cost: parseFloat(userFormData.cost),
        quantity: parseInt(userFormData.quantity)
      }),
    });
    setUserFormData({
      albumID: null,
      mediaID: 1,
      conditionID: 1,
      cost: 0,
      quantity: 0
    });
    refreshData();
  };

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        Add Inventory Item
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Inventory Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor='albumID'>Select an Album</Form.Label>
              <Form.Select name='albumID' value={userFormData.albumID} onChange={handleInputChange}>
                {albumDetailsData.almbumID !== null ? albumDetailsData.map((item, index) => (
                  <option key={item.album_details_id} value={item.album_details_id}>ID: {item.album_details_id}, {item.album_name}</option>
                )) : <></>}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor='mediaID'>Select Media Type</Form.Label>
              <Form.Select name='mediaID' value={userFormData.mediaID} onChange={handleInputChange}>
                <option value="">Select Media Type</option>
                <option value="1">vinyl</option>
                <option value="2">cassette</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor='conditionID'>Select Condition</Form.Label>
              <Form.Select name='conditionID' value={userFormData.conditionID} onChange={handleInputChange}>
                <option value="1">new</option>
                <option value="2">used</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor='cost'>Enter Cost</Form.Label>
              <Form.Control
                type='number'
                min="0"
                placeholder='Cost'
                name='cost'
                onChange={handleInputChange}
                value={userFormData.cost}
                required
              />
              <Form.Control.Feedback type='invalid'>Cost is required!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor='cost'>Enter Quantity</Form.Label>
              <Form.Control
                type='number'
                min="0"
                placeholder='Quantity'
                name='quanity'
                onChange={handleInputChange}
                value={userFormData.quanity}
                required
              />
              <Form.Control.Feedback type='invalid'>Quanity is required!</Form.Control.Feedback>
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

export default AddInventoryButton;