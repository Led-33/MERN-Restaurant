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
        `http://localhost:5000/api/plats?page=${pageNumber}&search=${search}`
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
          <h5>NOS MENUS</h5>
          <h1>Découvrez nos plats</h1>
        </div>

        {/* Recherche */}
        <div className="row justify-content-center mb-5">
          <div className="col-md-6">
            <div className="input-group search-box">
              <input
                type="text"
                className="form-control"
                placeholder="🔍 Rechercher un plat..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button
                className="btn btn-danger"
                onClick={() => fetchPlats(1)}
              >
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
                    plat.image ||
                    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
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

                  <span className="menu-category">
                    {plat.categorie}
                  </span>

                  <h3 className="menu-price">
                    {plat.prix} Ar
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
            ⬅ Précédent
          </button>

          <span className="fw-bold">
            Page {page} / {totalPages}
          </span>

          <button
            className="btn btn-outline-danger"
            disabled={page === totalPages}
            onClick={() => fetchPlats(page + 1)}
          >
            Suivant ➡
          </button>

        </div>

      </div>
    </section>
  );
}

export default Menu;