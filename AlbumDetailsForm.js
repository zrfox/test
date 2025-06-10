import React, { useState, useEffect } from "react";
const crud_address = process.env.REACT_APP_CRUD_PATH || 'http://localhost:3001';

function AlbumDetailsForm({dd_menu_data, refreshData}) {
    
    const [albumName, setAlbumName] = useState('');


     const handleInsertAlbumDetails = async (e) => {
        e.preventDefault();
        await fetch(crud_address + '/api/album-details/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ album_name: albumName }),
        });
        setAlbumName('');
        refreshData();
      };
    
    return (
        <>
            <form onSubmit={handleInsertAlbumDetails}>
                <label>Add Album Details</label>
                <input type='text' placeholder='Enter album name' value={albumName} onChange={(e => setAlbumName(e.target.value))}></input>
                <button type="submit">Add</button>
            </form>
            <form>
                <label htmlFor="album-details">Update Album Details</label>
                <select id="details" name="details">
                    {dd_menu_data !== null ? dd_menu_data.map((item, index) => (
            <option key={item.album_details_id} value={item.album_details_id}>ID: {item.album_details_id}, {item.album_name}</option>
        )) : <></>}
                </select>
                <input type='text' placeholder='Enter new album name'></input>
                <button type="submit">Update</button>
            </form>
        </>
    )
}

export default AlbumDetailsForm;
