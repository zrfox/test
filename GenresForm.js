import React, { useState, useEffect } from "react";
const crud_address = process.env.REACT_APP_CRUD_PATH || 'http://localhost:3001';

function GenresForm({dd_menu_data, refreshData}) {
    
        const [genreName, setGenreName] = useState('');
    
        const handleInsertGenre = async (e) => {
        e.preventDefault();
        await fetch(crud_address + '/api/genres/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ genre_name: genreName }),
        });
        setGenreName('');
        refreshData();
      };
    
    return (
        <>
            <form onSubmit={handleInsertGenre}>
                <label>Add Genre</label>
                <input type='text' placeholder='Enter genre name' value={genreName} onChange={(e => setGenreName(e.target.value))}></input>
                <button type="submit">Add</button>
            </form>
            <form>
                <label>Update Genre</label>
                <select id="genre" name="genre">
                    <option value="" disabled /*selected*/>Select a Genre to Update</option>
                    {dd_menu_data !== null ? dd_menu_data.map((item, index) => (
            <option key={item.genre_id} value={item.genre_id}>ID: {item.genre_id}, {item.genre_name}</option>
        )) : <></>}
                </select>
                <input type='text' placeholder='Enter new genre name'></input>
                <button type="submit">Update</button>
            </form>
        </>
    )
}

export default GenresForm;
