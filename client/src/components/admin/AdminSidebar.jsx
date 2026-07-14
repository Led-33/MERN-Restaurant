import { NavLink } from "react-router-dom";

function AdminSidebar() {

  return (

    <aside className="sidebar">

      <h2 className="logo">
        Led<span>.</span>
      </h2>

      <nav>

        <NavLink to="/admin">
          📊 Tableau de bord
        </NavLink>

        <NavLink to="/admin/plats">
          🍽 Gestion des plats
        </NavLink>

        <NavLink to="/admin/reservations">
          📅 Réservations
        </NavLink>

        <NavLink to="/admin/categories">
          📂 Catégories
        </NavLink>

        <NavLink to="/admin/utilisateurs">
          👤 Utilisateurs
        </NavLink>

        <NavLink to="/admin/parametres">
          ⚙ Paramètres
        </NavLink>

      </nav>

    </aside>

  );
}

export default AdminSidebar;