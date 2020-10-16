import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

import mapMarker from '../images/map-marker.svg';

import '../styles/pages/orphanages-map.css';

const containerStyle = {
    width: '100%',
    height: '100%'
  };
  
  const center = {
    lat: -23.7294749,
    lng: -47.0185886
  };

function OrphanagesMap() {
    return (
    <div id="page-map">
        <aside>
            <header>
                <Link to="/">
                <img src={mapMarker} alt="Happy"/>
                </Link>
                <h2>Escolha um orfanato no mapa</h2>
                <p>Muitas crianças estão esperando a sua visita :)</p>
            </header>

            <footer>
                <strong>Cotia</strong>
                <span>São Paulo</span>
            </footer>
        </aside>

        <LoadScript
        googleMapsApiKey={`${process.env.REACT_APP_GMAPS_TOKEN}`}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={16}
                id="gmap"
            >
            </GoogleMap>
        </LoadScript>

        <Link to="" className="create-orphanage">
            <FiPlus size={32} color="#FFF" />
        </Link>
    </div>
    );
}

export default OrphanagesMap;