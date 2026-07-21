import { useNavigate } from "react-router-dom";

function AdminHeader() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href="/admin/login";

  };

  return (
    <header className="admin-header">

      <h2>Administration</h2>

      <button
        className="btn btn-danger"
        onClick={logout}
      >
        Déconnexion
      </button>

    </header>
  );
}

export default AdminHeader;