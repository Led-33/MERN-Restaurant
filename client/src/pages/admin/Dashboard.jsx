import { useEffect, useState } from "react";
import api from "../../services/api";

function Dashboard() {

  const [stats, setStats] = useState({
    plats: 0,
    reservations: 0,
    categories: 0,
    utilisateurs: 1,
  });

useEffect(() => {
  Promise.all([
    api.get(`${import.meta.env.VITE_API_URL}/api/plats`),
    api.get(`${import.meta.env.VITE_API_URL}/api/reservations`),
    api.get(`${import.meta.env.VITE_API_URL}/api/categories`),
    api.get(`${import.meta.env.VITE_API_URL}/api/users`)
  ])
  .then(([plats, reservations, categories, users]) => {

    setStats({
      plats: plats.data.total,
      reservations: reservations.data.length,
      categories: categories.data.length,
      utilisateurs: users.data.length,
    });

  })
  .catch((err) => console.error(err));

}, []);

  return (
    <div>

      <h2 className="mb-4">
        📊 Tableau de bord
      </h2>

      <div className="row">

        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card dashboard-card border-0 shadow">

            <div className="card-body">

              <h1>🍽</h1>

              <h2>{stats.plats}</h2>

              <p>Total des plats</p>

            </div>

          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card dashboard-card border-0 shadow">

            <div className="card-body">

              <h1>📅</h1>

              <h2>{stats.reservations}</h2>

              <p>Réservations</p>

            </div>

          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card dashboard-card border-0 shadow">

            <div className="card-body">

              <h1>📂</h1>

              <h2>{stats.categories}</h2>

              <p>Catégories</p>

            </div>

          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card dashboard-card border-0 shadow">

            <div className="card-body">

              <h1>👤</h1>

              <h2>{stats.utilisateurs}</h2>

              <p>Utilisateurs</p>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;