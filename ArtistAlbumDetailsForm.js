import React, { useState, useEffect } from "react";
const crud_address = process.env.REACT_APP_CRUD_PATH || 'http://localhost:3001';

function ArtistAlbumDetailsForm({ artistsData, albumDetailsData, refreshData }) {
    
      const [artistAlbumDetailsData, setArtistAlbumDetails] = useState({artist_id: '', album_details_id: ''});
         const handleInsertArtistAlbumDetails = async (e) => {
            e.preventDefault();
            console.log('Submitting artist/album:', {
            artist_id: artistAlbumDetailsData.artist_id,
            album_details_id: artistAlbumDetailsData.album_details_id,
            parsed_artist_id: parseInt(artistAlbumDetailsData.artist_id),
            parsed_album_details_id: parseInt(artistAlbumDetailsData.album_details_id)
            });
            
            await fetch(crud_address + '/api/artist-album-details/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ artist_id: parseInt(artistAlbumDetailsData.artist_id),
                                     album_details_id: parseInt(artistAlbumDetailsData.album_details_id)
               }),
            });
            setArtistAlbumDetails({ artist_id:'', album_details_id: '' });
            refreshData();

            
          };
    
    return (
        <>
        <form onSubmit={handleInsertArtistAlbumDetails}>
            <label>Add Artist Album Details</label>
            <select id="artist" name="artist" value={artistAlbumDetailsData.artist_id} onChange={(e) => setArtistAlbumDetails((prev) => ({ ...prev, artist_id: e.target.value }))}>
                    <option value="" disabled /*selected*/>Select an Artist to Add</option>
                    {artistsData !== null ? artistsData.map((item, index) => (
                        <option key={item.artist_id} value={item.artist_id}>ID: {item.artist_id}, {item.artist_name}</option>
                    )) : <></>}
                </select>
            <select id="details" name="details" value={artistAlbumDetailsData.album_details_id} onChange={(e) => setArtistAlbumDetails((prev) => ({ ...prev, album_details_id:e.target.value }))}>
                    <option value="" disabled /*selected*/>Select an Album to Add</option>
                    {albumDetailsData !== null ? albumDetailsData.map((item, index) => (
            <option key={item.album_details_id} value={item.album_details_id}>ID: {item.album_details_id}, {item.album_name}</option>
        )) : <></>}
                </select>
            <button type="submit">Add</button>
        </form>
        <form>
            <label>Update Artist Album Details</label>
            <select id="artist" name="artist">
                <option value="select">Select an Artist</option>
                <option value="1">Artist 1</option>
                <option value="2">Artist 2</option>
                <option value="3">Artist 3</option>
            </select>
            <select id="album-details" name="album-details">
                <option value="select">Select an Album</option>
                <option value="1">Album 1</option>
                <option value="2">Album 2</option>
                <option value="3">Album 3</option>
            </select>
            <select id="artist" name="artist">
                <option value="select">Replace Artist With</option>
                <option value="1">Artist 1</option>
                <option value="2">Artist 2</option>
                <option value="3">Artist 3</option>
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

export default ArtistAlbumDetailsForm;
