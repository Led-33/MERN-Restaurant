import { Link } from "react-router-dom";
import "../styles/welcome.css";

function Welcome() {

  return (
    <section className="welcome-page">

      <div className="welcome-overlay"></div>

      <div className="welcome-content">

        <i className="bi bi-cup-hot-fill display-1 text-danger"></i>

        <h1>
          Bienvenue chez <span>Led Restaurant</span>
        </h1>

        <p>
          Découvrez une cuisine raffinée préparée avec passion.
          Des plats savoureux, une ambiance chaleureuse et
          un service de qualité.
        </p>


        <div className="mt-4">

          <Link
            to="/client"
            className="btn btn-danger btn-lg me-3"
          >

            <i className="bi bi-person-fill me-2"></i>

            Client

          </Link>


          <Link
            to="/admin/login"
            className="btn btn-danger btn-lg me-3"
          >
            <i className="bi bi-shield-lock-fill me-2"></i>

            Administrateur

          </Link>

        </div>


      </div>


    </section>
  );
}

export default Welcome;