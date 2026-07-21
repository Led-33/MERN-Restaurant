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
        `${import.meta.env.VITE_API_URL}/api/plats`,
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
      <div className="text-center mb-5">

        <i className="bi bi-calendar-check-fill display-3 text-danger"></i>

        <h1 className="mt-3">
          Réservation
        </h1>

        <p className="text-muted">
          Réservez votre table en quelques clics.
        </p>

      </div>

      <div className="row justify-content-center">

  <div className="col-lg-7">

    <div className="card shadow border-0">

      <div className="card-body p-5">

        <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-person-fill text-danger me-2"></i>
            Nom
          </label>
          <input
            type="text"
            className="form-control"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-telephone-fill text-danger me-2"></i>
            Téléphone
          </label>
          <input
            type="text"
            className="form-control"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-calendar-event-fill text-danger me-2"></i>
            Date de réservation
          </label>
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
          <label className="form-label">
            <i className="bi bi-people-fill text-danger me-2"></i>
            Nombre de personnes
          </label>
          <input
            type="number"
            className="form-control"
            value={nombrePersonnes}
            onChange={(e) =>
              setNombrePersonnes(e.target.value)
            }
          />
        </div>

        <button
          type="submit"
          className="btn btn-danger px-4"
        >

          <i className="bi bi-calendar-check-fill me-2"></i>

          Réserver

        </button>
      </form>

      </div>

    </div>

  </div>

</div>

      
    </div>
  );
}

export default Reservation;