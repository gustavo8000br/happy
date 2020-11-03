import React from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import mapMarkerImg from "../images/map-marker.svg";

import "../styles/components/sidebar.css";

export default function Sidebar() {
  const { goBack } = useHistory();
  return (
    <aside className="happy-sidebar">
    <Link to="/">
      <img src={mapMarkerImg} alt="Happy" />
    </Link>
      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
}
