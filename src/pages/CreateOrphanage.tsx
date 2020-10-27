import React, { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { Map, TileLayer, Marker } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";

import "../styles/pages/create-orphanage.css";
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

const dev = true;

const containerStyle = {
  width: "100%",
  height: "280px",
};

const center = {
  lat: -23.7294749,
  lng: -47.0185886,
};

export default function CreateOrphanage() {
  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [telephone, setTelephone] = useState("");
  const [opening_hours, setOpeningHours] = useState("");
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const [activity, setActivity] = useState(false);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image);
    });

    setPreviewImages([...previewImages, ...selectedImagesPreview]);
  }

  async function handleSubmit(event: FormEvent) {
    setActivity(true);
    event.preventDefault();

    if (dev) console.log("Iniciando submit");

    if (
      name === "" ||
      telephone === "" ||
      about === "" ||
      opening_hours === "" ||
      images.length === 0 ||
      position === { latitude: 0, longitude: 0 }
    ) {
      // FIXME - Colocar alerta em um box
      alert("Preencha os campos obrigatorios!");
      setActivity(false);
      return;
    }

    if (dev) console.log("Não tem nada em branco. Contuando postagem");

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append("name", name);
    data.append("about", about);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("instructions", instructions);
    data.append("telephone", telephone);
    data.append("opening_hours", opening_hours);
    data.append("open_on_weekends", String(open_on_weekends));
    images.forEach((image) => {
      data.append("images", image);
    });

    if (dev) console.log("POSTANDO:", data);

    await api.post("orphanage/create", data);

    // FIXME - Colocar alerta em um box
    alert("Cadastro realizado com sucesso!");

    setActivity(false);
    history.push("/map");
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <div className="input-block">
              <label id="mapbox-label" htmlFor="mapbox">
                Mapa <span>*Obrigatorio</span>
              </label>
              <Map
                center={center}
                style={containerStyle}
                zoom={15}
                onClick={handleMapClick}
                id="mapbox"
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                {position.latitude !== 0 && (
                  <Marker
                    interactive={false}
                    icon={mapIcon}
                    position={[position.latitude, position.longitude]}
                  />
                )}
              </Map>
              <label id="mapbox-hint-label" htmlFor="mapbox">
                <span>
                  Clique no mapa para selecionar a localização do orfanato
                </span>
              </label>
            </div>

            <div className="input-block">
              <label htmlFor="name">
                Nome <span>*Obrigatorio</span>
              </label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>{" "}
                <span>*Obrigatorio</span>
              </label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={(event) => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="telephone">
                Telefone/WhatsApp <span>(Ex: 11912345678)</span>{" "}
                <span>*Obrigatorio</span>
              </label>
              <input
                id="telephone"
                value={telephone}
                onChange={(event) => setTelephone(event.target.value)}
              />
            </div>

            {/* // NOTE Adicionar botão de remover imagens */}
            <div className="input-block">
              <label htmlFor="images">
                Fotos <span>*Obrigatorio</span>
              </label>

              <div className="images-container">
                {previewImages.map((image) => {
                  return <img key={image} src={image} alt={name} />;
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

                <input
                  multiple
                  onChange={handleSelectImages}
                  type="file"
                  id="image[]"
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(event) => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">
                Horário de funcionamento <span>*Obrigatorio</span>
              </label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={(event) => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana?</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!open_on_weekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit" disabled={activity}>
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}
