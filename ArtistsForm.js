import React, { useState, useEffect } from "react";
const crud_address = process.env.REACT_APP_CRUD_PATH || 'http://localhost:3001';

function ArtistsForm({ dd_menu_data, refreshData }) {
    
    const [artistName, setArtistName] = useState('');

    const handleInsertArtist = async (e) => {
    e.preventDefault();
    await fetch(crud_address + '/api/artists/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ artist_name: artistName }),
    });
    setArtistName('');
    refreshData();
  };
    
    return (
        <>
            <form onSubmit={handleInsertArtist}>
                <label>Add Artist</label>
                <input type='text' placeholder='Enter artist name' value={artistName} onChange={(e) => setArtistName(e.target.value)}/>
                <button type="submit">Add</button>
            </form>
        </>
    )
}

export default ArtistsForm;
