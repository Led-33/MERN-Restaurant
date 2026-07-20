import { useEffect, useState } from "react";
import axios from "axios";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  const [nom, setNom] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/categories"
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
        await axios.put(
          `http://localhost:5000/api/categories/${editingId}`,
          { nom }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/categories",
          { nom }
        );
      }

      setNom("");
      setEditingId(null);
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

      await axios.delete(
        `http://localhost:5000/api/categories/${id}`
      );

      fetchCategories();

    } catch (err) {

      alert(err.response?.data?.message);

    }

  };

  const categoriesFiltrees = categories.filter((cat) =>
    cat.nom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Gestion des catégories</h2>

      </div>

      <div className="card shadow border-0 mb-4">

        <div className="card-body">

          <div className="row">

            <div className="col-md-9">

              <input
                type="text"
                className="form-control"
                placeholder="Nom de la catégorie..."
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />

            </div>

            <div className="col-md-3">

              <button
                className="btn btn-danger w-100"
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
                    onClick={() =>
                      modifierCategorie(cat)
                    }
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

    </div>
  );
}

export default Categories;