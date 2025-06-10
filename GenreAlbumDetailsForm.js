import React, { useState, useEffect } from "react";
const crud_address = process.env.REACT_APP_CRUD_PATH || 'http://localhost:3001';

function GenreAlbumDetailsForm({genresData, albumDetailsData, refreshData}) {
    
    const [genreAlbumDetailsData, setGenreAlbumDetails] = useState({genre_id: '', album_details_id: ''});
    const handleInsertGenreAlbumDetails = async (e) => {
            e.preventDefault();
            console.log('Submitting genre/album:', {
            genresData_id: genreAlbumDetailsData.genre_id,
            album_details_id: genreAlbumDetailsData.album_details_id,
            parsed_genre_id: parseInt(genreAlbumDetailsData.genre_id),
            parsed_album_details_id: parseInt(genreAlbumDetailsData.album_details_id)
            });
            
            await fetch(crud_address + '/api/genre-album-details/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ genre_id: parseInt(genreAlbumDetailsData.genre_id),
                                     album_details_id: parseInt(genreAlbumDetailsData.album_details_id)
               }),
            });
            setGenreAlbumDetails({ genre_id:'', album_details_id: '' });
            refreshData();

            
          };
    
    return (
        <>
        <form onSubmit={handleInsertGenreAlbumDetails}>
            <label>Add Genre Album Details</label>
            <select id="genre" name="genre" value={genreAlbumDetailsData.genre_id} onChange={(e) => setGenreAlbumDetails((prev) => ({ ...prev, genre_id: e.target.value }))}>
                    <option value="" disabled /*selected*/>Select a Genre to Add</option>
                    {genresData !== null ? genresData.map((item, index) => (
                        <option key={item.genre_id} value={item.genre_id}>ID: {item.genre_id}, {item.genre_name}</option>
                    )) : <></>}
                </select>
            <select id="details" name="details" value={genreAlbumDetailsData.album_details_id} onChange={(e) => setGenreAlbumDetails((prev) => ({ ...prev, album_details_id:e.target.value }))}>
                    <option value="" disabled /*selected*/>Select an Album to Add</option>
                    {albumDetailsData !== null ? albumDetailsData.map((item, index) => (
            <option key={item.album_details_id} value={item.album_details_id}>ID: {item.album_details_id}, {item.album_name}</option>
        )) : <></>}
                </select>
            <button type="submit">Add</button>
        </form>
        <form>
            <label>Update Genre Album Details</label>
            <select id="genre" name="genre">
                <option value="select">Select a Genre</option>
                <option value="1">Genre 1</option>
                <option value="2">Genre 2</option>
                <option value="3">Genre 3</option>
            </select>
            <select id="album-details" name="album-details">
                <option value="select">Select an Album</option>
                <option value="1">Album 1</option>
                <option value="2">Album 2</option>
                <option value="3">Album 3</option>
            </select>
            <select id="genre" name="genre">
                <option value="select">Replace Genre With</option>
                <option value="1">Genre 1</option>
                <option value="2">Genre 2</option>
                <option value="3">Genre 3</option>
            </select>
            <select id="album-details" name="album-details">
                <option value="select">Replace Album With</option>
                <option value="1">Album 1</option>
                <option value="2">Album 2</option>
                <option value="3">Album 3</option>
            </select>
            <button type="submit">Update</button>
        </form>
        </>
    )
}

export default GenreAlbumDetailsForm;
