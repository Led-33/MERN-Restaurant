import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer bg-dark text-light pt-5 mt-5">
      <div className="container">
        <div className="row gy-4">

          {/* Adresse */}
          <div className="col-lg-3 col-md-6 d-flex">
            <i className="bi bi-geo-alt fs-2 text-danger me-3"></i>

            <div>
              <h5>Adresse</h5>

              <p className="mb-1">
                516 Soanierana Ivongo
              </p>

              <p>
                Madagascar, Analanjirofo
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6 d-flex">
            <i className="bi bi-telephone fs-2 text-danger me-3"></i>

            <div>
              <h5>Contact</h5>

              <p className="mb-1">
                <strong>Téléphone :</strong>
              </p>

              <p>+261 38 48 909 79</p>

              <p className="mb-1">
                <strong>Email :</strong>
              </p>

              <p>
                maminiainaleonardo@gmail.com
              </p>
            </div>
          </div>

          {/* Horaire */}
          <div className="col-lg-3 col-md-6 d-flex">
            <i className="bi bi-clock fs-2 text-danger me-3"></i>

            <div>
              <h5>Disponibilité</h5>

              <p>
                <strong>Lundi - Samedi</strong>
              </p>

              <p>11h00 - 23h00</p>

              <p>
                <strong>Dimanche</strong>
              </p>

              <p>Fermé</p>
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div className="col-lg-3 col-md-6">
            <h5>Suivez-nous</h5>

            <div className="social-links mt-3">

              <a href="#">
                <i className="bi bi-facebook"></i>
              </a>

              <a href="#">
                <i className="bi bi-instagram"></i>
              </a>

              <a href="#">
                <i className="bi bi-twitter-x"></i>
              </a>

              <a href="#">
                <i className="bi bi-linkedin"></i>
              </a>

            </div>
          </div>

        </div>

        <hr className="border-secondary my-4" />

        <div className="text-center">

          <p className="mb-1">
            © 2026 <strong>Led Restaurant</strong>. Tous droits réservés.
          </p>

          <small>
            Développé par <strong>Léonardo</strong>
          </small>

        </div>
      </div>
    </footer>
  );
}

export default Footer;