import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiPlus } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import logoImg from "../images/logo.svg";

import "../styles/pages/orphanages-map.css";
import { getOrphanages, cancelGetOrphanages } from "../services/api";
import mapIcon from "../utils/mapIcon";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -23.7294749,
  lng: -47.0185886,
};

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    async function asyncEffect() {
      const data = await getOrphanages();
      setOrphanages(data);
    }
    asyncEffect();

    return cancelGetOrphanages;
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <Link to="/">
            <img src={logoImg} alt="Happy" />
          </Link>
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Cotia</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <Map center={center} zoom={12} style={containerStyle}>
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />
        {orphanages.map((orphanage) => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className="map-popup"
              >
                {orphanage.name}
                <Link to={`/orphanage/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#fff" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link to="/orphanage/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
