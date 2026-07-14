function Contact() {
  return (
    <div className="container py-5">

      <div className="text-center mb-5">
        <h1>📞 Contact</h1>
        <p className="lead">
          Besoin d'aide ? Contactez-nous
        </p>
      </div>

      {/* Informations */}
      <div className="row g-4 mb-5">

        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5>📍 Adresse</h5>
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
              <h5>📱 Téléphone</h5>
              <p>+261 38 48 909 79</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5>✉️ Email</h5>
              <p>
                maminiainaleonardo@gmail.com
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5>🕒 Horaires</h5>
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
          Envoyez-nous un message
        </h3>

        <form>

          <div className="row">

            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Votre nom"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Votre email"
                required
              />
            </div>

          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Objet"
              required
            />
          </div>

          <div className="mb-3">
            <textarea
              className="form-control"
              rows="6"
              placeholder="Votre message"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
          >
            Envoyer
          </button>

        </form>

      </div>

    </div>
  );
}

export default Contact;