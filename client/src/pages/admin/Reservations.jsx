import { useEffect, useState } from "react";
import api from "../../services/api";

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const reservationsPerPage = 10;

   const voirReservation = (reservation) => {
  setSelectedReservation(reservation);
  setShowModal(true);
  };

  const fermerModal = () => {
    setShowModal(false);
    setSelectedReservation(null);
  };

    const fetchReservations = async () => {
    try {
      const res = await api.get("http://localhost:5000/api/reservations");

      const data = res.data.sort((a, b) => {
        return new Date(b.dateReservation) - new Date(a.dateReservation);
      });

      setReservations(data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const supprimerReservation = async (id) => {
    if (!window.confirm("Supprimer cette réservation ?")) return;

    try {
      await api.delete(`http://localhost:5000/api/reservations/${id}`);
      fetchReservations();
    } catch (err) {
      console.log(err);
    }
  };

  const changerStatut = async (id, statut) => {
    try {
      await api.patch(
        `http://localhost:5000/api/reservations/${id}/status`,
        {
          statut,
        }
      );

      fetchReservations();
    } catch (err) {
      console.log(err);
    }
  };


  const filteredReservations = reservations.filter((reservation) => {

  const matchSearch =
    reservation.nom.toLowerCase().includes(search.toLowerCase()) ||
    reservation.telephone.includes(search) ||
    (reservation.email || "")
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchStatus =
    statusFilter === "Tous" ||
    reservation.statut === statusFilter;

  return matchSearch && matchStatus;

});

const indexOfLastReservation =
currentPage * reservationsPerPage;

const indexOfFirstReservation =
  indexOfLastReservation - reservationsPerPage;

const currentReservations =
  filteredReservations.slice(
    indexOfFirstReservation,
    indexOfLastReservation
  );

const totalPages = Math.ceil(
  filteredReservations.length / reservationsPerPage
);


  
  const badgeColor = (statut) => {
    switch (statut) {
      case "Confirmée":
        return "success";

      case "Annulée":
        return "danger";

      default:
        return "warning";
    }
  };



  return (
    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Gestion des réservations</h2>

      </div>

      <div className="row mb-4">

    <div className="col-md-6">

        <input
            type="text"
            className="form-control"
            placeholder="Rechercher..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
        />

    </div>

    <div className="col-md-3">

        <select
            className="form-select"
            value={statusFilter}
            onChange={(e)=>setStatusFilter(e.target.value)}
        >
            <option>Tous</option>
            <option>En attente</option>
            <option>Confirmée</option>
            <option>Annulée</option>
        </select>

    </div>

</div>
      <div className="row mb-4">

  <div className="col-md-4">

    <div className="card shadow border-0">

      <div className="card-body">

        <h6>Total</h6>

        <h2>{reservations.length}</h2>

      </div>

    </div>

  </div>

  <div className="col-md-4">

    <div className="card shadow border-0">

      <div className="card-body">

        <h6>En attente</h6>

        <h2 className="text-warning">
          {
            reservations.filter(
              (r) => r.statut === "En attente"
            ).length
          }
        </h2>

      </div>

    </div>

  </div>

  <div className="col-md-4">

    <div className="card shadow border-0">

      <div className="card-body">

        <h6>Confirmées</h6>

        <h2 className="text-success">
          {
            reservations.filter(
              (r) => r.statut === "Confirmée"
            ).length
          }
        </h2>

      </div>

    </div>

  </div>

</div>

      <div className="table-responsive">

        <table className="table table-hover align-middle">

          <thead className="table-dark">

            <tr>
              <th>Client</th>
              <th>Téléphone</th>
              <th>Date</th>
              <th>Heure</th>
              <th>Personnes</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {currentReservations.map((reservation) => (

              <tr key={reservation._id}>

                <td>{reservation.nom}</td>

                <td>{reservation.telephone}</td>

                <td>
                  {new Date(
                    reservation.dateReservation
                  ).toLocaleDateString()}
                </td>

                <td>{reservation.heure}</td>

                <td>{reservation.nombrePersonnes}</td>

                <td>

                  <span
                    className={`badge bg-${badgeColor(
                      reservation.statut
                    )}`}
                  >
                    {reservation.statut}
                  </span>

                </td>

                <td>

                  <select
                    className="form-select form-select-sm mb-2"
                    value={reservation.statut}
                    onChange={(e) =>
                      changerStatut(
                        reservation._id,
                        e.target.value
                      )
                    }
                  >
                    <option>En attente</option>
                    <option>Confirmée</option>
                    <option>Annulée</option>
                  </select>

                  <div className="d-flex gap-2">

                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => voirReservation(reservation)}
                  >
                    <i className="bi bi-eye"></i>
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => supprimerReservation(reservation._id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>

                </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
      <div className="d-flex justify-content-center mt-4">

      <button
        className="btn btn-outline-danger me-2"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Précédent
      </button>

      <span className="align-self-center">
        Page {currentPage} / {totalPages || 1}
      </span>

      <button
        className="btn btn-outline-danger ms-2"
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Suivant
      </button>

    </div>
{showModal && selectedReservation && (
  <div
    className="modal fade show"
    style={{
      display: "block",
      background: "rgba(0,0,0,.5)",
    }}
  >
    <div className="modal-dialog modal-lg">
      <div className="modal-content">

        <div className="modal-header">

          <h5 className="modal-title">
            Détails de la réservation
          </h5>

          <button
            className="btn-close"
            onClick={fermerModal}
          ></button>

        </div>

        <div className="modal-body">

          <p><strong>Nom :</strong> {selectedReservation.nom}</p>

          <p><strong>Email :</strong> {selectedReservation.email}</p>

          <p><strong>Téléphone :</strong> {selectedReservation.telephone}</p>

          <p>
            <strong>Date :</strong>{" "}
            {new Date(
              selectedReservation.dateReservation
            ).toLocaleDateString()}
          </p>

          <p><strong>Heure :</strong> {selectedReservation.heure}</p>

          <p>
            <strong>Nombre de personnes :</strong>{" "}
            {selectedReservation.nombrePersonnes}
          </p>

          <p><strong>Message :</strong></p>

          <div className="border rounded p-3 bg-light">
            {selectedReservation.message || "Aucun message"}
          </div>

        </div>

        <div className="modal-footer">

          <button
            className="btn btn-secondary"
            onClick={fermerModal}
          >
            Fermer
          </button>

        </div>

      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default Reservations;