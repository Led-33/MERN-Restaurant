import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Admin() {
  const [plats, setPlats] = useState([]);

  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState("");
  const [categorie, setCategorie] = useState("");

  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  // Déconnexion
  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  // Charger les plats
  const fetchPlats = (pageNumber = 1) => {
    axios
      .get(`http://localhost:5000/api/plats?page=${pageNumber}`)
      .then((res) => {
        setPlats(res.data.plats);
        setPage(res.data.page);
        setTotalPages(res.data.pages);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPlats(1);
  }, []);

  // Ajouter un plat
  const ajouterPlat = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/plats", {
          nom,
          description,
          prix,
          categorie,
          image,
        });

      setNom("");
      setDescription("");
      setPrix("");
      setCategorie("");
      setImage("");

      fetchPlats(page);
    } catch (err) {
      console.log(err);
    }
  };

  // Supprimer un plat
  const supprimerPlat = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/plats/${id}`
      );

      fetchPlats(page);
    } catch (err) {
      console.log(err);
    }
  };

  // Modifier un plat
  const modifierPlat = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/plats/${editId}`,
        {
          nom,
          description,
          prix,
          categorie,
          image,
        }
      );

      setNom("");
      setDescription("");
      setPrix("");
      setCategorie("");
      setImage(plat.image);

      setEditId(null);
      setIsEditing(false);

      fetchPlats(page);
    } catch (err) {
      console.log(err);
    }
  };

  // Pré-remplir le formulaire
  const chargerModification = (plat) => {
    setNom(plat.nom);
    setDescription(plat.description);
    setPrix(plat.prix);
    setCategorie(plat.categorie);

    setEditId(plat._id);
    setIsEditing(true);
  };

  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>🧑‍💼 Administration des Plats</h1>

        <button
          className="btn btn-danger"
          onClick={logout}
        >
          Déconnexion
        </button>
      </div>

      {/* Formulaire */}
      <form
        className="card p-4 mb-4 shadow-sm"
        onSubmit={isEditing ? modifierPlat : ajouterPlat}
      >
        <h4 className="mb-3">
          {isEditing
            ? "✏️ Modifier un plat"
            : "➕ Ajouter un plat"}
        </h4>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Nom du plat"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="number"
          className="form-control mb-3"
          placeholder="Prix"
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
          required
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Catégorie"
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
          required
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="URL Image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button
          type="submit"
          className={
            isEditing
              ? "btn btn-warning"
              : "btn btn-success"
          }
        >
          {isEditing
            ? "✏️ Modifier"
            : "➕ Ajouter"}
        </button>
      </form>

      {/* Liste des plats */}
      <div className="row">
        {plats.map((plat) => (
          <div
            className="col-lg-4 col-md-6 mb-4"
            key={plat._id}
          >
            <div className="card h-100 shadow-sm">
              <img
  src={plat.image}
  alt={plat.nom}
  className="img-fluid rounded mb-3"
  style={{
    height: "200px",
    width: "100%",
    objectFit: "cover"
  }}
/>

              <div className="card-body">
                <h5>{plat.nom}</h5>

                <p>{plat.description}</p>

                <p className="fw-bold text-success">
                  {plat.prix} Ar
                </p>

                <span className="badge bg-secondary">
                  {plat.categorie}
                </span>
              </div>

              <div className="card-footer d-flex gap-2">

                <button
                  className="btn btn-warning flex-fill"
                  onClick={() =>
                    chargerModification(plat)
                  }
                >
                  ✏️ Modifier
                </button>

                <button
                  className="btn btn-danger flex-fill"
                  onClick={() =>
                    supprimerPlat(plat._id)
                  }
                >
                  🗑️ Supprimer
                </button>

              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center align-items-center gap-3 mt-4">

        <button
          className="btn btn-outline-primary"
          disabled={page === 1}
          onClick={() =>
            fetchPlats(page - 1)
          }
        >
          ⬅ Précédent
        </button>

        <span className="fw-bold">
          Page {page} / {totalPages}
        </span>

        <button
          className="btn btn-outline-primary"
          disabled={page === totalPages}
          onClick={() =>
            fetchPlats(page + 1)
          }
        >
          Suivant ➡
        </button>

      </div>

    </div>
  );
}

export default Admin;