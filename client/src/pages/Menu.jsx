import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/menu.css";

function Menu() {
  const [plats, setPlats] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const fetchPlats = (pageNumber = 1) => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/api/plats?page=${pageNumber}&search=${search}`
      )
      .then((res) => {
        setPlats(res.data.plats);
        setPage(res.data.page);
        setTotalPages(res.data.pages);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPlats(1);
  }, []);

  return (
    <section className="menu-section py-5">
      <div className="container">

        {/* Titre */}
        <div className="text-center mb-5 menu-title">

          <i className="bi bi-cup-hot-fill display-3 text-danger"></i>

          <h5 className="mt-3 text-uppercase text-danger">
            Nos Menus
          </h5>

          <h1>Découvrez nos plats</h1>

        </div>

        {/* Recherche */}
        <div className="row justify-content-center mb-5">
          <div className="col-md-6">
            <div className="input-group search-box">

              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>

              <input
                type="text"
                className="form-control"
                placeholder="Rechercher un plat..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button
                className="btn btn-danger"
                onClick={() => fetchPlats(1)}
              >
                <i className="bi bi-search me-2"></i>
                Rechercher
              </button>

            </div>
          </div>
        </div>

        {/* Liste des plats */}
        <div className="row">
          {plats.map((plat) => (
            <div
              className="col-lg-4 col-md-6 mb-4"
              key={plat._id}
            >
              <div className="menu-card shadow">

                <img
                  src={
                    plat.image
                      ? `${import.meta.env.VITE_API_URL}/uploads/${plat.image}`
                      : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                  }
                  alt={plat.nom}
                  className="menu-image"
                />

                <div className="menu-body">
                  <h4 className="menu-name">
                    {plat.nom}
                  </h4>

                  <p className="menu-description">
                    {plat.description}
                  </p>

                  <span className="badge bg-danger">

                    <i className="bi bi-tags-fill me-1"></i>

                    {plat.categorie}

                  </span>

                  <h3 className="menu-price text-danger">

                    <i className="bi bi-cash-coin me-2"></i>

                    {Number(plat.prix).toLocaleString()} Ar

                  </h3>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-center align-items-center gap-3 pagination-box">

          <button
            className="btn btn-outline-danger"
            disabled={page === 1}
            onClick={() => fetchPlats(page - 1)}
          >
            <>
              <i className="bi bi-arrow-left me-2"></i>
              Précédent
            </>
          </button>

          <span className="fw-bold">
            Page {page} / {totalPages}
          </span>

          <button
            className="btn btn-outline-danger"
            disabled={page === totalPages}
            onClick={() => fetchPlats(page + 1)}
          >
            <>
              Suivant
              <i className="bi bi-arrow-right ms-2"></i>
            </>
          </button>

        </div>

      </div>
    </section>
  );
}

export default Menu;