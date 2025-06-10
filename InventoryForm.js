import React, { useState, useEffect } from "react";
const crud_address = process.env.REACT_APP_CRUD_PATH || 'http://localhost:3001';


function InventoryForm({dd_menu_data, albumDetailsData, refreshData}) {

 const [inventoryData, setInventory] = useState({
    album_id: '',
    media_type: '',
    condition_type: '',
    cost: '',
    quantity: ''
 });
     const handleInsertInventory = async (e) => {
        e.preventDefault();
        await fetch(crud_address + '/api/inventory/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ album_id: parseInt(inventoryData.album_id),
                                 media_type: inventoryData.media_type,
                                 condition_type: inventoryData.condition_type,
                                 cost: parseFloat(inventoryData.cost),
                                 quantity: parseInt(inventoryData.quantity)
          }),
        });
        setInventory({
            album_id: '',
            media_type: '',
            condition_type: '',
            cost: '',
            quantity: ''
        });
        refreshData();
      };

    return (
        <>
            <form onSubmit={handleInsertInventory}>
                <label htmlFor="album-details">Add Inventory</label>
                <select id="details" name="details" value={inventoryData.album_id} onChange={(e) => setInventory((prev) => ({ ...prev, album_id: e.target.value }))}>
                    <option value="">Select Album</option>
                    {albumDetailsData?.map((item) => 
                    (<option key={item.album_details_id} value={item.album_details_id}>ID: {item.album_details_id}, {item.album_name}</option>
                    ))}
                </select>
                <select id="media-type" name="media-type" value={inventoryData.media_type} onChange={(e) => setInventory((prev) => ({ ...prev, media_type: e.target.value }))}>
                    <option value="">Select Media Type</option>
                    <option value="1">vinyl</option>
                    <option value="2">cassette</option>
                </select>
                <select id="condition-type" name="condition-type" value={inventoryData.condition_type} onChange={(e) => setInventory((prev) => ({ ...prev, condition_type: e.target.value }))}>
                    <option value="">Select Condition</option>
                    <option value="1">new</option>
                    <option value="2">used</option>
                </select>
                <input type="number" min="0" step="any" placeholder="Enter cost" value={inventoryData.cost} onChange={(e) => setInventory((prev) => ({ ...prev, cost: e.target.value }))}/>
                <input type="number" min="0" placeholder="Enter quantity" value={inventoryData.quantity} onChange={(e) => setInventory((prev) => ({ ...prev, quantity: e.target.value }))}/>
                <button type="submit">Add</button>
            </form>
            <form>
                <label>Update Inventory</label>
                <select id="inventory" name="inventory">
                    <option value="" disabled /*selected*/>Select Inventory to Update</option>
                        {dd_menu_data !== null ? dd_menu_data.map((item, index) => (
                            <option key={item.inventory_id} value={item.inventory_id}>ID: {item.inventory_id}, {item.album_name}, {item.media_type}, {item.condition_type}</option>
                        )) : <></>}
                </select>
                <select id="album-details" name="album-details">
                    <option value="" disabled /*selected*/>Change Album</option>
                        {dd_menu_data !== null ? dd_menu_data.map((item, index) => (
                            <option key={item.inventory_id + '-' + item.album_name} value={item.album_name}>{item.album_name}</option>
                        )) : <></>}
                </select>
                <select id="media-type" name="media-type">
                    <option value="select">Change Media Type</option>
                    <option value="1">vinyl</option>
                    <option value="2">cassette</option>
                </select>
                <select id="condition-type" name="condition-type">
                    <option value="select">Change Condition</option>
                    <option value="1">new</option>
                    <option value="2">used</option>
                </select>
                <input type='number' min='0' step='0.01' placeholder='Enter new cost'></input>
                <input type='number' min='0' placeholder='Enter new quantity'></input>
                <button type="submit">Update</button>
            </form>
        </>
    )
}

export default InventoryForm;
