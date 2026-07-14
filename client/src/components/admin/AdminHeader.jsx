import { useNavigate } from "react-router-dom";

function AdminHeader() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
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