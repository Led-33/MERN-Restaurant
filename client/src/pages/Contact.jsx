function Contact() {
  return (
    <div className="container py-5">

      <div className="text-center mb-5">

        <i className="bi bi-headset display-3 text-danger"></i>

        <h1 className="mt-3">
          Contact
        </h1>

        <p className="lead text-muted">
          Besoin d'aide ? Contactez-nous
        </p>

      </div>

      {/* Informations */}
      <div className="row g-4 mb-5">

        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5>
                <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                Adresse
              </h5>
              <p>
                516 Soanierana Ivongo,
                Madagascar, Analanjirofo
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5>
                <i className="bi bi-telephone-fill text-danger me-2"></i>
                Téléphone
              </h5>
              <p>+261 38 48 909 79</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5>
                <i className="bi bi-envelope-fill text-danger me-2"></i>
                Email
              </h5>
              <p>
                maminiainaleonardo@gmail.com
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5>
                <i className="bi bi-clock-fill text-danger me-2"></i>
                Horaires
              </h5>
              <p>
                Lundi - Samedi : 11h - 23h
                <br />
                Dimanche : Fermé
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Formulaire */}
      <div className="card shadow-sm p-4">

      <h3 className="mb-4">

        <i className="bi bi-chat-dots-fill text-danger me-2"></i>

        Envoyez-nous un message

      </h3>

        <form>

          <div className="row">

            <div className="input-group">

              <span className="input-group-text">
                <i className="bi bi-person-fill"></i>
              </span>

              <input
                type="text"
                className="form-control"
                placeholder="Votre nom"
                required
              />

            </div>

            <div className="input-group">

              <span className="input-group-text">
                <i className="bi bi-envelope-fill"></i>
              </span>

              <input
                type="email"
                className="form-control"
                placeholder="Votre email"
                required
              />

            </div>

          </div>

          <div className="input-group">

            <span className="input-group-text">
              <i className="bi bi-bookmark-fill"></i>
            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Objet"
              required
            />

          </div>

          <div className="input-group">

            <span className="input-group-text">
              <i className="bi bi-chat-left-text-fill"></i>
            </span>

            <textarea
              className="form-control"
              rows="6"
              placeholder="Votre message"
              required
            ></textarea>

          </div>

          <button
            type="submit"
            className="btn btn-danger px-4"
          >

            <i className="bi bi-send-fill me-2"></i>

            Envoyer

          </button>

        </form>

      </div>

    </div>
  );
}

export default Contact;