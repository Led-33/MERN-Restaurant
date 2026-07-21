import { useEffect, useState } from "react";
import api from "../../services/api";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  const [nom, setNom] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await api.get(
        `${import.meta.env.VITE_API_URL}/api/categories`
      );
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const enregistrerCategorie = async () => {
    if (nom.trim() === "") return;

    try {
      if (editingId) {
        await api.put(
          `${import.meta.env.VITE_API_URL}/api/categories/${editingId}`,
          { nom }
        );
      } else {
        await api.post(
          `${import.meta.env.VITE_API_URL}/api/categories`,
          { nom }
        );
      }

      setNom("");
      setEditingId(null);
      fermerModal();
      fetchCategories();

    } catch (err) {
      alert(err.response?.data?.message || "Erreur");
    }
  };

  const modifierCategorie = (categorie) => {
    setNom(categorie.nom);
    setEditingId(categorie._id);
  };

  const supprimerCategorie = async (id) => {

    if (!window.confirm("Supprimer cette catégorie ?"))
      return;

    try {

      await api.delete(
        `${import.meta.env.VITE_API_URL}/api/categories/${id}`
      );

      fetchCategories();

    } catch (err) {

      alert(err.response?.data?.message);

    }

  };

  const categoriesFiltrees = categories.filter((cat) =>
    cat.nom.toLowerCase().includes(search.toLowerCase())
  );

  const ouvrirAjout = () => {
    setNom("");
    setEditingId(null);
    setShowModal(true);
  };

  const ouvrirModification = (categorie) => {
    setNom(categorie.nom);
    setEditingId(categorie._id);
    setShowModal(true);
  };

  const fermerModal = () => {
    setShowModal(false);
    setNom("");
    setEditingId(null);
  };

  return (
    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">

    <h2>Gestion des catégories</h2>

    <button
        className="btn btn-danger"
        onClick={ouvrirAjout}
    >
        <i className="bi bi-plus-circle"></i>

        {" "}Nouvelle catégorie
    </button>

</div>

      <div className="row mb-3">

        <div className="col-md-6">

          <input
            type="text"
            className="form-control"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="col-md-6 text-end">

          <h5>
            Total :
            <span className="text-danger">
              {" "}
              {categoriesFiltrees.length}
            </span>
          </h5>

        </div>

      </div>

      <div className="table-responsive">

        <table className="table table-hover align-middle">

          <thead className="table-dark">

            <tr>
              <th>Nom</th>
              <th>Nombre de plats</th>
              <th width="170">Actions</th>
            </tr>

          </thead>

          <tbody>

            {categoriesFiltrees.map((cat) => (

              <tr key={cat._id}>

                <td>{cat.nom}</td>

                <td>

                  <span className="badge bg-primary">
                    {cat.totalPlats}
                  </span>

                </td>

                <td>

                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => ouvrirModification(cat)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      supprimerCategorie(cat._id)
                    }
                  >
                    <i className="bi bi-trash"></i>
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {showModal && (

      <div
          className="modal fade show"
          style={{
              display: "block",
              background: "rgba(0,0,0,.5)"
          }}
      >

      <div className="modal-dialog">

      <div className="modal-content">

      <div className="modal-header">

      <h5 className="modal-title">

      {editingId
      ? "Modifier une catégorie"
      : "Nouvelle catégorie"}

      </h5>

      <button
      className="btn-close"
      onClick={fermerModal}
      ></button>

      </div>

      <div className="modal-body">

      <label className="form-label">

      Nom de la catégorie

      </label>

      <input
      className="form-control"
      value={nom}
      onChange={(e)=>setNom(e.target.value)}
      />

      </div>

      <div className="modal-footer">

      <button
      className="btn btn-secondary"
      onClick={fermerModal}
      >

      Annuler

      </button>

      <button
      className="btn btn-danger"
      onClick={enregistrerCategorie}
      >

      {editingId
      ? "Modifier"
      : "Ajouter"}

      </button>

      </div>

      </div>

      </div>

      </div>

      )}

    </div>
  );
}

export default Categories;