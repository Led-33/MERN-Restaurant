import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [stats, setStats] = useState({
    plats: 0,
    reservations: 0,
    categories: 0,
    utilisateurs: 1,
  });

  useEffect(() => {

    axios
      .get("http://localhost:5000/api/plats")
      .then((res) => {

        setStats((prev) => ({
          ...prev,
          plats: res.data.total || res.data.plats.length,
        }));

      })
      .catch(console.log);

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