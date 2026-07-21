import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="container py-5">
        <div className="row align-items-center">

          <div className="col-lg-6">
            <h1 className="display-4 fw-bold">
              Profitez d'une nourriture délicieuse
            </h1>

            <p className="lead">
              Découvrez nos meilleurs plats et réservez votre table en ligne.
            </p>

            <div className="mt-4">
              <Link
                to="/reservation"
                className="btn btn-danger me-3"
              >
                Réserver une table
              </Link>

              <Link
                to="/menu"
                className="btn btn-outline-dark"
              >
                Voir le menu
              </Link>
            </div>
          </div>

          <div className="col-lg-6 text-center">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
              alt="Restaurant"
              className="img-fluid rounded shadow"
            />
          </div>

        </div>
      </section>

      {/* A propos */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <h2>À propos de nous</h2>
          <p>
            En savoir plus sur notre restaurant
          </p>
        </div>

        <div className="row align-items-center">

          <div className="col-lg-6">
            <img
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9"
              alt="Restaurant"
              className="img-fluid rounded shadow"
            />
          </div>

          <div className="col-lg-6">
            <p>
              Notre restaurant vous propose des plats
              préparés avec des ingrédients frais et de qualité.
            </p>

            <ul className="list-unstyled">
              <li className="mb-2">
                <i className="bi bi-check-circle-fill text-danger me-2"></i>
                Santé
              </li>

              <li className="mb-2">
                <i className="bi bi-check-circle-fill text-danger me-2"></i>
                Saveur
              </li>

              <li className="mb-2">
                <i className="bi bi-check-circle-fill text-danger me-2"></i>
                Satisfaction
              </li>
            </ul>

            <p>
              Nous organisons également des événements,
              anniversaires et repas de groupe.
            </p>
          </div>

        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="bg-light py-5">
        <div className="container">

          <div className="text-center mb-5">
            <h2>Pourquoi nous choisir ?</h2>
          </div>

          <div className="row">

            <div className="col-md-4 mb-4">
              <div className="card h-100 text-center p-3">
                <h4>
                  <i className="bi bi-graph-up-arrow text-danger me-2"></i>
                  Évolution
                </h4>
                <p>
                  Nous améliorons constamment nos services.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card h-100 text-center p-3">
                <h4>
                  <i className="bi bi-cash-coin text-danger me-2"></i>
                  Prix abordables
                </h4>
                <p>
                  Des plats de qualité à des prix accessibles.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card h-100 text-center p-3">
                <h4>
                  <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                  Emplacement
                </h4>
                <p>
                  Situé dans un endroit facilement accessible.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Statistiques */}
      <section className="container py-5">

        <div className="row text-center">

          <div className="col-md-3 text-center">
            <i className="bi bi-people-fill display-4 text-danger"></i>
            <h2 className="mt-3">232+</h2>
            <p>Clients</p>
          </div>

          <div className="col-md-3" text-center>
            <i className="bi bi-cup-hot-fill display-4 text-danger"></i>
            <h2>135+</h2>
            <p>Plats</p>
          </div>

          <div className="col-md-3" text-center>
            <i className="bi bi-award-fill display-4 text-danger"></i>
            <h2>15+</h2>
            <p>Partenaires</p>
          </div>

          <div className="col-md-3" text-center>
            <i className="bi bi-person-workspace display-4 text-danger"></i>
            <h2>32+</h2>
            <p>Employés</p>
          </div>

        </div>

      </section>
    </>
  );
}

export default Home;