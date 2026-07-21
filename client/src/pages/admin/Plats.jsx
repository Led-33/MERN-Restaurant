import { useEffect, useState } from "react";
import api from "../../services/api";

function Plats() {

  // Liste
  const [plats, setPlats] = useState([]);
  const [categories, setCategories] = useState([]);

  // Formulaire
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState("");
  const [categorie, setCategorie] = useState("");
  const [image, setImage] = useState(null);

  // Edition
  const [editingId, setEditingId] = useState(null);

  // Modal
  const [showModal, setShowModal] = useState(false);

  // Recherche
  const [search, setSearch] = useState("");

  // Pagination
  // Pagination
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

  const platsFiltres = plats.filter((plat) =>
  plat.nom.toLowerCase().includes(search.toLowerCase()) ||
  plat.categorie.toLowerCase().includes(search.toLowerCase())
);

const fetchPlats = async (page = 1) => {
  try {
    const res = await api.get(
    `http://localhost:5000/api/plats?page=${page}&search=${search}`
    );

    setPlats(res.data.plats);
    setCurrentPage(res.data.page);
    setTotalPages(res.data.pages);

  } catch (err) {
    console.log(err);
  }
};

const fetchCategories = async ()=>{

    try{

        const res = await api.get(
            "http://localhost:5000/api/categories"
        );

        setCategories(res.data);

    }

    catch(err){

        console.log(err);

    }

};

useEffect(()=>{

    fetchPlats();

    fetchCategories();

},[]);

const ouvrirAjout = ()=>{

    setEditingId(null);

    setNom("");
    setDescription("");
    setPrix("");
    setCategorie("");
    setImage(null);

    setShowModal(true);

};

const ouvrirModification = (plat)=>{

    setEditingId(plat._id);

    setNom(plat.nom);
    setDescription(plat.description);
    setPrix(plat.prix);
    setCategorie(plat.categorie);

    setImage(null);

    setShowModal(true);

};

const fermerModal=()=>{

    setShowModal(false);

};

const enregistrerPlat = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("nom", nom);
    formData.append("description", description);
    formData.append("prix", prix);
    formData.append("categorie", categorie);

    if (image) {
      formData.append("image", image);
    }

    if (editingId) {
      await api.put(
        `http://localhost:5000/api/plats/${editingId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } else {
      await api.post(
        "http://localhost:5000/api/plats",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    }

    fermerModal();

    fetchPlats();

  } catch (err) {
    console.log(err);
    alert("Erreur lors de l'enregistrement.");
  }
};

const supprimerPlat = async (id) => {

  if (!window.confirm("Supprimer ce plat ?"))
    return;

  try {

    await api.delete(
      `http://localhost:5000/api/plats/${id}`
    );

    fetchPlats();

  } catch (err) {

    console.log(err);

  }

};


