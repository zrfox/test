import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { NavLink, BrowserRouter as Router } from 'react-router-dom';

function Navigation({ handleReset }) {
  return (
    <>
      <nav className="navbar navbar-expand-sm bg-primary text-center" data-bs-theme="dark">
        <div className="navbar-nav container-fluid">
          <ul className="navbar-nav flex-wrap">
            <li className="justify-content-end"><NavLink to="/" className="nav-link">Home</NavLink></li>
            <li className="justify-content-end"><NavLink to="/album-details" className="nav-link">Album_Details</NavLink></li>
            <li className="justify-content-end"><NavLink to="/artist-album-details" className="nav-link">Artist_Album_Details</NavLink></li>
            <li className="justify-content-end"><NavLink to="/artists" className="nav-link">Artists</NavLink></li>
            <li className="justify-content-end"><NavLink to="/genre-album-details" className="nav-link">Genre_Album_Details</NavLink></li>
            <li className="justify-content-end"><NavLink to="/genres" className="nav-link">Genres</NavLink></li>
            <li className="justify-content-end"><NavLink to="/inventory" className="nav-link">Inventory</NavLink></li>
          </ul>
          <button className="btn btn-warning justify-content-end" onClick={handleReset}>Reset Data</button>
        </div>
      </nav>
    </>
  );
}

export default Navigation;