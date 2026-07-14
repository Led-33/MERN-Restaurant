function About() {
  return (
    <div className="container py-5">

      <div className="text-center mb-5">
        <h1>À Propos de Nous</h1>
        <p className="lead">
          Découvrez notre histoire et notre passion pour la gastronomie.
        </p>
      </div>

      <div className="row align-items-center">

        <div className="col-lg-6">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
            alt="Restaurant"
            className="img-fluid rounded shadow"
          />
        </div>

        <div className="col-lg-6">
          <h2>Notre Restaurant</h2>

          <p>
            Depuis plusieurs années, notre restaurant accueille ses clients
            dans une ambiance chaleureuse et conviviale.
          </p>

          <p>
            Nous proposons une cuisine préparée avec des ingrédients frais,
            soigneusement sélectionnés pour garantir qualité et saveur.
          </p>

          <p>
            Notre objectif est d'offrir une expérience culinaire mémorable
            à chaque visite.
          </p>

          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              🍽️ Plats préparés avec des produits frais
            </li>
            <li className="list-group-item">
              ⭐ Service professionnel et accueillant
            </li>
            <li className="list-group-item">
              📅 Réservation simple et rapide
            </li>
            <li className="list-group-item">
              🏆 Satisfaction client au cœur de nos priorités
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
}

export default About;