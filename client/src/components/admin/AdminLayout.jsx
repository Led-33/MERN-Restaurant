import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import "../../styles/admin.css";

function AdminLayout() {
  return (
    <div className="admin">

      <AdminSidebar />

      <div className="admin-content">

        <AdminHeader />

        <main className="admin-main">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;