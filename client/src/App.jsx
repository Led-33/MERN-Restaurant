import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages publiques
import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Gallery from "./pages/Gallery";
import Reservation from "./pages/Reservation";
import Contact from "./pages/Contact";

// Pages Admin
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Plats from "./pages/admin/Plats";
import Reservations from "./pages/admin/Reservations";
import Categories from "./pages/admin/Categories";
import Utilisateurs from "./pages/admin/Utilisateurs";
import Parametres from "./pages/admin/Parametres";

// Layout Admin
import AdminLayout from "./components/admin/AdminLayout";

function Layout() {
  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Header public */}
      {!isAdmin && <Navbar />}

      <Routes>

        {/* Site public */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/contact" element={<Contact />} />

        {/* Login Admin */}
        <Route path="/admin/login" element={<Login />} />

        {/* Administration */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="plats" element={<Plats />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="categories" element={<Categories />} />
          <Route path="utilisateurs" element={<Utilisateurs />} />
          <Route path="parametres" element={<Parametres />} />

        </Route>

      </Routes>

      {/* Footer public */}
      {!isAdmin && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;