return (
  <div className="container-fluid">

    <div className="d-flex justify-content-between align-items-center mb-4">

      <h2>Gestion des plats</h2>

      <button
        className="btn btn-danger"
        onClick={ouvrirAjout}
      >
        <i className="bi bi-plus-circle"></i>
        {" "}Nouveau plat
      </button>

    </div>

    <div className="row mb-4">

      <div className="col-md-4">

        <input
          type="text"
          className="form-control"
          placeholder="Rechercher un plat..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />

      </div>

    </div>

    <div className="row mb-4">

      <div className="col-md-3">

        <div className="card shadow border-0">

          <div className="card-body">

            <h6>Total des plats</h6>

            <h2>{plats.length}</h2>

          </div>

        </div>

      </div>

      <div className="col-md-3">

        <div className="card shadow border-0">

          <div className="card-body">

            <h6>Catégories</h6>

            <h2>{categories.length}</h2>

          </div>

        </div>

      </div>

      <div className="col-md-3">

        <div className="card shadow border-0">

          <div className="card-body">

            <h6>Prix moyen</h6>

            <h2>
              {plats.length
                ? Math.round(
                    plats.reduce((s, p) => s + Number(p.prix), 0) /
                      plats.length
                  )
                : 0} Ar
            </h2>

          </div>

        </div>

      </div>

      <div className="col-md-3">

        <div className="card shadow border-0">

          <div className="card-body">

            <h6>Page</h6>

            <h2>{currentPage}</h2>

          </div>

        </div>

      </div>

    </div>
        <div className="card shadow border-0">

      <div className="card-body">

        <div className="table-responsive">

          <table className="table table-hover align-middle">

            <thead className="table-dark">

              <tr>

                <th>Image</th>

                <th>Nom</th>

                <th>Catégorie</th>

                <th>Prix</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {plats.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center py-4"
                  >

                    Aucun plat trouvé.

                  </td>

                </tr>

              ) : (

                plats.map((plat) => (

                  <tr key={plat._id}>

                    <td>

                      <img
                        src={
                          plat.image
                            ? `http://localhost:5000/uploads/${plat.image}`
                            : "https://via.placeholder.com/80"
                        }
                        alt={plat.nom}
                        className="rounded"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />

                    </td>

                    <td>

                      <strong>{plat.nom}</strong>

                      <br />

                      <small className="text-muted">
                        {plat.description}
                      </small>

                    </td>

                    <td>

                      <span className="badge bg-primary">

                        {plat.categorie}

                      </span>

                    </td>

                    <td>

                      <strong>

                        {Number(plat.prix).toLocaleString()} Ar

                      </strong>

                    </td>

                    <td>

                      <div className="d-flex gap-2">

                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() =>
                            ouvrirModification(plat)
                          }
                        >

                          <i className="bi bi-pencil"></i>

                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            supprimerPlat(plat._id)
                          }
                        >

                          <i className="bi bi-trash"></i>

                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
    <div className="d-flex justify-content-center align-items-center gap-3 mt-4">

    <button
      disabled={currentPage === 1}
      onClick={() => fetchPlats(currentPage - 1)}
    >
      Précédent
    </button>

    <span>

      Page {currentPage} / {totalPages}

    </span>

    <button
      disabled={currentPage === totalPages}
      onClick={() => fetchPlats(currentPage + 1)}
    >
      Suivant
    </button>

</div>
      {showModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,.5)",
          }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">
                  {editingId
                    ? "Modifier un plat"
                    : "Ajouter un plat"}
                </h5>

                <button
                  className="btn-close"
                  onClick={fermerModal}
                ></button>
              </div>

              <form onSubmit={enregistrerPlat}>

                <div className="modal-body">

                  <div className="mb-3">
                    <label className="form-label">
                      Nom
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      value={nom}
                      onChange={(e) =>
                        setNom(e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Description
                    </label>

                    <textarea
                      className="form-control"
                      rows="4"
                      value={description}
                      onChange={(e) =>
                        setDescription(e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="row">

                    <div className="col-md-6">

                      <label className="form-label">
                        Prix
                      </label>

                      <input
                        type="number"
                        className="form-control"
                        value={prix}
                        onChange={(e) =>
                          setPrix(e.target.value)
                        }
                        required
                      />

                    </div>

                    <div className="col-md-6">

                      <label className="form-label">
                        Catégorie
                      </label>

                      <select
                        className="form-select"
                        value={categorie}
                        onChange={(e) =>
                          setCategorie(e.target.value)
                        }
                        required
                      >

                        <option value="">
                          Choisir...
                        </option>

                        {categories.map((cat) => (
                          <option
                            key={cat._id}
                            value={cat.nom}
                          >
                            {cat.nom}
                          </option>
                        ))}

                      </select>

                    </div>

                  </div>

                  <div className="mt-4">

                    <label className="form-label">
                      Image
                    </label>

                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={(e) =>
                        setImage(e.target.files[0])
                      }
                    />

                  </div>

                  {image && (
                    <div className="text-center mt-4">

                      <img
                        src={URL.createObjectURL(image)}
                        alt="preview"
                        className="rounded shadow"
                        style={{
                          maxWidth: "250px",
                          maxHeight: "200px",
                          objectFit: "cover",
                        }}
                      />

                    </div>
                  )}

                </div>

                <div className="modal-footer">

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={fermerModal}
                  >
                    Annuler
                  </button>

                  <button
                    type="submit"
                    className="btn btn-danger"
                  >
                    {editingId
                      ? "Modifier"
                      : "Ajouter"}
                  </button>

                </div>

              </form>

            </div>
          </div>
        </div>
      )}
          </div>
  );
}

export default Plats;