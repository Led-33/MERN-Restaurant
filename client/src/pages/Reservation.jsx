import { useState } from "react";
import axios from "axios";

function Reservation() {
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [dateReservation, setDateReservation] = useState("");
  const [nombrePersonnes, setNombrePersonnes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nomRegex = /^[A-Za-zÀ-ÿ\s]{2,50}$/;
    const telRegex = /^(032|033|034|037|038)\d{7}$/;

    if (!nomRegex.test(nom)) {
      alert("Nom invalide");
      return;
    }

    if (!telRegex.test(telephone)) {
      alert("Téléphone invalide");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/reservations",
        {
          nom,
          telephone,
          dateReservation,
          nombrePersonnes,
        }
      );

      alert("Réservation enregistrée");

      setNom("");
      setTelephone("");
      setDateReservation("");
      setNombrePersonnes("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">📅 Réservation</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nom</label>
          <input
            type="text"
            className="form-control"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Téléphone</label>
          <input
            type="text"
            className="form-control"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            value={dateReservation}
            onChange={(e) =>
              setDateReservation(e.target.value)
            }
          />
        </div>

        <div className="mb-3">
          <label>Nombre de personnes</label>
          <input
            type="number"
            className="form-control"
            value={nombrePersonnes}
            onChange={(e) =>
              setNombrePersonnes(e.target.value)
            }
          />
        </div>

        <button className="btn btn-success">
          Réserver
        </button>
      </form>
    </div>
  );
}

export default Reservation;