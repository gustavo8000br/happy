import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, TileLayer, Marker } from "react-leaflet";
import { useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

import "../styles/pages/orphanage.css";

const containerStyle = {
  width: "100%",
  height: "100%",
  padding: "150px 0px",
};

interface Orphanage {
  id: number;
  name: string;
  about: string;
  instructions: string;
  telephone: number;
  latitude: number;
  longitude: number;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface OrphanageParams {
  id: string;
}

export default function Orphanage() {
  const params = useParams<OrphanageParams>();
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get(`orphanage/${params.id}`).then((response) => {
      console.log("Orfanato GETzado:", response.data);
      setOrphanage(response.data);
    });
  }, [params.id]);

  if (!orphanage) {
    return <Loading/>
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name} />

          <div className="images">
            {orphanage.images.map((image, index) => {
              return (
                <button 
                key={image.id} 
                className={activeImageIndex === index ? 'active' : ''} 
                type="button"
                onClick={() => {
                  setActiveImageIndex(index);
                }}
                >
                  <img src={image.url} alt={orphanage.name} />
                </button>
              );
            })}
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>
            <div className="map-container">
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={containerStyle}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker
                  key={orphanage.id}
                  icon={mapIcon}
                  position={[orphanage.latitude, orphanage.longitude]}
                  interactive={false}
                ></Marker>
              </Map>
              <footer>
                <a
                  href={`https://maps.google.com.br/?q=${orphanage.latitude},${orphanage.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>
            <hr />
            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>
            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              {orphanage.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF669D" />
                  Não atendemos <br />
                  fim de semana
                </div>
              )}
            </div>
            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              <a
                href={`https://api.whatsapp.com/send?phone=${orphanage.telephone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                Entrar em contato por WhatsApp
              </a>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
